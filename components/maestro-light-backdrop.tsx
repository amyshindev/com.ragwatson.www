/** Mesh gradient: blurred blobs with water-surface ripple motion */
export function MaestroLightBackdrop() {
  return (
    <>
      <div
        className="maestro-water-base fixed inset-0 -z-10 bg-gradient-to-br from-[#e0f7fa] via-[#e8faf4] via-45% to-[#f0fdf4]"
        aria-hidden
      />

      <div
        className="maestro-water-shimmer pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      />

      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        {/* Top — wide cyan wash */}
        <div className="absolute -top-36 left-1/2 flex w-[135%] -translate-x-1/2 justify-center">
          <div className="maestro-mesh-sway-a h-[520px] w-full max-w-[1800px]">
            <div className="h-full w-full rounded-[100%] bg-gradient-to-b from-[#7dd3fc]/75 via-[#a5f3fc]/45 to-transparent blur-3xl" />
          </div>
        </div>

        {/* Upper-right — cyan */}
        <div className="absolute top-[18%] -right-[14%] h-[min(100vw,480px)] w-[min(100vw,480px)] md:-right-[4%]">
          <div className="maestro-mesh-sway-b h-full w-full rounded-full bg-cyan-300/70 blur-3xl" />
        </div>

        {/* Mid-left — emerald */}
        <div className="absolute left-[-22%] top-[28%] h-[min(110vw,460px)] w-[min(110vw,460px)] md:left-[-12%]">
          <div className="maestro-mesh-sway-c h-full w-full rounded-full bg-emerald-300/65 blur-3xl" />
        </div>

        {/* Center — mint (mesh intersection) */}
        <div className="absolute left-[4%] top-[36%] h-[min(120vw,560px)] w-[min(120vw,560px)] md:left-[14%]">
          <div className="maestro-mesh-sway-e h-full w-full rounded-full bg-teal-200/55 blur-3xl" />
        </div>

        {/* Lower-right — sky */}
        <div className="absolute bottom-[10%] -right-[8%] h-[min(85vw,380px)] w-[min(85vw,380px)] md:right-[2%]">
          <div className="maestro-mesh-sway-d h-full w-full rounded-full bg-sky-300/60 blur-3xl" />
        </div>

        {/* Bottom-left — mint anchor */}
        <div className="absolute bottom-[-12%] -left-[14%] h-[min(105vw,440px)] w-[min(105vw,440px)]">
          <div className="maestro-mesh-sway-a h-full w-full rounded-full bg-emerald-200/70 blur-3xl [animation-delay:-7s]" />
        </div>

      </div>
    </>
  )
}
