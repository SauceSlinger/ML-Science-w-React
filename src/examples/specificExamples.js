// Individual ML Example Implementations
// Specific data generators and chart configurations for each example

/**
 * Enhanced data generators for specific examples
 */

// Insurance Fraud Detection specific charts
export const generateInsuranceCharts = (data) => {
    const fraudData = data.filter(d => d.isFraud);
    const legitimateData = data.filter(d => !d.isFraud);
    
    // Fraud vs Legitimate claim amounts
    const claimAmountRanges = {
        '0-5k': { fraud: 0, legitimate: 0 },
        '5k-15k': { fraud: 0, legitimate: 0 },
        '15k-30k': { fraud: 0, legitimate: 0 },
        '30k+': { fraud: 0, legitimate: 0 }
    };
    
    data.forEach(claim => {
        const amount = claim.claimAmount;
        const type = claim.isFraud ? 'fraud' : 'legitimate';
        
        if (amount < 5000) claimAmountRanges['0-5k'][type]++;
        else if (amount < 15000) claimAmountRanges['5k-15k'][type]++;
        else if (amount < 30000) claimAmountRanges['15k-30k'][type]++;
        else claimAmountRanges['30k+'][type]++;
    });
    
    const rangeData = Object.entries(claimAmountRanges).map(([range, counts]) => ({
        range,
        fraud: counts.fraud,
        legitimate: counts.legitimate
    }));
    
    return [
        {
            title: "Fraud Detection Scatter Plot",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'claimAmount',
                yField: 'timeToReport',
                colorField: 'isFraud',
                title: 'Claim Amount vs Reporting Time',
                xLabel: 'Claim Amount ($)',
                yLabel: 'Days to Report',
                canvasId: 'insurance-fraud-scatter'
            })
        },
        {
            title: "Fraud Score Distribution",
            component: React.createElement(window.ChartComponents.BarChart, {
                data: data.map(d => ({ score: Math.round(d.fraudScore * 10) / 10, count: 1 }))
                    .reduce((acc, curr) => {
                        const existing = acc.find(item => item.score === curr.score);
                        if (existing) existing.count++;
                        else acc.push(curr);
                        return acc;
                    }, []),
                xField: 'score',
                yField: 'count',
                title: 'Fraud Score Distribution',
                xLabel: 'Fraud Score',
                yLabel: 'Number of Claims',
                canvasId: 'insurance-fraud-dist'
            })
        }
    ];
};

// Asteroid Composition specific charts
export const generateAsteroidCharts = (data) => {
    return [
        {
            title: "Spectral Feature Analysis",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'spectralFeature1',
                yField: 'spectralFeature2',
                colorField: 'asteroidType',
                title: 'Spectral Features 1 vs 2',
                xLabel: 'Spectral Feature 1 (Reflectance)',
                yLabel: 'Spectral Feature 2 (Absorption)',
                canvasId: 'asteroid-spectral-1'
            })
        },
        {
            title: "Metal vs Ice Signature",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'spectralFeature3',
                yField: 'spectralFeature4',
                colorField: 'asteroidType',
                title: 'Metal vs Ice Signatures',
                xLabel: 'Metal Signature',
                yLabel: 'Ice Signature',
                canvasId: 'asteroid-spectral-2'
            })
        },
        {
            title: "Asteroid Type Distribution",
            component: React.createElement(window.ChartComponents.PieChart, {
                data: data.reduce((acc, asteroid) => {
                    const existing = acc.find(item => item.type === asteroid.asteroidType);
                    if (existing) existing.count++;
                    else acc.push({ type: asteroid.asteroidType, count: 1 });
                    return acc;
                }, []),
                labelField: 'type',
                valueField: 'count',
                title: 'Distribution of Asteroid Types',
                canvasId: 'asteroid-distribution'
            })
        }
    ];
};

// Medical Image Analysis charts
export const generateMedicalCharts = (data) => {
    return [
        {
            title: "Image Feature Analysis",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'brightness',
                yField: 'contrast',
                colorField: 'hasTumor',
                title: 'Brightness vs Contrast Analysis',
                xLabel: 'Image Brightness',
                yLabel: 'Image Contrast',
                canvasId: 'medical-features-1'
            })
        },
        {
            title: "Diagnostic Confidence by Age",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'patientAge',
                yField: 'confidence',
                colorField: 'hasTumor',
                title: 'AI Confidence by Patient Age',
                xLabel: 'Patient Age',
                yLabel: 'AI Confidence Score',
                canvasId: 'medical-confidence'
            })
        },
        {
            title: "Edge Sharpness vs Asymmetry",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'edgeSharpness',
                yField: 'asymmetry',
                colorField: 'hasTumor',
                title: 'Edge Sharpness vs Asymmetry',
                xLabel: 'Edge Sharpness',
                yLabel: 'Asymmetry Score',
                canvasId: 'medical-features-2'
            })
        }
    ];
};

// Streaming Content charts
export const generateStreamingCharts = (data) => {
    // Aggregate data for recommendations by time of day
    const timeGenreData = data.reduce((acc, session) => {
        const key = `${session.timeOfDay}-${session.recommendedGenre}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    const timeData = ['morning', 'afternoon', 'evening', 'night'].map(time => {
        const genres = ['action', 'comedy', 'drama', 'documentary', 'horror', 'romance'];
        return {
            time,
            ...genres.reduce((acc, genre) => {
                acc[genre] = timeGenreData[`${time}-${genre}`] || 0;
                return acc;
            }, {})
        };
    });
    
    return [
        {
            title: "Genre Recommendations by Time",
            component: React.createElement(window.ChartComponents.BarChart, {
                data: Object.entries(data.reduce((acc, session) => {
                    acc[session.recommendedGenre] = (acc[session.recommendedGenre] || 0) + 1;
                    return acc;
                }, {})).map(([genre, count]) => ({ genre, count })),
                xField: 'genre',
                yField: 'count',
                title: 'Genre Recommendation Frequency',
                xLabel: 'Genre',
                yLabel: 'Recommendations',
                canvasId: 'streaming-genre-dist'
            })
        },
        {
            title: "Watch Time vs Device Type",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'watchTime',
                yField: 'device',
                colorField: 'recommendedGenre',
                title: 'Watch Time by Device',
                xLabel: 'Watch Time (minutes)',
                yLabel: 'Device Type',
                canvasId: 'streaming-device-time'
            })
        }
    ];
};

// Warehouse Robot charts
export const generateWarehouseCharts = (data) => {
    return [
        {
            title: "Robot Performance Analysis",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'optimalSteps',
                yField: 'actualSteps',
                title: 'Optimal vs Actual Steps',
                xLabel: 'Optimal Steps',
                yLabel: 'Actual Steps Taken',
                canvasId: 'warehouse-performance'
            })
        },
        {
            title: "Reward Distribution",
            component: React.createElement(window.ChartComponents.BarChart, {
                data: data.map(d => ({ 
                    rewardRange: d.reward >= 90 ? '90-100' : 
                                d.reward >= 80 ? '80-89' : 
                                d.reward >= 70 ? '70-79' : 
                                d.reward >= 60 ? '60-69' : 'Below 60',
                    count: 1 
                })).reduce((acc, curr) => {
                    const existing = acc.find(item => item.rewardRange === curr.rewardRange);
                    if (existing) existing.count++;
                    else acc.push(curr);
                    return acc;
                }, []),
                xField: 'rewardRange',
                yField: 'count',
                title: 'Reward Score Distribution',
                xLabel: 'Reward Range',
                yLabel: 'Number of Missions',
                canvasId: 'warehouse-rewards'
            })
        },
        {
            title: "Obstacles vs Completion Time",
            component: React.createElement(window.ChartComponents.ScatterPlot, {
                data: data,
                xField: 'obstacles',
                yField: 'completionTime',
                title: 'Obstacles vs Completion Time',
                xLabel: 'Number of Obstacles',
                yLabel: 'Completion Time (seconds)',
                canvasId: 'warehouse-obstacles'
            })
        }
    ];
};

// Export specific chart generators
export const specificChartGenerators = {
    insurance: generateInsuranceCharts,
    asteroid: generateAsteroidCharts,
    medical: generateMedicalCharts,
    streaming: generateStreamingCharts,
    warehouse: generateWarehouseCharts
};

// Enhanced example configurations
export const enhancedExamples = {
    1: { // Vineyard
        dataGenerator: 'vineyard',
        chartType: 'regression',
        insights: [
            "Linear regression shows strong correlation between rainfall and yield",
            "Temperature has moderate positive impact on harvest",
            "Soil pH shows inverse relationship with productivity"
        ]
    },
    2: { // Dragon Egg
        dataGenerator: 'dragonEgg',
        chartType: 'classification',
        insights: [
            "Logistic regression creates clear decision boundary at 1200°F",
            "Magical aura significantly influences hatching probability",
            "Temperature and aura show interactive effects"
        ]
    },
    4: { // Insurance
        dataGenerator: 'insurance',
        chartGenerator: 'insurance',
        insights: [
            "High claim amounts correlate with fraud likelihood",
            "Extended reporting delays are red flags",
            "Multiple previous claims increase fraud probability"
        ]
    },
    5: { // Asteroid
        dataGenerator: 'asteroid',
        chartGenerator: 'asteroid',
        insights: [
            "SVM effectively separates asteroid types in spectral space",
            "Metallic asteroids cluster in high reflectance region",
            "Ice signatures distinguish icy asteroids clearly"
        ]
    },
    6: { // Medical
        dataGenerator: 'medical',
        chartGenerator: 'medical',
        insights: [
            "Neural networks detect subtle pattern differences",
            "Edge sharpness is strongest tumor indicator",
            "AI confidence correlates with actual diagnosis accuracy"
        ]
    },
    7: { // Retail
        dataGenerator: 'retail',
        chartType: 'clustering',
        insights: [
            "K-means identified 5 distinct customer segments",
            "Luxury seekers have highest spending but lowest frequency",
            "Impulse shoppers drive transaction volume"
        ]
    }
};

window.specificChartGenerators = specificChartGenerators;
window.enhancedExamples = enhancedExamples;