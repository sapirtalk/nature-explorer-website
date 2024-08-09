import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`שעה: ${label}`}</p>
                <p className="intro">{`טמפרטורה: ${payload[0].value}°C`}</p>
            </div>
        );
    }

    return null;
};


const WeatherChart = ({ weatherData, onHourClick, selectedHour }) => {
    const filteredData = weatherData.filter(entry => {
        const hour = new Date(entry.localTimestamp).getHours();
        return hour !== 0 && hour !== 3;
    }).map(entry => ({
        time: new Date(entry.localTimestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round(entry.weatherData.temperature),
        hour: new Date(entry.localTimestamp).getHours()
    })).reverse();

    const temperatures = filteredData.map(d => d.temperature);
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);

    const handleDotClick = (data, index) => {
        if (onHourClick) {
            onHourClick(data.hour);
        }
    };

    const renderCustomizedLabel = (props) => {
        const { x, y, value, index } = props;
        const isEdge = index === 0 || index === filteredData.length - 1;
        const dx = isEdge ? (index === 0 ? 10 : -10) : 0;
        return (
            <text x={x + dx} y={y} dy={-10} fontSize={14} textAnchor="middle" fill="#8884d8">
                {value}
            </text>
        );
    };

    const renderCustomizedDot = (props) => {
        const { cx, cy, payload } = props;
        const isSelected = payload.hour === selectedHour;

        return (
            <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 10 : 5}
                fill={'#8884d8'}
                stroke={isSelected ? '#ffffff' : '#8884d8'}
                strokeWidth={isSelected ? 2 : 1}
                onClick={() => handleDotClick(payload.hour)}
                style={{ cursor: 'pointer' }}
            />
        );
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredData} onClick={(e) => {
                if (e && e.activePayload && e.activePayload[0]) {
                    handleDotClick(e.activePayload[0].payload, e.activeTooltipIndex);
                }
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ textAnchor: 'middle' }} />
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#8884d8"
                    domain={[Math.floor(minTemp - 1), Math.ceil(maxTemp + 1)]}
                    allowDecimals={false}
                    tick={{ dx: -20 }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#8884d8"
                    domain={[Math.floor(minTemp - 1), Math.ceil(maxTemp + 1)]}
                    allowDecimals={false}
                    tick={{ dx: 20 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#8884d8"
                    fill="#8884d8"
                    activeDot={{ r: 8 }}
                    dot={renderCustomizedDot}
                >
                    <LabelList dataKey="temperature" position="top" content={renderCustomizedLabel} />
                </Area>
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default WeatherChart;
