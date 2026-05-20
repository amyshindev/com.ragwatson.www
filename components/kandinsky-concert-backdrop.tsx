/**
 * *Impression III (Concert)* (1911) — centered for 16:9; margins filled with
 * extended palette; soft blend at image ↔ background boundary.
 */
export function KandinskyConcertBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Extended canvas — softer, wider blends */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#e0b020",
          backgroundImage: `
            radial-gradient(ellipse 120% 100% at 85% 58%, rgb(252 226 95) 0%, rgb(244 208 55) 28%, rgb(232 186 32) 55%, rgb(216 165 22) 82%, rgb(202 152 18) 100%),
            radial-gradient(ellipse 70% 120% at -15% 50%, rgb(56 18 18) 0%, rgb(120 36 30) 15%, rgb(168 52 36) 32%, rgb(210 120 48) 52%, rgb(228 168 52) 68%, transparent 88%),
            linear-gradient(168deg, rgb(212 158 26) 0%, rgb(232 192 48) 38%, rgb(244 212 72) 62%, rgb(250 228 95) 100%)
          `,
        }}
      />

      {/* Soft underpainting — stronger bloom so painting ↔ margin blends smoothly */}
      <img
        src="/kandinsky-impression-iii-concert.png"
        alt=""
        className="absolute inset-0 z-0 h-full w-full scale-[1.14] object-contain object-center opacity-[0.58] blur-[52px]"
        aria-hidden
        decoding="async"
      />

      {/* Painting — crisp layer + wider color bleed on outline */}
      <img
        src="/kandinsky-impression-iii-concert.png"
        alt=""
        className="absolute inset-0 z-[1] h-full w-full object-contain object-center"
        style={{
          filter:
            "drop-shadow(0 0 28px rgba(250, 222, 88, 0.55)) drop-shadow(0 0 64px rgba(238, 198, 52, 0.38)) drop-shadow(0 0 110px rgba(226, 178, 32, 0.22))",
        }}
        decoding="async"
        fetchPriority="low"
      />

      {/* Vignette — gradual merge toward extended yellow at viewport rim */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `
            radial-gradient(ellipse 140% 125% at 50% 50%, transparent 32%, rgba(236, 190, 42, 0.08) 58%, rgba(220, 168, 26, 0.2) 82%, rgba(208, 152, 18, 0.34) 100%)
          `,
        }}
      />
    </div>
  )
}
