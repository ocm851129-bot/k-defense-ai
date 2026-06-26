interface ToggleProps {
  checked: boolean
  onChange: () => void
  color?: string
  size?: 'sm' | 'md'
  disabled?: boolean
}

export default function Toggle({ checked, onChange, color = '#00d4ff', size = 'md', disabled = false }: ToggleProps) {
  const w = size === 'sm' ? 32 : 44
  const h = size === 'sm' ? 18 : 24
  const r = size === 'sm' ? 14 : 20
  const pad = size === 'sm' ? 2 : 3

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex shrink-0 cursor-pointer rounded-full border transition-all duration-300 focus:outline-none ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      }`}
      style={{
        width: w,
        height: h,
        background: checked ? `${color}30` : '#0a1a2a',
        borderColor: checked ? color : '#1a3a5a',
        boxShadow: checked ? `0 0 8px ${color}40` : 'none',
      }}
    >
      <span
        className="inline-block rounded-full transition-all duration-300"
        style={{
          width: r,
          height: r,
          transform: checked ? `translateX(${w - r - pad * 2}px)` : `translateX(0px)`,
          margin: pad,
          background: checked ? color : '#2a4a5e',
          boxShadow: checked ? `0 0 6px ${color}` : 'none',
        }}
      />
    </button>
  )
}
