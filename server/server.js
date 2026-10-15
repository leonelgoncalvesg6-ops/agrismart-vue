import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
const PORT = 3002

app.use(cors())
app.use(express.json())

// --- Routes ---

// GET /api/crops — list all crops (supports optional search & filter)
app.get('/api/crops', (req, res) => {
  const { search, category, difficulty, season, water, soil_type } = req.query

  let query = 'SELECT * FROM crops WHERE 1=1'
  const params = {}

  if (search) {
    query += ' AND (name LIKE @search OR category LIKE @search)'
    params.search = `%${search}%`
  }
  if (category) { query += ' AND category = @category'; params.category = category }
  if (difficulty) { query += ' AND difficulty = @difficulty'; params.difficulty = difficulty }
  if (season) { query += ' AND season = @season'; params.season = season }
  if (water) { query += ' AND water = @water'; params.water = water }
  if (soil_type) { query += ' AND soil_type = @soil_type'; params.soil_type = soil_type }

  query += ' ORDER BY id ASC'
  const rows = db.prepare(query).all(params)
  res.json(rows)
})

// GET /api/crops/featured — first 6 crops for homepage
app.get('/api/crops/featured', (req, res) => {
  const rows = db.prepare('SELECT * FROM crops ORDER BY id ASC LIMIT 6').all()
  res.json(rows)
})

// GET /api/crops/:id — single crop
app.get('/api/crops/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM crops WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Crop not found' })
  res.json(row)
})

// GET /api/diseases-pests — list all diseases/pests (supports optional search & filter)
app.get('/api/diseases-pests', (req, res) => {
  const { search, type, affected_crop, severity } = req.query

  let query = 'SELECT * FROM diseases_pests WHERE 1=1'
  const params = {}

  if (search) {
    query += ' AND (name LIKE @search OR affected_crop LIKE @search)'
    params.search = `%${search}%`
  }
  if (type) { query += ' AND type = @type'; params.type = type }
  if (affected_crop) { query += ' AND affected_crop = @affected_crop'; params.affected_crop = affected_crop }
  if (severity) { query += ' AND severity = @severity'; params.severity = severity }

  query += ' ORDER BY id ASC'
  const rows = db.prepare(query).all(params)
  res.json(rows)
})

// GET /api/diseases-pests/:id — single disease/pest
app.get('/api/diseases-pests/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM diseases_pests WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Entry not found' })
  res.json(row)
})

// GET /api/tips — list all farming tips
app.get('/api/tips', (req, res) => {
  const rows = db.prepare('SELECT * FROM tips ORDER BY id ASC').all()
  res.json(rows)
})

// GET /api/home — aggregated homepage data (offer items, steps, featured crops, tips)
app.get('/api/home', (req, res) => {
  const offerItems = db.prepare('SELECT * FROM offer_items ORDER BY id ASC').all()
  const steps = db.prepare('SELECT * FROM steps ORDER BY id ASC').all()
  const featuredCrops = db.prepare('SELECT * FROM crops ORDER BY id ASC LIMIT 6').all()
  const tips = db.prepare('SELECT * FROM tips ORDER BY id ASC').all()
  res.json({ offerItems, steps, featuredCrops, tips })
})

// GET /api/health — health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// GET /api/farming-guides — list all farming guides (supports optional search & filter)
app.get('/api/farming-guides', (req, res) => {
  const { search, category, difficulty } = req.query

  let query = 'SELECT * FROM farming_guides WHERE 1=1'
  const params = {}

  if (search) {
    query += ' AND (title LIKE @search OR summary LIKE @search)'
    params.search = `%${search}%`
  }
  if (category) { query += ' AND category = @category'; params.category = category }
  if (difficulty) { query += ' AND difficulty = @difficulty'; params.difficulty = difficulty }

  query += ' ORDER BY id ASC'
  const rows = db.prepare(query).all(params)
  res.json(rows)
})

// GET /api/farming-guides/:id — single farming guide
app.get('/api/farming-guides/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM farming_guides WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Guide not found' })
  res.json(row)
})

// GET /api/weather — list all weather forecasts (supports optional location filter)
app.get('/api/weather', (req, res) => {
  const { location } = req.query

  let query = 'SELECT * FROM weather_forecasts WHERE 1=1'
  const params = {}

  if (location) {
    query += ' AND location LIKE @location'
    params.location = `%${location}%`
  }

  query += ' ORDER BY forecast_date ASC, id ASC'
  const rows = db.prepare(query).all(params)
  res.json(rows)
})

// GET /api/cost-calculator — cost categories with their cost items
app.get('/api/cost-calculator', (req, res) => {
  const categories = db.prepare('SELECT * FROM cost_categories ORDER BY id ASC').all()
  const items = db.prepare('SELECT * FROM cost_items ORDER BY id ASC').all()

  const result = categories.map(cat => ({
    ...cat,
    items: items.filter(item => item.category_id === cat.id)
  }))

  res.json(result)
})

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
});

// Import bcrypt for password hashing
import bcrypt from 'bcryptjs';

// User Registration
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with that username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert new user
    const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    const result = stmt.run(username, email, password_hash);

    res.status(201).json({ message: 'User registered successfully', userId: result.lastInsertRowid });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Import jsonwebtoken for JWT generation
import jwt from 'jsonwebtoken';

// Define JWT Secret (ideally from environment variables)
const jwtSecret = process.env.JWT_SECRET || 'supersecretjwtkey';

// User Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  try {
    // Check if user exists
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Respond with token and user info (without password hash)
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

let currentPort = 3002;

function startServer(port) {
  app.listen(port, () => {
    console.log(`AgriSmart API server running at http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is already in use. Trying port ${port + 1}...`);
      startServer(port + 1); // Try the next port
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(currentPort);
