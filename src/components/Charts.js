// Interactive Chart Components for ML Examples
// Uses Chart.js for creating various chart types

/**
 * Chart utility functions
 */
const chartUtils = {
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
        purple: '#8b5cf6',
        pink: '#ec4899',
        teal: '#14b8a6',
        orange: '#f97316'
    },
    
    generateColorPalette: (count) => {
        const colors = Object.values(chartUtils.colors);
        return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
    },
    
    addAlpha: (color, alpha = 0.2) => {
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return color;
    }
};

/**
 * Scatter Plot Component for Linear/Logistic Regression
 */
function ScatterPlot({ data, xField, yField, colorField, title, xLabel, yLabel, canvasId }) {
    React.useEffect(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        const datasets = [];
        
        if (colorField) {
            // Group by color field
            const groups = {};
            data.forEach(point => {
                const group = point[colorField];
                if (!groups[group]) groups[group] = [];
                groups[group].push(point);
            });
            
            const colors = chartUtils.generateColorPalette(Object.keys(groups).length);
            
            Object.keys(groups).forEach((group, index) => {
                datasets.push({
                    label: group,
                    data: groups[group].map(point => ({
                        x: point[xField],
                        y: point[yField]
                    })),
                    backgroundColor: chartUtils.addAlpha(colors[index], 0.6),
                    borderColor: colors[index],
                    borderWidth: 1
                });
            });
        } else {
            datasets.push({
                label: 'Data Points',
                data: data.map(point => ({
                    x: point[xField],
                    y: point[yField]
                })),
                backgroundColor: chartUtils.addAlpha(chartUtils.colors.primary, 0.6),
                borderColor: chartUtils.colors.primary,
                borderWidth: 1
            });
        }
        
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: !!colorField
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: xLabel
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: yLabel
                        }
                    }
                },
                interaction: {
                    intersect: false
                }
            }
        });
        
        return () => {
            if (window[`chart_${canvasId}`]) {
                window[`chart_${canvasId}`].destroy();
            }
        };
    }, [data, xField, yField, colorField, title, xLabel, yLabel, canvasId]);
    
    return React.createElement('div', { 
        className: 'relative h-80 w-full'
    }, React.createElement('canvas', { 
        id: canvasId,
        className: 'w-full h-full'
    }));
}

/**
 * Bar Chart Component for Classification and Categorical Data
 */
function BarChart({ data, xField, yField, title, xLabel, yLabel, canvasId, color = chartUtils.colors.primary }) {
    React.useEffect(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        const labels = data.map(item => item[xField]);
        const values = data.map(item => item[yField]);
        
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: yLabel,
                    data: values,
                    backgroundColor: chartUtils.addAlpha(color, 0.6),
                    borderColor: color,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xLabel
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: yLabel
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }, [data, xField, yField, title, xLabel, yLabel, canvasId, color]);
    
    return React.createElement('div', { 
        className: 'relative h-80 w-full'
    }, React.createElement('canvas', { 
        id: canvasId,
        className: 'w-full h-full'
    }));
}

/**
 * Line Chart Component for Time Series and Trends
 */
function LineChart({ data, xField, yField, title, xLabel, yLabel, canvasId, color = chartUtils.colors.info }) {
    React.useEffect(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        const labels = data.map(item => item[xField]);
        const values = data.map(item => item[yField]);
        
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: yLabel,
                    data: values,
                    backgroundColor: chartUtils.addAlpha(color, 0.1),
                    borderColor: color,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xLabel
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: yLabel
                        }
                    }
                },
                interaction: {
                    intersect: false
                }
            }
        });
    }, [data, xField, yField, title, xLabel, yLabel, canvasId, color]);
    
    return React.createElement('div', { 
        className: 'relative h-80 w-full'
    }, React.createElement('canvas', { 
        id: canvasId,
        className: 'w-full h-full'
    }));
}

/**
 * Pie Chart Component for Categorical Distributions
 */
function PieChart({ data, labelField, valueField, title, canvasId }) {
    React.useEffect(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        const labels = data.map(item => item[labelField]);
        const values = data.map(item => item[valueField]);
        const colors = chartUtils.generateColorPalette(data.length);
        
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors.map(color => chartUtils.addAlpha(color, 0.7)),
                    borderColor: colors,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }, [data, labelField, valueField, title, canvasId]);
    
    return React.createElement('div', { 
        className: 'relative h-80 w-full'
    }, React.createElement('canvas', { 
        id: canvasId,
        className: 'w-full h-full'
    }));
}

/**
 * Heatmap Component for Clustering and Correlation
 */
function Heatmap({ data, title, canvasId }) {
    React.useEffect(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        // Convert data to heatmap format
        const datasets = data.map((row, rowIndex) => ({
            label: `Row ${rowIndex}`,
            data: row.map((value, colIndex) => ({
                x: colIndex,
                y: rowIndex,
                v: value
            })),
            backgroundColor: function(context) {
                const value = context.parsed.v;
                const alpha = Math.abs(value);
                return value >= 0 ? 
                    `rgba(34, 197, 94, ${alpha})` : 
                    `rgba(239, 68, 68, ${alpha})`;
            }
        }));
        
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: { display: false }
                },
                scales: {
                    x: { type: 'linear', position: 'bottom' },
                    y: { type: 'linear' }
                },
                elements: {
                    point: {
                        pointStyle: 'rect',
                        radius: 8
                    }
                }
            }
        });
    }, [data, title, canvasId]);
    
    return React.createElement('div', { 
        className: 'relative h-80 w-full'
    }, React.createElement('canvas', { 
        id: canvasId,
        className: 'w-full h-full'
    }));
}

/**
 * Multi-Line Chart for comparing multiple series
 */
function MultiLineChart({ datasets, title, xLabel, yLabel, canvasId }) {
    React.useEffect(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        const colors = chartUtils.generateColorPalette(datasets.length);
        
        const chartDatasets = datasets.map((dataset, index) => ({
            label: dataset.label,
            data: dataset.data,
            borderColor: colors[index],
            backgroundColor: chartUtils.addAlpha(colors[index], 0.1),
            borderWidth: 2,
            fill: false,
            tension: 0.1
        }));
        
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datasets[0]?.labels || [],
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xLabel
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: yLabel
                        }
                    }
                }
            }
        });
    }, [datasets, title, xLabel, yLabel, canvasId]);
    
    return React.createElement('div', { 
        className: 'relative h-80 w-full'
    }, React.createElement('canvas', { 
        id: canvasId,
        className: 'w-full h-full'
    }));
}

/**
 * Data Statistics Component
 */
function DataStats({ data, title }) {
    const calculateStats = (values) => {
        const sorted = [...values].sort((a, b) => a - b);
        const sum = values.reduce((a, b) => a + b, 0);
        const mean = sum / values.length;
        const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
        
        return {
            count: values.length,
            mean: Math.round(mean * 100) / 100,
            median: sorted[Math.floor(sorted.length / 2)],
            min: Math.min(...values),
            max: Math.max(...values),
            std: Math.round(Math.sqrt(variance) * 100) / 100
        };
    };
    
    // Get numeric columns
    const numericColumns = Object.keys(data[0] || {}).filter(key => 
        typeof data[0][key] === 'number'
    );
    
    return React.createElement('div', { 
        className: 'bg-white p-4 rounded-lg shadow-md'
    }, [
        React.createElement('h3', { 
            key: 'title',
            className: 'text-lg font-semibold mb-4 text-gray-800'
        }, title || 'Data Statistics'),
        
        React.createElement('div', { 
            key: 'stats',
            className: 'grid grid-cols-1 md:grid-cols-2 gap-4'
        }, numericColumns.map(column => {
            const values = data.map(row => row[column]).filter(val => typeof val === 'number');
            if (values.length === 0) return null;
            
            const stats = calculateStats(values);
            
            return React.createElement('div', {
                key: column,
                className: 'bg-gray-50 p-3 rounded'
            }, [
                React.createElement('h4', {
                    key: 'col-title',
                    className: 'font-medium text-gray-700 mb-2'
                }, column),
                
                React.createElement('div', {
                    key: 'col-stats',
                    className: 'grid grid-cols-2 gap-2 text-sm'
                }, [
                    React.createElement('div', { key: 'mean' }, `Mean: ${stats.mean}`),
                    React.createElement('div', { key: 'std' }, `Std: ${stats.std}`),
                    React.createElement('div', { key: 'min' }, `Min: ${stats.min}`),
                    React.createElement('div', { key: 'max' }, `Max: ${stats.max}`)
                ])
            ]);
        }))
    ]);
}

// Export all chart components
window.ChartComponents = {
    ScatterPlot,
    BarChart,
    LineChart,
    PieChart,
    Heatmap,
    MultiLineChart,
    DataStats,
    chartUtils
};