import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const BoxMove = ({ children }) => {
    const containRef = useRef(null)

  const {contextSafe} =   useGSAP(() => {
        if (containRef.current && containRef.current.children.length > 0) {
            gsap.to(containRef.current.children, {
                x: 600,
                duration: 3,
                delay: 1,
                ease: 'power2.out',
                stagger: 0.2 // Optional: adds a cool sequential delay to each box!
            })
        }
    }, { scope: containRef })
const handleAnimate = contextSafe(() => {
    gsap.to('.box', { x: 400, rotation: 360, duration: 1 });
  });
    return (
        <div ref={containRef} className="boxs-container">
            {children}
            <button onClick={handleAnimate}></button>
        </div>
    )
}

export default BoxMove