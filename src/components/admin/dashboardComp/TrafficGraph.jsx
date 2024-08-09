'use client';

import { format } from 'date-fns';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrafficGraph = ({ user_traffic }) => {
    
    return (
        <div className='flex flex-col justify-center items-center' style={{ width: '100%', height: '100%' }}>
            <header className='text-center text-[24px] font-bold border-text p-4'>תנועות משתמשים</header>
            <br />
            <ResponsiveContainer width="100%" height="80%">
                <BarChart
                    data={user_traffic}
                >
                    <CartesianGrid stroke='hsl(var(--muted))' />
                    <XAxis dataKey="name" />
                    <YAxis  
                        tickFormatter={(tick) => formatNumber(tick)} 
                        allowDecimals={false}
                        domain={[0, 'dataMax']}
                        />
                    <Tooltip cursor={{ fill: '#efefed' }} />
                    <Legend />
                    <Bar dataKey="התחברויות" fill="#8884d8" barSize={20} />
                    <Bar dataKey="הרשמות" fill="#82ca9d" barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrafficGraph;





const formatNumber = (tickItem) => {
    return Math.round(tickItem);
};