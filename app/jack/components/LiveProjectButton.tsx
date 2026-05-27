export default function LiveProjectButton() {
  return (
    <button
      className="rounded-full border-2 font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5 cursor-pointer transition-colors"
      style={{
        borderColor: '#D7E2EA',
        color: '#D7E2EA',
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(215,226,234,0.1)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
      }}
    >
      Live Project
    </button>
  )
}
