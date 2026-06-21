"use client"
import useLenis from "@/hook/useLenis"

const SmoothScroll = ({ children }) => {
    useLenis();
  return (
    <div>
      { children }
    </div>
  )
}

export default SmoothScroll
