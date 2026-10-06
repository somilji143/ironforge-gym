import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  data: { date: string; value: number }[];
  label: string;
  color?: string;
}

export const ProgressChart: React.FC<Props> = ({ data, label, color = '#6366f1' }) => {
  return (
    <div className="h-64 w-full bg-[#1a1a23] rounded-[14px] p-4 border border-[#2a2a35]">
      <h3 className="text-white font-semibold mb-4">{label}</h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#8e8ea0" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="#8e8ea0" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#222230', border: '1px solid #35354a', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#8e8ea0', marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3}
              dot={{ fill: '#1a1a23', stroke: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
