interface GaugeChartProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  color?: 'red' | 'blue' | 'orange' | 'emerald';
}

function GaugeChart({ label, value, max = 100, unit = '%', color = 'blue' }: GaugeChartProps) {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  const colorClasses = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    orange: 'text-orange-500',
    emerald: 'text-emerald-500',
  };

  const strokeColors = {
    red: '#ef4444',
    blue: '#3b82f6',
    orange: '#f97316',
    emerald: '#f97316',
  };

  return (
    <div className="text-center">
      <div className="relative w-30 md:w-32 h-20 mx-2 md:mx-auto mb-2">
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={strokeColors[color]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 1.26} 126`}
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${rotation} 50 50)`}
          />
          <circle cx="50" cy="50" r="3" fill="#374151" />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className={`text-xl md:text-2xl font-bold ${colorClasses[color]}`}>
            {value}{unit === 'km' ? '' : unit}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      {unit === 'km' && <p className="text-xs text-gray-400">{unit}</p>}
    </div>
  );
}

export default GaugeChart;
