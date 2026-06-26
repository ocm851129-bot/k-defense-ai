interface RangeSliderProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  color?: string
  label?: string
  unit?: string
  disabled?: boolean
}

export default function RangeSlider({
  value, onChange, min = 0, max = 100, step = 1,
  color = '#00d4ff', label, unit = '%', disabled = false,
}: RangeSliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className={disabled ? 'opacity-40 pointer-events-none' : ''}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#4a7a9b]">{label}</span>
          <span className="text-[11px] font-black number-mono" style={{ color }}>{value}{unit}</span>
        </div>
      )}
      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="w-full h-1.5 bg-[#0a1a2a] rounded-full overflow-hidden border border-[#1a3a5a]">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}60, ${color})` }}
          />
        </div>
        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ accentColor: color }}
        />
        {/* Thumb visual */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 pointer-events-none transition-all"
          style={{
            left: `calc(${pct}% - 8px)`,
            borderColor: color,
            background: '#020b18',
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  )
}
