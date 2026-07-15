"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function MeshBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none bg-black"
      aria-hidden="true"
    >
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#000000", "#141414", "#262626", "#555555"]}
        speed={1}
      />
    </div>
  )
}
