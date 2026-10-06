import React from 'react';
import { Check } from 'lucide-react';
import { format, isToday, addDays, startOfWeek } from 'date-fns';

interface Props {
  completedDays: string[];
}

export const WeeklyCalendar: React.FC<Props> = ({ completedDays }) => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  return (
    <div className="flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar">
      {days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isCompleted = completedDays.includes(dateStr);
        const today = isToday(day);

        return (
          <div 
            key={dateStr} 
            className={`flex-shrink-0 w-16 h-20 rounded-[14px] flex flex-col items-center justify-center snap-center border ${
              today ? 'border-[#6366f1] bg-[#6366f1]/10' : 'border-[#2a2a35] bg-[#1a1a23]'
            }`}
          >
            <span className="text-xs text-[#8e8ea0] mb-1 font-medium">{format(day, 'EEE').toUpperCase()}</span>
            <span className={`text-lg font-bold ${today ? 'text-[#6366f1]' : 'text-white'}`}>
              {format(day, 'd')}
            </span>
            <div className="h-4 mt-1 flex items-center justify-center">
              {isCompleted && <Check className="w-4 h-4 text-[#22c55e]" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};
