<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ML Science Explorer - Interactive Machine Learning Guide</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;

        // ML Modules Content Data
        const mlModulesContent = [
            // Supervised Learning
            {
                id: 1,
                category: "Supervised",
                title: "Linear Regression",
                description: "Predicts continuous values by finding the best-fit line through data points. Used for forecasting and trend analysis.",
                useCases: ["House price prediction", "Sales forecasting", "Temperature prediction"],
                keyPoints: [
                    "Simple and interpretable",
                    "Assumes linear relationship",
                    "Sensitive to outliers"
                ],
                icon: "📈"
            },
            {
                id: 2,
                category: "Supervised",
                title: "Logistic Regression",
                description: "Binary classification algorithm that predicts probability of an outcome belonging to a specific class.",
                useCases: ["Email spam detection", "Disease diagnosis", "Customer churn prediction"],
                keyPoints: [
                    "Outputs probabilities (0-1)",
                    "Good for binary classification",
                    "Fast and efficient"
                ],
                icon: "🎯"
            },
            {
                id: 3,
                category: "Supervised",
                title: "Decision Trees",
                description: "Tree-like model of decisions that splits data based on feature values to make predictions.",
                useCases: ["Credit approval", "Medical diagnosis", "Customer segmentation"],
                keyPoints: [
                    "Easy to visualize and interpret",
                    "Handles non-linear relationships",
                    "Prone to overfitting"
                ],
                icon: "🌳"
            },
            {
                id: 4,
                category: "Supervised",
                title: "Random Forest",
                description: "Ensemble of decision trees that combines multiple trees to improve accuracy and reduce overfitting.",
                useCases: ["Fraud detection", "Feature importance ranking", "Risk assessment"],
                keyPoints: [
                    "Reduces overfitting",
                    "Handles missing values well",
                    "Provides feature importance"
                ],
                icon: "🌲"
            },
            {
                id: 5,
                category: "Supervised",
                title: "Support Vector Machines (SVM)",
                description: "Finds the optimal hyperplane that maximally separates different classes in high-dimensional space.",
                useCases: ["Image classification", "Text categorization", "Handwriting recognition"],
                keyPoints: [
                    "Effective in high dimensions",
                    "Memory efficient",
                    "Kernel trick for non-linear data"
                ],
                icon: "⚡"
            },
            {
                id: 6,
                category: "Supervised",
                title: "Neural Networks",
                description: "Complex models inspired by biological neural networks that learn hierarchical representations of data.",
                useCases: ["Image recognition", "Speech recognition", "Natural language processing"],
                keyPoints: [
                    "Learns complex patterns",
                    "Requires large datasets",
                    "Computationally intensive"
                ],
                icon: "🧠"
            },
            
            // Unsupervised Learning
            {
                id: 7,
                category: "Unsupervised",
                title: "K-Means Clustering",
                description: "Groups data into K clusters by minimizing the distance between points and their cluster centers.",
                useCases: ["Customer segmentation", "Image compression", "Anomaly detection"],
                keyPoints: [
                    "Simple and fast",
                    "Requires number of clusters (K)",
                    "Sensitive to initial centroids"
                ],
                icon: "🎨"
            },
            {
                id: 8,
                category: "Unsupervised",
                title: "Hierarchical Clustering",
                description: "Builds a tree of clusters by either merging (agglomerative) or splitting (divisive) data points.",
                useCases: ["Gene sequence analysis", "Document clustering", "Social network analysis"],
                keyPoints: [
                    "No need to specify K",
                    "Creates dendrogram visualization",
                    "Computationally expensive"
                ],
                icon: "🌐"
            },
            {
                id: 9,
                category: "Unsupervised",
                title: "Principal Component Analysis (PCA)",
                description: "Dimensionality reduction technique that finds principal components explaining maximum variance.",
                useCases: ["Data visualization", "Feature reduction", "Noise filtering"],
                keyPoints: [
                    "Reduces dimensionality",
                    "Preserves variance",
                    "Assumes linear relationships"
                ],
                icon: "📊"
            },
            {
                id: 10,
                category: "Unsupervised",
                title: "DBSCAN",
                description: "Density-based clustering that groups points that are closely packed together, marking outliers as noise.",
                useCases: ["Geospatial analysis", "Outlier detection", "Pattern recognition"],
                keyPoints: [
                    "Finds arbitrary shaped clusters",
                    "Robust to outliers",
                    "Doesn't require K"
                ],
                icon: "🔍"
            },
            {
                id: 11,
                category: "Unsupervised",
                title: "Autoencoders",
                description: "Neural networks that learn efficient data encodings in an unsupervised manner, useful for compression.",
                useCases: ["Image denoising", "Anomaly detection", "Data compression"],
                keyPoints: [
                    "Learns compressed representations",
                    "Can denoise data",
                    "Deep learning architecture"
                ],
                icon: "🔄"
            },
            
            // Reinforcement Learning
            {
                id: 12,
                category: "RL",
                title: "Q-Learning",
                description: "Model-free algorithm that learns the value of actions in states to maximize cumulative reward.",
                useCases: ["Game AI", "Robot navigation", "Traffic light control"],
                keyPoints: [
                    "Off-policy learning",
                    "Works without environment model",
                    "Converges to optimal policy"
                ],
                icon: "🎮"
            },
            {
                id: 13,
                category: "RL",
                title: "Deep Q-Network (DQN)",
                description: "Combines Q-learning with deep neural networks to handle high-dimensional state spaces.",
                useCases: ["Atari game playing", "Autonomous driving", "Resource allocation"],
                keyPoints: [
                    "Handles complex environments",
                    "Uses experience replay",
                    "Requires significant computation"
                ],
                icon: "🤖"
            },
            {
                id: 14,
                category: "RL",
                title: "Policy Gradient",
                description: "Directly optimizes the policy by following the gradient of expected reward with respect to policy parameters.",
                useCases: ["Robotics control", "Portfolio management", "Personalized recommendations"],
                keyPoints: [
                    "Directly learns policy",
                    "Works with continuous actions",
                    "High variance in estimates"
                ],
                icon: "🎯"
            },
            {
                id: 15,
                category: "RL",
                title: "Actor-Critic",
                description: "Combines value-based and policy-based methods using an actor (policy) and critic (value function).",
                useCases: ["Robotic manipulation", "Game strategy", "Energy optimization"],
                keyPoints: [
                    "Lower variance than policy gradient",
                    "More stable learning",
                    "Two networks to train"
                ],
                icon: "🎭"
            },
            {
                id: 16,
                category: "RL",
                title: "Multi-Armed Bandit",
                description: "Balances exploration and exploitation to maximize reward when choosing from multiple options.",
                useCases: ["A/B testing", "Ad placement", "Clinical trials"],
                keyPoints: [
                    "Exploration vs exploitation",
                    "Online learning",
                    "Regret minimization"
                ],
                icon: "🎰"
            }
        ];

        // Main App Component
        function MLRulesViewer() {
            const [selectedCategory, setSelectedCategory] = useState('All');
            const [searchTerm, setSearchTerm] = useState('');
            const [expandedCard, setExpandedCard] = useState(null);

            const categories = ['All', 'Supervised', 'Unsupervised', 'RL'];

            const getCategoryColor = (category) => {
                switch (category) {
                    case 'Supervised':
                        return {
                            bg: 'bg-blue-100',
                            border: 'border-blue-500',
                            text: 'text-blue-700',
                            badge: 'bg-blue-500',
                            hover: 'hover:bg-blue-50'
                        };
                    case 'Unsupervised':
                        return {
                            bg: 'bg-green-100',
                            border: 'border-green-500',
                            text: 'text-green-700',
                            badge: 'bg-green-500',
                            hover: 'hover:bg-green-50'
                        };
                    case 'RL':
                        return {
                            bg: 'bg-purple-100',
                            border: 'border-purple-500',
                            text: 'text-purple-700',
                            badge: 'bg-purple-500',
                            hover: 'hover:bg-purple-50'
                        };
                    default:
                        return {
                            bg: 'bg-gray-100',
                            border: 'border-gray-500',
                            text: 'text-gray-700',
                            badge: 'bg-gray-500',
                            hover: 'hover:bg-gray-50'
                        };
                }
            };

            const filteredModules = mlModulesContent.filter(module => {
                const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
                const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    module.description.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            const getCategoryStats = () => {
                const supervised = mlModulesContent.filter(m => m.category === 'Supervised').length;
                const unsupervised = mlModulesContent.filter(m => m.category === 'Unsupervised').length;
                const rl = mlModulesContent.filter(m => m.category === 'RL').length;
                return { supervised, unsupervised, rl };
            };

            const stats = getCategoryStats();

            return (
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <header className="gradient-bg text-white shadow-lg">
                        <div className="container mx-auto px-4 py-8 sm:py-12">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3">
                                🤖 ML Science Explorer
                            </h1>
                            <p className="text-center text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">
                                Your interactive guide to Machine Learning algorithms and applications
                            </p>
                            
                            {/* Stats Bar */}
                            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
                                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                                    <div className="text-xl sm:text-2xl font-bold">{stats.supervised}</div>
                                    <div className="text-xs sm:text-sm opacity-90">Supervised</div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                                    <div className="text-xl sm:text-2xl font-bold">{stats.unsupervised}</div>
                                    <div className="text-xs sm:text-sm opacity-90">Unsupervised</div>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                                    <div className="text-xl sm:text-2xl font-bold">{stats.rl}</div>
                                    <div className="text-xs sm:text-sm opacity-90">Reinforcement</div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Controls */}
                    <div className="sticky top-0 bg-white shadow-md z-10">
                        <div className="container mx-auto px-4 py-4">
                            {/* Search Bar */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="🔍 Search algorithms..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-sm sm:text-base"
                                />
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => {
                                    const colors = getCategoryColor(category === 'All' ? 'default' : category);
                                    const isActive = selectedCategory === category;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                                                isActive
                                                    ? `${colors.badge} text-white shadow-md`
                                                    : `${colors.bg} ${colors.text} ${colors.hover}`
                                            }`}
                                        >
                                            {category}
                                            {category !== 'All' && (
                                                <span className="ml-2 opacity-75">
                                                    ({category === 'Supervised' ? stats.supervised : 
                                                      category === 'Unsupervised' ? stats.unsupervised : 
                                                      stats.rl})
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <main className="container mx-auto px-4 py-8">
                        {filteredModules.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                                    No algorithms found
                                </h3>
                                <p className="text-gray-500">
                                    Try adjusting your search or filter criteria
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {filteredModules.map((module, index) => {
                                    const colors = getCategoryColor(module.category);
                                    const isExpanded = expandedCard === module.id;
                                    
                                    return (
                                        <div
                                            key={module.id}
                                            className={`bg-white rounded-xl shadow-md border-l-4 ${colors.border} card-hover fade-in overflow-hidden`}
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            {/* Card Header */}
                                            <div className={`${colors.bg} p-4`}>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-3xl">{module.icon}</span>
                                                            <span className={`${colors.badge} text-white text-xs font-bold px-2 py-1 rounded`}>
                                                                {module.category}
                                                            </span>
                                                        </div>
                                                        <h3 className={`text-lg sm:text-xl font-bold ${colors.text}`}>
                                                            {module.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-4">
                                                <p className="text-gray-700 text-sm sm:text-base mb-4">
                                                    {module.description}
                                                </p>

                                                {/* Key Points */}
                                                <div className="mb-4">
                                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                                        ✨ Key Points:
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {module.keyPoints.map((point, idx) => (
                                                            <li key={idx} className="text-xs sm:text-sm text-gray-600 flex items-start">
                                                                <span className={`${colors.text} mr-2`}>•</span>
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Use Cases - Expandable */}
                                                <div>
                                                    <button
                                                        onClick={() => setExpandedCard(isExpanded ? null : module.id)}
                                                        className={`w-full text-left font-semibold text-sm ${colors.text} flex items-center justify-between mb-2 ${colors.hover} p-2 rounded transition-colors`}
                                                    >
                                                        <span>💡 Use Cases</span>
                                                        <span className="text-lg">{isExpanded ? '−' : '+'}</span>
                                                    </button>
                                                    
                                                    {isExpanded && (
                                                        <ul className="space-y-1 pl-2 animate-fadeIn">
                                                            {module.useCases.map((useCase, idx) => (
                                                                <li key={idx} className="text-xs sm:text-sm text-gray-600 flex items-start">
                                                                    <span className={`${colors.text} mr-2`}>→</span>
                                                                    {useCase}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </main>

                    {/* Footer */}
                    <footer className="bg-gray-800 text-white mt-12 py-8">
                        <div className="container mx-auto px-4 text-center">
                            <p className="text-sm sm:text-base mb-2">
                                🚀 ML Science Explorer - Interactive Machine Learning Guide
                            </p>
                            <p className="text-xs sm:text-sm opacity-75">
                                Explore {mlModulesContent.length} machine learning algorithms across 3 categories
                            </p>
                            <p className="text-xs mt-4 opacity-50">
                                Built with React & Tailwind CSS
                            </p>
                        </div>
                    </footer>
                </div>
            );
        }

        // Render the app
        ReactDOM.render(<MLRulesViewer />, document.getElementById('root'));
    </script>
</body>
</html>
