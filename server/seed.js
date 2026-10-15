import db from './db.js'

// --- Seed data ---
const crops = [
  { name: 'Tomato', category: 'Vegetable', difficulty: 'Easy', growing_period: '70-90 days', water: 'Moderate', season: 'Warm', soil_type: 'Loamy', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80', description: 'A versatile vegetable crop that grows well in warm climates with well-draining soil.' },
  { name: 'Maize', category: 'Cereal', difficulty: 'Easy', growing_period: '90-120 days', water: 'Moderate', season: 'Warm', soil_type: 'Loamy', image: 'https://images.unsplash.com/photo-1601593768799-76eb0a68b9e0?w=600&q=80', description: 'One of the most widely grown cereal crops, adaptable to various climates.' },
  { name: 'Cassava', category: 'Root Crop', difficulty: 'Easy', growing_period: '9-12 months', water: 'Low', season: 'Tropical', soil_type: 'Sandy', image: 'https://images.unsplash.com/photo-1580910051070-e2c1a3d0d40b?w=600&q=80', description: 'A drought-tolerant root crop staple in tropical regions.' },
  { name: 'Rice', category: 'Cereal', difficulty: 'Moderate', growing_period: '110-150 days', water: 'High', season: 'Wet', soil_type: 'Clay', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80', description: 'A water-intensive cereal crop that is a staple food for millions.' },
  { name: 'Pepper', category: 'Vegetable', difficulty: 'Moderate', growing_period: '70-85 days', water: 'Moderate', season: 'Warm', soil_type: 'Loamy', image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80', description: 'A popular vegetable crop available in many varieties from sweet to hot.' },
  { name: 'Lettuce', category: 'Vegetable', difficulty: 'Easy', growing_period: '45-60 days', water: 'Low', season: 'Cool', soil_type: 'Loamy', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9d680b?w=600&q=80', description: 'A fast-growing leafy vegetable ideal for cooler seasons.' },
  { name: 'Carrot', category: 'Vegetable', difficulty: 'Easy', growing_period: '60-80 days', water: 'Moderate', season: 'Cool', soil_type: 'Sandy', image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600&q=80', description: 'A root vegetable rich in beta-carotene, growing best in loose sandy soil.' },
  { name: 'Banana', category: 'Fruit', difficulty: 'Moderate', growing_period: '9-12 months', water: 'High', season: 'Tropical', soil_type: 'Loamy', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80', description: 'A tropical fruit crop requiring consistent moisture and warm temperatures.' },
  { name: 'Onion', category: 'Vegetable', difficulty: 'Moderate', growing_period: '100-120 days', water: 'Low', season: 'Cool', soil_type: 'Sandy', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80', description: 'A bulb vegetable that stores well and grows in many climates.' },
  { name: 'Mango', category: 'Fruit', difficulty: 'Moderate', growing_period: '5-7 years', water: 'Low', season: 'Tropical', soil_type: 'Loamy', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80', description: 'A tropical fruit tree that takes years to fruit but produces for decades.' },
  { name: 'Beans', category: 'Legume', difficulty: 'Easy', growing_period: '60-90 days', water: 'Moderate', season: 'Warm', soil_type: 'Loamy', image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=600&q=80', description: 'A nitrogen-fixing legume that improves soil while producing food.' },
  { name: 'Groundnut', category: 'Legume', difficulty: 'Moderate', growing_period: '120-150 days', water: 'Low', season: 'Warm', soil_type: 'Sandy', image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80', description: 'Also known as peanut, a protein-rich legume grown underground.' }
]

const diseases_pests = [
  { name: 'Early Blight', affected_crop: 'Tomato', severity: 'High', type: 'Disease', symptoms: 'Brown circular spots with concentric rings on leaves, starting from bottom of plant', treatment: 'Remove infected leaves, apply copper-based fungicide, and ensure proper spacing for airflow.', prevention: 'Use disease-resistant varieties, practice crop rotation, and avoid overhead watering.', image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=600&q=80' },
  { name: 'Powdery Mildew', affected_crop: 'Pepper', severity: 'Medium', type: 'Disease', symptoms: 'White powdery coating on leaves, stems, and fruits', treatment: 'Apply sulfur-based fungicide or neem oil. Improve air circulation around plants.', prevention: 'Space plants properly, avoid excess nitrogen fertilizer, and water at the base.', image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?w=600&q=80' },
  { name: 'Leaf Spot', affected_crop: 'Rice', severity: 'Medium', type: 'Disease', symptoms: 'Circular brown spots with yellow halos on rice leaves', treatment: 'Apply appropriate fungicide and remove infected plant debris.', prevention: 'Use certified seeds, avoid excess nitrogen, and maintain proper field drainage.', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80' },
  { name: 'Armyworm', affected_crop: 'Maize', severity: 'High', type: 'Pest', symptoms: 'Irregular holes in leaves, wilting, and plant defoliation', treatment: 'Apply biological pesticides like Bt or chemical insecticides if infestation is severe.', prevention: 'Monitor fields regularly, use pheromone traps, and encourage natural predators.', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80' },
  { name: 'Rust', affected_crop: 'Beans', severity: 'Medium', type: 'Disease', symptoms: 'Orange or brown rust-colored pustules on leaf undersides', treatment: 'Apply fungicide containing chlorothalonil or sulfur. Remove infected plant parts.', prevention: 'Plant rust-resistant varieties and ensure good air circulation.', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80' },
  { name: 'Whitefly', affected_crop: 'Cassava', severity: 'Medium', type: 'Pest', symptoms: 'Tiny white insects on leaf undersides, yellowing leaves, sticky residue', treatment: 'Use yellow sticky traps, insecticidal soap, or neem oil sprays.', prevention: 'Use reflective mulches and encourage natural predators like ladybugs.', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&q=80' },
  { name: 'Anthracnose', affected_crop: 'Lettuce', severity: 'Medium', type: 'Disease', symptoms: 'Tan-colored lesions with dark borders on leaves and stems', treatment: 'Remove infected plants, apply copper fungicide, and improve drainage.', prevention: 'Use disease-free seeds and practice crop rotation.', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9d680b?w=600&q=80' },
  { name: 'Fruit Fly', affected_crop: 'Mango', severity: 'High', type: 'Pest', symptoms: 'Rotting fruits with entry holes, internal larvae damage', treatment: 'Use fruit fly traps, bag fruits, and apply targeted insecticides.', prevention: 'Harvest fruits on time, remove fallen fruits, and use pheromone traps.', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80' },
  { name: 'Bacterial Wilt', affected_crop: 'Pepper', severity: 'High', type: 'Disease', symptoms: 'Sudden wilting of plant despite adequate water, blackening of vascular tissue', treatment: 'Remove and destroy infected plants. There is no cure; focus on prevention.', prevention: 'Use resistant varieties, rotate crops, and control nematodes in soil.', image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80' },
  { name: 'Spider Mite', affected_crop: 'Tomato', severity: 'Medium', type: 'Pest', symptoms: 'Fine webbing on leaves, yellowing, tiny moving dots on leaf undersides', treatment: 'Spray with water to dislodge mites, use neem oil or miticide if severe.', prevention: 'Keep plants dust-free and maintain adequate humidity.', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80' },
  { name: 'Late Blight', affected_crop: 'Tomato', severity: 'High', type: 'Disease', symptoms: 'Large irregular water-soaked spots on leaves and fruits with white mold', treatment: 'Apply copper-based or chlorothalonil fungicide immediately upon detection.', prevention: 'Space plants for airflow, avoid overhead irrigation, and use resistant varieties.', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80' },
  { name: 'Mealybug', affected_crop: 'Banana', severity: 'Medium', type: 'Pest', symptoms: 'White cotton-like clusters on stems and leaves, stunted growth', treatment: 'Wipe with alcohol-soaked cotton, apply insecticidal soap or neem oil.', prevention: 'Inspect new plants before introducing them and control ants which spread mealybugs.', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80' }
]

const tips = [
  { category: 'Soil', title: 'How to Prepare Soil Before Planting', body: 'Good soil preparation is the foundation of a successful crop. Learn how to till, test pH, and add organic matter for best results.' },
  { category: 'Disease', title: 'How to Identify Early Plant Disease', body: 'Spotting disease early can save your entire crop. Look for discoloration, wilting, or unusual spots on leaves and stems.' },
  { category: 'Irrigation', title: 'How to Reduce Water Waste in Irrigation', body: 'Smart watering techniques like drip irrigation can reduce water use by up to 50% while improving crop yield.' },
  { category: 'Planting', title: 'How to Choose Quality Seeds', body: 'Certified seeds have higher germination rates and better disease resistance. Learn what to look for when buying seeds.' }
]

const offer_items = [
  { title: 'Crop Recommendation', body: 'Answer a few questions about your farm and get personalized crop suggestions matched to your soil, climate, and budget.', link: '/crops' },
  { title: 'Farming Guides', body: 'Step-by-step guides covering everything from land preparation to harvesting — written for beginners and experienced farmers alike.', link: '/farming-guides' },
  { title: 'Cost & Profit Calculator', body: 'Estimate your total farming expenses and projected returns before you invest a single seed.', link: '/smart-tools' },
  { title: 'Weather Information', body: 'Get local weather forecasts and farm-specific advice so you can plan irrigation, planting, and harvesting intelligently.', link: '/weather' },
  { title: 'Disease & Pest Guide', body: 'Identify common crop diseases and pests early. Access treatments and prevention tips before problems escalate.', link: '/diseases-pests' },
  { title: 'Farm Planning', body: 'Build a complete farming timeline from planting to harvest, track tasks, and stay on schedule throughout the season.', link: '/smart-tools' }
]

const steps = [
  { title: 'Tell Us About Your Farm', body: 'Share your location, soil type, farm size, and available budget to get started.' },
  { title: 'Get Smart Recommendations', body: 'Our system analyzes your inputs and suggests the best crops and practices for your conditions.' },
  { title: 'Plan Your Farming Activities', body: 'Create a full farming schedule with tasks, milestones, and cost estimates.' },
  { title: 'Grow With Confidence', body: 'Follow your plan, track progress, and use our tools to respond to challenges as they arise.' }
]

const farming_guides = [
  { title: 'Soil Preparation: The Complete Guide', category: 'Soil', summary: 'Learn how to test, till, and amend your soil for the best possible growing conditions before planting.', content: 'Soil preparation is the foundation of every successful crop. Start by testing your soil pH — most crops prefer a pH between 6.0 and 7.0. Use a simple soil test kit or send a sample to a lab. Once you know your soil profile, till the land to loosen compacted earth and incorporate organic matter like compost or well-rotted manure. This improves drainage, aeration, and nutrient availability. For sandy soils, add clay or compost to improve water retention. For clay soils, add sand and organic matter to improve drainage. Finally, level the field and create rows or beds appropriate for your chosen crop.', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1416879595882-fa5a3d64d4a4?w=600&q=80' },
  { title: 'Irrigation Systems Explained', category: 'Irrigation', summary: 'Compare drip, sprinkler, and flood irrigation systems to find the right watering method for your farm.', content: 'Choosing the right irrigation system depends on your crop type, water availability, and budget. Drip irrigation delivers water directly to plant roots, reducing waste by up to 50% and minimizing weed growth. It is ideal for vegetables and high-value crops. Sprinkler systems cover larger areas and work well for cereals and lawns, but can increase disease pressure if foliage stays wet overnight. Flood or furrow irrigation is traditional and low-cost but uses the most water. Regardless of system, water early morning or evening to reduce evaporation, and monitor soil moisture regularly to avoid over- or under-watering.', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1625244455244-alfred-grcic-photography?w=600&q=80' },
  { title: 'Organic Pest Management', category: 'Pest Control', summary: 'Use natural and cultural methods to control pests without relying on chemical pesticides.', content: 'Integrated Pest Management (IPM) combines biological, cultural, and chemical controls for sustainable pest management. Start with prevention: rotate crops, use resistant varieties, and maintain healthy soil. Encourage beneficial insects like ladybugs, lacewings, and parasitic wasps by planting companion flowers. Use physical barriers like row covers for young plants. Neem oil, insecticidal soap, and Bt are effective organic pesticides. Scout your fields weekly and only treat when pest populations exceed economic thresholds. This approach protects beneficial insects, reduces chemical residue, and saves money in the long run.', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-15853109284d3d3f48319-4e0d-4e1f-9f7e-7f6e3e1f9b9a?w=600&q=80' },
  { title: 'Composting for Better Soil', category: 'Soil', summary: 'Turn farm waste into nutrient-rich compost that improves soil structure and fertility naturally.', content: 'Composting transforms organic waste into valuable fertilizer. Build a compost pile with a mix of green materials (nitrogen-rich: vegetable scraps, grass clippings, manure) and brown materials (carbon-rich: dry leaves, straw, paper) in a 1:3 ratio. Keep the pile moist but not waterlogged, and turn it every 1-2 weeks to aerate. In 2-4 months, you will have dark, crumbly, sweet-smelling compost ready to incorporate into your soil. Compost improves water retention, feeds beneficial soil organisms, and reduces the need for synthetic fertilizers. It also recycles farm waste that would otherwise be burned or discarded.', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80' },
  { title: 'Crop Rotation Strategies', category: 'Planting', summary: 'Rotate crops systematically to maintain soil fertility, break pest cycles, and improve yields.', content: 'Crop rotation is the practice of growing different crop families in sequence on the same land. A simple 3-year rotation alternates legumes (beans, peas), leafy crops (lettuce, cabbage), and fruit crops (tomato, pepper). Legumes fix nitrogen in the soil, benefiting the next crop. Rotation breaks pest and disease cycles by removing host plants. Deep-rooted crops like carrots bring nutrients from lower soil layers to the surface. Plan your rotation before each season, keep records, and avoid planting the same family in the same spot within 2-3 years. This reduces fertilizer costs and improves soil health over time.', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1601593768799-76eb0a68b9e0?w=600&q=80' },
  { title: 'Harvesting and Post-Harvest Storage', category: 'Harvest', summary: 'Maximize your harvest value with proper timing, handling, and storage techniques for different crops.', content: 'Harvesting at the right time ensures peak quality and market value. For vegetables, harvest in the cool early morning to preserve crispness. For grains, wait for moisture content to drop below 14% before storage. Handle produce gently to avoid bruising, which invites decay. Cure root crops like onions and potatoes by air-drying in a shaded, ventilated area for 1-2 weeks before storage. Store in cool, dry, dark conditions: most vegetables prefer 0-4°C and 90-95% humidity, while grains store well at ambient temperature if dry. Use proper containers — mesh bags for onions, crates for tomatoes — and check regularly for spoilage.', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600&q=80' },
  { title: 'Greenhouse Farming Basics', category: 'Infrastructure', summary: 'Get started with greenhouse farming to extend growing seasons and protect crops from extreme weather.', content: 'Greenhouses extend your growing season and protect crops from heavy rain, wind, and pests. Start with a simple hoop house using UV-stabilized polythene film over a galvanized steel frame. Orient the structure east-west for maximum sun exposure. Install ventilation — roll-up sides or exhaust fans — to prevent overheating. Use raised beds or grow bags with a good potting mix. Drip irrigation is essential inside a greenhouse. Start with high-value crops like tomatoes, peppers, and leafy greens. Monitor temperature daily; most crops thrive between 20-28°C. A greenhouse can double your yield and allow off-season production for premium prices.', difficulty: 'Advanced', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80' },
  { title: 'Starting Seeds Indoors', category: 'Planting', summary: 'Give your crops a head start by germinating seeds indoors before transplanting to the field.', content: 'Starting seeds indoors gives you a 4-6 week head start on the season. Use seed trays or small pots filled with a fine, sterile seed-starting mix. Sow seeds at the depth recommended on the packet — typically 2-3 times the seed diameter. Keep the mix moist and warm (20-25°C) for germination. Once seedlings have 2-3 true leaves, transplant them into larger pots. Harden off seedlings by gradually exposing them to outdoor conditions over 7-10 days before field planting. This produces stronger, more uniform plants and can improve yields by 20-30% compared to direct seeding.', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9d680b?w=600&q=80' }
]

const weather_forecasts = [
  { location: 'Northern Region', temperature: 28, condition: 'Sunny', humidity: 45, wind_speed: 12, rainfall_chance: 10, forecast_date: '2026-09-09' },
  { location: 'Central Region', temperature: 25, condition: 'Partly Cloudy', humidity: 60, wind_speed: 8, rainfall_chance: 30, forecast_date: '2026-09-09' },
  { location: 'Southern Region', temperature: 22, condition: 'Light Rain', humidity: 78, wind_speed: 15, rainfall_chance: 70, forecast_date: '2026-09-09' },
  { location: 'Coastal Region', temperature: 30, condition: 'Sunny', humidity: 65, wind_speed: 20, rainfall_chance: 15, forecast_date: '2026-09-09' },
  { location: 'Highland Region', temperature: 18, condition: 'Cloudy', humidity: 70, wind_speed: 10, rainfall_chance: 40, forecast_date: '2026-09-09' },
  { location: 'Northern Region', temperature: 30, condition: 'Sunny', humidity: 40, wind_speed: 10, rainfall_chance: 5, forecast_date: '2026-09-10' },
  { location: 'Central Region', temperature: 27, condition: 'Sunny', humidity: 50, wind_speed: 6, rainfall_chance: 10, forecast_date: '2026-09-10' },
  { location: 'Southern Region', temperature: 24, condition: 'Partly Cloudy', humidity: 65, wind_speed: 12, rainfall_chance: 25, forecast_date: '2026-09-10' },
  { location: 'Coastal Region', temperature: 31, condition: 'Sunny', humidity: 60, wind_speed: 18, rainfall_chance: 10, forecast_date: '2026-09-10' },
  { location: 'Highland Region', temperature: 19, condition: 'Light Rain', humidity: 80, wind_speed: 8, rainfall_chance: 60, forecast_date: '2026-09-10' }
]

const cost_categories = [
  { name: 'Land Preparation', icon: 'tractor' },
  { name: 'Seeds & Planting', icon: 'seed' },
  { name: 'Fertilizers', icon: 'fertilizer' },
  { name: 'Pest Control', icon: 'pest' },
  { name: 'Irrigation', icon: 'water' },
  { name: 'Labor', icon: 'labor' },
  { name: 'Harvest & Storage', icon: 'harvest' }
]

const cost_items = [
  { category_id: 1, name: 'Land clearing', default_cost: 150, unit: 'per acre' },
  { category_id: 1, name: 'Plowing', default_cost: 80, unit: 'per acre' },
  { category_id: 1, name: 'Harrowing', default_cost: 50, unit: 'per acre' },
  { category_id: 2, name: 'Certified seeds', default_cost: 60, unit: 'per acre' },
  { category_id: 2, name: 'Seed treatment', default_cost: 20, unit: 'per acre' },
  { category_id: 3, name: 'NPK fertilizer', default_cost: 120, unit: 'per acre' },
  { category_id: 3, name: 'Urea', default_cost: 45, unit: 'per bag' },
  { category_id: 3, name: 'Compost/manure', default_cost: 30, unit: 'per ton' },
  { category_id: 4, name: 'Fungicide', default_cost: 35, unit: 'per liter' },
  { category_id: 4, name: 'Insecticide', default_cost: 40, unit: 'per liter' },
  { category_id: 5, name: 'Drip kit installation', default_cost: 200, unit: 'per acre' },
  { category_id: 5, name: 'Water pump (diesel)', default_cost: 350, unit: 'one-time' },
  { category_id: 6, name: 'Planting labor', default_cost: 50, unit: 'per acre' },
  { category_id: 6, name: 'Weeding labor', default_cost: 40, unit: 'per round' },
  { category_id: 6, name: 'Harvest labor', default_cost: 60, unit: 'per acre' },
  { category_id: 7, name: 'Harvesting tools', default_cost: 25, unit: 'per set' },
  { category_id: 7, name: 'Storage bags', default_cost: 15, unit: 'per 10 bags' },
  { category_id: 7, name: 'Drying tarpaulin', default_cost: 40, unit: 'one-time' }
]

// --- Clear & insert ---
console.log('Seeding database...')

const clearAll = db.transaction(() => {
  db.prepare('DELETE FROM crops').run()
  db.prepare('DELETE FROM diseases_pests').run()
  db.prepare('DELETE FROM tips').run()
  db.prepare('DELETE FROM offer_items').run()
  db.prepare('DELETE FROM steps').run()
  db.prepare('DELETE FROM farming_guides').run()
  db.prepare('DELETE FROM weather_forecasts').run()
  db.prepare('DELETE FROM cost_items').run()
  db.prepare('DELETE FROM cost_categories').run()
})
clearAll()

const insertCrop = db.prepare(`
  INSERT INTO crops (name, category, difficulty, growing_period, water, season, soil_type, image, description)
  VALUES (@name, @category, @difficulty, @growing_period, @water, @season, @soil_type, @image, @description)
`)

const insertDisease = db.prepare(`
  INSERT INTO diseases_pests (name, affected_crop, severity, type, symptoms, treatment, prevention, image)
  VALUES (@name, @affected_crop, @severity, @type, @symptoms, @treatment, @prevention, @image)
`)

const insertTip = db.prepare(`
  INSERT INTO tips (category, title, body)
  VALUES (@category, @title, @body)
`)

const insertOffer = db.prepare(`
  INSERT INTO offer_items (title, body, link)
  VALUES (@title, @body, @link)
`)

const insertStep = db.prepare(`
  INSERT INTO steps (title, body)
  VALUES (@title, @body)
`)

const insertGuide = db.prepare(`
  INSERT INTO farming_guides (title, category, summary, content, difficulty, image)
  VALUES (@title, @category, @summary, @content, @difficulty, @image)
`)

const insertWeather = db.prepare(`
  INSERT INTO weather_forecasts (location, temperature, condition, humidity, wind_speed, rainfall_chance, forecast_date)
  VALUES (@location, @temperature, @condition, @humidity, @wind_speed, @rainfall_chance, @forecast_date)
`)

const insertCategory = db.prepare(`
  INSERT INTO cost_categories (name, icon)
  VALUES (@name, @icon)
`)

const insertCostItem = db.prepare(`
  INSERT INTO cost_items (category_id, name, default_cost, unit)
  VALUES (@category_id, @name, @default_cost, @unit)
`)

const insertAll = db.transaction(() => {
  for (const c of crops) insertCrop.run(c)
  for (const d of diseases_pests) insertDisease.run(d)
  for (const t of tips) insertTip.run(t)
  for (const o of offer_items) insertOffer.run(o)
  for (const s of steps) insertStep.run(s)
  for (const g of farming_guides) insertGuide.run(g)
  for (const w of weather_forecasts) insertWeather.run(w)
  for (const cat of cost_categories) insertCategory.run(cat)
  for (const ci of cost_items) insertCostItem.run(ci)
})
insertAll()

console.log('Database seeded successfully!')
console.log(`  - ${crops.length} crops`)
console.log(`  - ${diseases_pests.length} diseases/pests`)
console.log(`  - ${tips.length} tips`)
console.log(`  - ${offer_items.length} offer items`)
console.log(`  - ${steps.length} steps`)
console.log(`  - ${farming_guides.length} farming guides`)
console.log(`  - ${weather_forecasts.length} weather forecasts`)
console.log(`  - ${cost_categories.length} cost categories`)
console.log(`  - ${cost_items.length} cost items`)
