// Mock Data Generators for ML Examples
// Generates realistic datasets for each ML algorithm demonstration

/**
 * Utility functions for data generation
 */
const utils = {
    randomNormal: (mean = 0, std = 1) => {
        const u = Math.random();
        const v = Math.random();
        return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    
    randomBetween: (min, max) => Math.random() * (max - min) + min,
    
    addNoise: (value, noiseLevel = 0.1) => {
        return value + utils.randomNormal(0, noiseLevel);
    },
    
    generateDates: (startDate, days) => {
        const dates = [];
        const start = new Date(startDate);
        for (let i = 0; i < days; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    }
};

/**
 * 1. Vineyard Yield Predictor (Linear Regression)
 */
export const generateVineyardData = (samples = 200) => {
    const data = [];
    
    for (let i = 0; i < samples; i++) {
        const rainfall = utils.randomBetween(15, 45); // inches per year
        const temperature = utils.randomBetween(55, 75); // avg temp F
        const soilPH = utils.randomBetween(5.5, 8.0);
        
        // Linear relationship: yield = 2*rainfall + 1.5*temp - 3*pH + noise
        const baseYield = 2 * rainfall + 1.5 * temperature - 3 * soilPH + 20;
        const yield_tons = Math.max(0, utils.addNoise(baseYield, 2));
        
        data.push({
            id: i + 1,
            rainfall,
            temperature,
            soilPH,
            yield_tons: Math.round(yield_tons * 10) / 10,
            year: 2015 + (i % 9)
        });
    }
    
    return data;
};

/**
 * 2. Dragon Egg Hatching Classifier (Logistic Regression)
 */
export const generateDragonEggData = (samples = 300) => {
    const data = [];
    
    for (let i = 0; i < samples; i++) {
        const temperature = utils.randomBetween(1000, 1400); // Fahrenheit
        const magicalAura = utils.randomBetween(0, 100); // magical units
        const incubationDays = Math.floor(utils.randomBetween(30, 120));
        
        // Logistic function: higher temp and aura increase hatch probability
        const logit = -8 + 0.008 * temperature + 0.05 * magicalAura + 0.01 * incubationDays;
        const hatchProbability = 1 / (1 + Math.exp(-logit));
        const hatched = Math.random() < hatchProbability;
        
        data.push({
            id: i + 1,
            temperature,
            magicalAura: Math.round(magicalAura * 10) / 10,
            incubationDays,
            hatched,
            eggType: ['Fire', 'Ice', 'Earth', 'Air'][Math.floor(Math.random() * 4)]
        });
    }
    
    return data;
};

/**
 * 3. Streaming Content Recommender (Decision Tree)
 */
export const generateStreamingData = (samples = 500) => {
    const data = [];
    const timeSlots = ['morning', 'afternoon', 'evening', 'night'];
    const devices = ['phone', 'tablet', 'laptop', 'tv'];
    const genres = ['action', 'comedy', 'drama', 'documentary', 'horror', 'romance'];
    
    for (let i = 0; i < samples; i++) {
        const timeOfDay = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];
        const weekday = Math.random() > 0.3; // 70% weekday, 30% weekend
        const previousGenre = genres[Math.floor(Math.random() * genres.length)];
        const watchTime = Math.floor(utils.randomBetween(10, 180)); // minutes
        
        // Decision rules for genre recommendation
        let recommendedGenre;
        if (timeOfDay === 'morning' && weekday) {
            recommendedGenre = Math.random() > 0.6 ? 'documentary' : 'comedy';
        } else if (timeOfDay === 'evening' && device === 'tv') {
            recommendedGenre = Math.random() > 0.5 ? 'action' : 'drama';
        } else if (timeOfDay === 'night') {
            recommendedGenre = Math.random() > 0.7 ? 'horror' : 'romance';
        } else {
            recommendedGenre = genres[Math.floor(Math.random() * genres.length)];
        }
        
        data.push({
            id: i + 1,
            timeOfDay,
            device,
            weekday,
            previousGenre,
            watchTime,
            recommendedGenre
        });
    }
    
    return data;
};

/**
 * 4. Insurance Fraud Detector (Random Forest)
 */
export const generateInsuranceData = (samples = 400) => {
    const data = [];
    
    for (let i = 0; i < samples; i++) {
        const claimAmount = utils.randomBetween(500, 50000);
        const policyAge = Math.floor(utils.randomBetween(1, 120)); // months
        const claimsHistory = Math.floor(utils.randomBetween(0, 5));
        const timeToReport = Math.floor(utils.randomBetween(0, 30)); // days
        const witnessCount = Math.floor(utils.randomBetween(0, 4));
        
        // Fraud likelihood based on multiple factors
        let fraudScore = 0;
        if (claimAmount > 30000) fraudScore += 0.3;
        if (timeToReport > 14) fraudScore += 0.2;
        if (claimsHistory >= 3) fraudScore += 0.25;
        if (witnessCount === 0) fraudScore += 0.15;
        if (policyAge < 6) fraudScore += 0.1;
        
        const isFraud = fraudScore > 0.5 && Math.random() > 0.3;
        
        data.push({
            id: i + 1,
            claimAmount: Math.round(claimAmount),
            policyAge,
            claimsHistory,
            timeToReport,
            witnessCount,
            isFraud,
            fraudScore: Math.round(fraudScore * 100) / 100
        });
    }
    
    return data;
};

/**
 * 5. Asteroid Composition Analyzer (SVM)
 */
export const generateAsteroidData = (samples = 150) => {
    const data = [];
    const asteroidTypes = ['metallic', 'rocky', 'icy'];
    
    for (let i = 0; i < samples; i++) {
        const asteroidType = asteroidTypes[Math.floor(Math.random() * asteroidTypes.length)];
        
        // Generate spectral features based on type
        let feature1, feature2, feature3, feature4;
        
        if (asteroidType === 'metallic') {
            feature1 = utils.randomNormal(0.8, 0.1); // high reflectance
            feature2 = utils.randomNormal(0.3, 0.05); // low absorption
            feature3 = utils.randomNormal(0.9, 0.08); // high metal signature
            feature4 = utils.randomNormal(0.2, 0.03); // low ice signature
        } else if (asteroidType === 'rocky') {
            feature1 = utils.randomNormal(0.4, 0.08);
            feature2 = utils.randomNormal(0.7, 0.1);
            feature3 = utils.randomNormal(0.3, 0.06);
            feature4 = utils.randomNormal(0.1, 0.02);
        } else { // icy
            feature1 = utils.randomNormal(0.2, 0.05);
            feature2 = utils.randomNormal(0.5, 0.08);
            feature3 = utils.randomNormal(0.1, 0.03);
            feature4 = utils.randomNormal(0.8, 0.1);
        }
        
        data.push({
            id: i + 1,
            asteroidType,
            spectralFeature1: Math.max(0, Math.min(1, feature1)),
            spectralFeature2: Math.max(0, Math.min(1, feature2)),
            spectralFeature3: Math.max(0, Math.min(1, feature3)),
            spectralFeature4: Math.max(0, Math.min(1, feature4)),
            distance: utils.randomBetween(1, 100), // AU from Earth
            diameter: utils.randomBetween(10, 1000) // meters
        });
    }
    
    return data;
};

/**
 * 6. Medical Image Diagnosis (Neural Network)
 */
export const generateMedicalImageData = (samples = 250) => {
    const data = [];
    
    for (let i = 0; i < samples; i++) {
        const hasTumor = Math.random() > 0.7; // 30% have tumors
        
        // Image features (simplified)
        const brightness = utils.randomNormal(hasTumor ? 0.3 : 0.5, 0.1);
        const contrast = utils.randomNormal(hasTumor ? 0.7 : 0.4, 0.1);
        const edgeSharpness = utils.randomNormal(hasTumor ? 0.8 : 0.3, 0.08);
        const asymmetry = utils.randomNormal(hasTumor ? 0.6 : 0.2, 0.1);
        
        // Neural network confidence
        const confidence = hasTumor ? 
            utils.randomBetween(0.7, 0.95) : 
            utils.randomBetween(0.1, 0.4);
        
        data.push({
            id: i + 1,
            patientAge: Math.floor(utils.randomBetween(25, 85)),
            brightness: Math.max(0, Math.min(1, brightness)),
            contrast: Math.max(0, Math.min(1, contrast)),
            edgeSharpness: Math.max(0, Math.min(1, edgeSharpness)),
            asymmetry: Math.max(0, Math.min(1, asymmetry)),
            hasTumor,
            confidence: Math.round(confidence * 100) / 100,
            imageType: ['xray', 'mri', 'ct'][Math.floor(Math.random() * 3)]
        });
    }
    
    return data;
};

/**
 * 7. Retail Customer Segmentation (K-Means)
 */
export const generateRetailCustomerData = (samples = 300) => {
    const data = [];
    const segments = [
        { name: 'Budget Buyers', avgSpend: 50, frequency: 2 },
        { name: 'Luxury Seekers', avgSpend: 300, frequency: 1 },
        { name: 'Impulse Shoppers', avgSpend: 120, frequency: 4 },
        { name: 'Regular Shoppers', avgSpend: 80, frequency: 3 },
        { name: 'Occasion Buyers', avgSpend: 200, frequency: 0.5 }
    ];
    
    for (let i = 0; i < samples; i++) {
        const segment = segments[Math.floor(Math.random() * segments.length)];
        
        const monthlySpend = Math.max(10, utils.randomNormal(segment.avgSpend, segment.avgSpend * 0.3));
        const purchaseFrequency = Math.max(0.1, utils.randomNormal(segment.frequency, segment.frequency * 0.4));
        const sessionDuration = utils.randomBetween(2, 45); // minutes
        const itemsPerPurchase = Math.max(1, Math.floor(utils.randomNormal(3, 2)));
        
        data.push({
            id: i + 1,
            monthlySpend: Math.round(monthlySpend),
            purchaseFrequency: Math.round(purchaseFrequency * 10) / 10,
            sessionDuration: Math.round(sessionDuration),
            itemsPerPurchase,
            segment: segment.name,
            age: Math.floor(utils.randomBetween(18, 70)),
            membershipYears: Math.floor(utils.randomBetween(0, 10))
        });
    }
    
    return data;
};

/**
 * 8. Evolutionary Tree Constructor (Hierarchical Clustering)
 */
export const generateEvolutionaryData = (samples = 50) => {
    const species = [
        'Human', 'Chimpanzee', 'Gorilla', 'Orangutan', 'Gibbon',
        'Dog', 'Wolf', 'Fox', 'Cat', 'Lion', 'Tiger',
        'Mouse', 'Rat', 'Rabbit', 'Cow', 'Horse', 'Pig',
        'Chicken', 'Duck', 'Eagle', 'Salmon', 'Tuna', 'Shark'
    ];
    
    const data = [];
    
    for (let i = 0; i < Math.min(samples, species.length); i++) {
        // Generate DNA similarity features (simplified)
        const dnaSequence1 = utils.randomBetween(0, 1);
        const dnaSequence2 = utils.randomBetween(0, 1);
        const dnaSequence3 = utils.randomBetween(0, 1);
        const dnaSequence4 = utils.randomBetween(0, 1);
        const dnaSequence5 = utils.randomBetween(0, 1);
        
        data.push({
            id: i + 1,
            species: species[i],
            dnaSequence1: Math.round(dnaSequence1 * 1000) / 1000,
            dnaSequence2: Math.round(dnaSequence2 * 1000) / 1000,
            dnaSequence3: Math.round(dnaSequence3 * 1000) / 1000,
            dnaSequence4: Math.round(dnaSequence4 * 1000) / 1000,
            dnaSequence5: Math.round(dnaSequence5 * 1000) / 1000,
            category: i < 5 ? 'Primates' : 
                     i < 11 ? 'Carnivores' : 
                     i < 17 ? 'Herbivores' : 
                     i < 20 ? 'Birds' : 'Fish'
        });
    }
    
    return data;
};

/**
 * Generate time series data for reinforcement learning examples
 */
export const generateTimeSeriesData = (days = 100, startValue = 100) => {
    const data = [];
    let currentValue = startValue;
    const dates = utils.generateDates('2024-01-01', days);
    
    for (let i = 0; i < days; i++) {
        const change = utils.randomNormal(0, 2);
        currentValue = Math.max(0, currentValue + change);
        
        data.push({
            date: dates[i],
            value: Math.round(currentValue * 100) / 100,
            day: i + 1
        });
    }
    
    return data;
};

/**
 * 12. Warehouse Robot Navigator (Q-Learning)
 */
export const generateWarehouseData = (samples = 100) => {
    const data = [];
    
    for (let i = 0; i < samples; i++) {
        const startX = Math.floor(utils.randomBetween(0, 10));
        const startY = Math.floor(utils.randomBetween(0, 10));
        const goalX = Math.floor(utils.randomBetween(0, 10));
        const goalY = Math.floor(utils.randomBetween(0, 10));
        
        const optimalSteps = Math.abs(goalX - startX) + Math.abs(goalY - startY);
        const actualSteps = optimalSteps + Math.floor(utils.randomBetween(0, 5));
        const reward = 100 - (actualSteps - optimalSteps) * 10;
        
        data.push({
            id: i + 1,
            startX,
            startY,
            goalX,
            goalY,
            optimalSteps,
            actualSteps,
            reward,
            obstacles: Math.floor(utils.randomBetween(0, 8)),
            completionTime: Math.round((actualSteps * 2 + utils.randomBetween(0, 10)) * 10) / 10
        });
    }
    
    return data;
};

// Export all generators
export const dataGenerators = {
    vineyard: generateVineyardData,
    dragonEgg: generateDragonEggData,
    streaming: generateStreamingData,
    insurance: generateInsuranceData,
    asteroid: generateAsteroidData,
    medical: generateMedicalImageData,
    retail: generateRetailCustomerData,
    evolutionary: generateEvolutionaryData,
    warehouse: generateWarehouseData,
    timeSeries: generateTimeSeriesData
};

export default dataGenerators;