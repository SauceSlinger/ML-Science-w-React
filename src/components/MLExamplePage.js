// ML Example Page Template Component
// Reusable template for displaying ML examples with data, charts, and explanations

/**
 * Main ML Example Page Template
 */
function MLExamplePage({ 
    title, 
    description, 
    algorithm, 
    category,
    icon,
    data, 
    charts, 
    keyPoints, 
    useCases,
    onBack 
}) {
    const [selectedTab, setSelectedTab] = React.useState('overview');
    const [dataPageSize, setDataPageSize] = React.useState(20);
    const [currentDataPage, setCurrentDataPage] = React.useState(0);
    
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Supervised':
                return {
                    bg: 'bg-blue-100',
                    border: 'border-blue-500',
                    text: 'text-blue-700',
                    badge: 'bg-blue-500'
                };
            case 'Unsupervised':
                return {
                    bg: 'bg-green-100',
                    border: 'border-green-500',
                    text: 'text-green-700',
                    badge: 'bg-green-500'
                };
            case 'RL':
                return {
                    bg: 'bg-purple-100',
                    border: 'border-purple-500',
                    text: 'text-purple-700',
                    badge: 'bg-purple-500'
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    border: 'border-gray-500',
                    text: 'text-gray-700',
                    badge: 'bg-gray-500'
                };
        }
    };
    
    const colors = getCategoryColor(category);
    
    // Paginate data
    const startIndex = currentDataPage * dataPageSize;
    const endIndex = startIndex + dataPageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / dataPageSize);
    
    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'data', label: 'Data', icon: '💾' },
        { id: 'visualization', label: 'Visualization', icon: '📈' },
        { id: 'insights', label: 'Insights', icon: '💡' }
    ];
    
    const renderOverview = () => React.createElement('div', { 
        className: 'space-y-6'
    }, [
        // Algorithm Info
        React.createElement('div', {
            key: 'algo-info',
            className: `${colors.bg} rounded-lg p-6 border-l-4 ${colors.border}`
        }, [
            React.createElement('div', {
                key: 'header',
                className: 'flex items-center gap-3 mb-4'
            }, [
                React.createElement('span', { key: 'icon', className: 'text-4xl' }, icon),
                React.createElement('div', { key: 'title-section' }, [
                    React.createElement('h2', {
                        key: 'title',
                        className: `text-2xl font-bold ${colors.text}`
                    }, title),
                    React.createElement('span', {
                        key: 'badge',
                        className: `${colors.badge} text-white text-sm font-bold px-3 py-1 rounded-full`
                    }, `${category} Learning`)
                ])
            ]),
            React.createElement('p', {
                key: 'description',
                className: 'text-gray-700 text-lg leading-relaxed'
            }, description)
        ]),
        
        // Key Points
        React.createElement('div', {
            key: 'key-points',
            className: 'bg-white rounded-lg p-6 shadow-md'
        }, [
            React.createElement('h3', {
                key: 'kp-title',
                className: 'text-xl font-semibold mb-4 flex items-center gap-2'
            }, ['✨ Key Points']),
            React.createElement('ul', {
                key: 'kp-list',
                className: 'space-y-3'
            }, keyPoints.map((point, index) => 
                React.createElement('li', {
                    key: index,
                    className: 'flex items-start gap-3'
                }, [
                    React.createElement('span', {
                        key: 'bullet',
                        className: `${colors.text} font-bold`
                    }, '•'),
                    React.createElement('span', {
                        key: 'text',
                        className: 'text-gray-700'
                    }, point)
                ])
            ))
        ]),
        
        // Use Cases
        React.createElement('div', {
            key: 'use-cases',
            className: 'bg-white rounded-lg p-6 shadow-md'
        }, [
            React.createElement('h3', {
                key: 'uc-title',
                className: 'text-xl font-semibold mb-4 flex items-center gap-2'
            }, ['💡 Use Cases']),
            React.createElement('ul', {
                key: 'uc-list',
                className: 'space-y-3'
            }, useCases.map((useCase, index) => 
                React.createElement('li', {
                    key: index,
                    className: 'flex items-start gap-3'
                }, [
                    React.createElement('span', {
                        key: 'arrow',
                        className: `${colors.text} font-bold`
                    }, '→'),
                    React.createElement('span', {
                        key: 'text',
                        className: 'text-gray-700'
                    }, useCase)
                ])
            ))
        ]),
        
        // Dataset Info
        React.createElement('div', {
            key: 'dataset-info',
            className: 'bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6'
        }, [
            React.createElement('h3', {
                key: 'ds-title',
                className: 'text-xl font-semibold mb-4'
            }, '📊 Dataset Information'),
            React.createElement('div', {
                key: 'ds-stats',
                className: 'grid grid-cols-2 md:grid-cols-4 gap-4'
            }, [
                React.createElement('div', {
                    key: 'samples',
                    className: 'text-center'
                }, [
                    React.createElement('div', {
                        key: 'count',
                        className: 'text-2xl font-bold text-blue-600'
                    }, data.length),
                    React.createElement('div', {
                        key: 'label',
                        className: 'text-sm text-gray-600'
                    }, 'Samples')
                ]),
                React.createElement('div', {
                    key: 'features',
                    className: 'text-center'
                }, [
                    React.createElement('div', {
                        key: 'count',
                        className: 'text-2xl font-bold text-green-600'
                    }, Object.keys(data[0] || {}).length),
                    React.createElement('div', {
                        key: 'label',
                        className: 'text-sm text-gray-600'
                    }, 'Features')
                ]),
                React.createElement('div', {
                    key: 'algorithm',
                    className: 'text-center md:col-span-2'
                }, [
                    React.createElement('div', {
                        key: 'name',
                        className: 'text-lg font-semibold text-purple-600'
                    }, algorithm),
                    React.createElement('div', {
                        key: 'label',
                        className: 'text-sm text-gray-600'
                    }, 'Algorithm')
                ])
            ])
        ])
    ]);
    
    const renderDataTable = () => {
        if (!data || data.length === 0) {
            return React.createElement('div', {
                className: 'text-center py-8 text-gray-500'
            }, 'No data available');
        }
        
        const columns = Object.keys(data[0]);
        
        return React.createElement('div', {
            className: 'bg-white rounded-lg shadow-md overflow-hidden'
        }, [
            // Table Header
            React.createElement('div', {
                key: 'header',
                className: 'px-6 py-4 bg-gray-50 border-b'
            }, [
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-lg font-semibold'
                }, '💾 Raw Data'),
                React.createElement('p', {
                    key: 'info',
                    className: 'text-sm text-gray-600 mt-1'
                }, `Showing ${startIndex + 1}-${Math.min(endIndex, data.length)} of ${data.length} records`)
            ]),
            
            // Table
            React.createElement('div', {
                key: 'table-container',
                className: 'overflow-x-auto'
            }, 
                React.createElement('table', {
                    className: 'w-full'
                }, [
                    React.createElement('thead', {
                        key: 'thead',
                        className: 'bg-gray-100'
                    }, 
                        React.createElement('tr', {}, 
                            columns.map(column => 
                                React.createElement('th', {
                                    key: column,
                                    className: 'px-4 py-3 text-left text-sm font-medium text-gray-700'
                                }, column)
                            )
                        )
                    ),
                    React.createElement('tbody', {
                        key: 'tbody',
                        className: 'divide-y divide-gray-200'
                    }, 
                        paginatedData.map((row, index) => 
                            React.createElement('tr', {
                                key: index,
                                className: 'hover:bg-gray-50'
                            }, 
                                columns.map(column => 
                                    React.createElement('td', {
                                        key: column,
                                        className: 'px-4 py-3 text-sm text-gray-900'
                                    }, 
                                        typeof row[column] === 'boolean' ? 
                                            (row[column] ? '✅' : '❌') :
                                            typeof row[column] === 'number' ? 
                                                row[column].toFixed(2) :
                                                String(row[column])
                                    )
                                )
                            )
                        )
                    )
                ])
            ),
            
            // Pagination
            totalPages > 1 && React.createElement('div', {
                key: 'pagination',
                className: 'px-6 py-4 bg-gray-50 border-t flex items-center justify-between'
            }, [
                React.createElement('div', {
                    key: 'page-info',
                    className: 'text-sm text-gray-600'
                }, `Page ${currentDataPage + 1} of ${totalPages}`),
                
                React.createElement('div', {
                    key: 'page-controls',
                    className: 'flex gap-2'
                }, [
                    React.createElement('button', {
                        key: 'prev',
                        onClick: () => setCurrentDataPage(Math.max(0, currentDataPage - 1)),
                        disabled: currentDataPage === 0,
                        className: `px-3 py-1 rounded text-sm ${
                            currentDataPage === 0 ? 
                                'bg-gray-200 text-gray-400 cursor-not-allowed' : 
                                'bg-blue-500 text-white hover:bg-blue-600'
                        }`
                    }, 'Previous'),
                    
                    React.createElement('button', {
                        key: 'next',
                        onClick: () => setCurrentDataPage(Math.min(totalPages - 1, currentDataPage + 1)),
                        disabled: currentDataPage === totalPages - 1,
                        className: `px-3 py-1 rounded text-sm ${
                            currentDataPage === totalPages - 1 ? 
                                'bg-gray-200 text-gray-400 cursor-not-allowed' : 
                                'bg-blue-500 text-white hover:bg-blue-600'
                        }`
                    }, 'Next')
                ])
            ])
        ]);
    };
    
    const renderVisualization = () => React.createElement('div', {
        className: 'space-y-6'
    }, [
        React.createElement('div', {
            key: 'viz-header',
            className: 'bg-white rounded-lg p-6 shadow-md'
        }, [
            React.createElement('h3', {
                key: 'title',
                className: 'text-xl font-semibold mb-2'
            }, '📈 Interactive Visualizations'),
            React.createElement('p', {
                key: 'desc',
                className: 'text-gray-600'
            }, 'Explore the data through various chart types and identify patterns.')
        ]),
        
        ...charts.map((chart, index) => 
            React.createElement('div', {
                key: index,
                className: 'bg-white rounded-lg p-6 shadow-md'
            }, [
                React.createElement('h4', {
                    key: 'chart-title',
                    className: 'text-lg font-medium mb-4 text-gray-800'
                }, chart.title),
                chart.component
            ])
        )
    ]);
    
    const renderInsights = () => React.createElement('div', {
        className: 'space-y-6'
    }, [
        // Data Statistics
        data.length > 0 && React.createElement(window.ChartComponents.DataStats, {
            key: 'stats',
            data: data,
            title: '📊 Statistical Summary'
        }),
        
        // Algorithm Insights
        React.createElement('div', {
            key: 'algo-insights',
            className: 'bg-white rounded-lg p-6 shadow-md'
        }, [
            React.createElement('h3', {
                key: 'title',
                className: 'text-xl font-semibold mb-4 flex items-center gap-2'
            }, ['🧠 Algorithm Insights']),
            React.createElement('div', {
                key: 'content',
                className: 'prose max-w-none text-gray-700'
            }, [
                React.createElement('p', {
                    key: 'p1'
                }, `This ${algorithm} model demonstrates ${category.toLowerCase()} learning principles by analyzing the provided dataset.`),
                React.createElement('p', {
                    key: 'p2'
                }, `The visualization reveals patterns and relationships that the algorithm uses to make predictions or discoveries.`),
                React.createElement('p', {
                    key: 'p3'
                }, 'Observe how different features contribute to the model\'s decision-making process through the interactive charts.')
            ])
        ])
    ]);
    
    const renderTabContent = () => {
        switch (selectedTab) {
            case 'overview': return renderOverview();
            case 'data': return renderDataTable();
            case 'visualization': return renderVisualization();
            case 'insights': return renderInsights();
            default: return renderOverview();
        }
    };
    
    return React.createElement('div', {
        className: 'min-h-screen bg-gray-50'
    }, [
        // Header
        React.createElement('header', {
            key: 'header',
            className: 'bg-white shadow-sm border-b'
        }, 
            React.createElement('div', {
                className: 'container mx-auto px-4 py-4'
            }, 
                React.createElement('div', {
                    className: 'flex items-center gap-4'
                }, [
                    React.createElement('button', {
                        key: 'back-btn',
                        onClick: onBack,
                        className: 'flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                    }, ['← Back to Examples']),
                    
                    React.createElement('div', {
                        key: 'title-section',
                        className: 'flex items-center gap-3'
                    }, [
                        React.createElement('span', {
                            key: 'icon',
                            className: 'text-3xl'
                        }, icon),
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl font-bold text-gray-800'
                        }, title)
                    ])
                ])
            )
        ),
        
        // Navigation Tabs
        React.createElement('nav', {
            key: 'nav',
            className: 'bg-white shadow-sm'
        }, 
            React.createElement('div', {
                className: 'container mx-auto px-4'
            }, 
                React.createElement('div', {
                    className: 'flex space-x-8'
                }, 
                    tabs.map(tab => 
                        React.createElement('button', {
                            key: tab.id,
                            onClick: () => setSelectedTab(tab.id),
                            className: `flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                                selectedTab === tab.id ? 
                                    `${colors.border.replace('border-', 'border-b-')} ${colors.text}` : 
                                    'border-transparent text-gray-500 hover:text-gray-700'
                            }`
                        }, [`${tab.icon} ${tab.label}`])
                    )
                )
            )
        ),
        
        // Main Content
        React.createElement('main', {
            key: 'main',
            className: 'container mx-auto px-4 py-8'
        }, renderTabContent())
    ]);
}

// Export the template
window.MLExamplePage = MLExamplePage;