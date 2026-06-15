import { useRef } from 'react'
// import BoxMove from './components/BoxMove'
import { motion } from "motion/react"
import OpenClick from './components/OpenClick'

// Optimization 1: Variants ko component ke BAHAAR rakhein.
// Isse har render par object re-create nahi hoga aur performance acchi hogi.
const boxVariant = {
  hidden: {
    opacity: 0,
    x: 0 // entry smooth karne ke liye x ko 0 se start karein
  },
  visible: {
    x: 800,
    opacity: 1,
    // Optimization 2: Entry transition ko variant ke andar hi specify karein
    transition: { duration: 2, delay: 0.2 }
  }
}

const App = () => {
  // const boxRef = useRef(null)
  // const boxRef = useRef([])

  return (
    <div className='boxs'>
      {/* <BoxMove>
        <div ref={(e) => boxRef.current.push(e)} className="box"></div>
        <div ref={(e) => boxRef.current.push(e)} className="box2"></div>
        <div ref={(e) => boxRef.current.push(e)} className="box3"></div>
      </BoxMove> */}
      {/* <motion.div
        className='box'
        variants={boxVariant}
        initial='hidden'
        animate='visible'
        whileInView="visible"
        viewport={{ once: true }}
        // animate={{ opacity: 1, x: 600 }}

        // Gestures (Hover, Tap, Drag)
        whileHover={{ scale: 0.8 }}
        whileTap={{ scale: 2, backgroundColor: "#0000ff" }}

        drag // 1. Yeh box ko draggable banata hai
        dragConstraints={{ top: -50, bottom: 50, left: -100, right: 100 }}
        whileDrag={{ scale: 1.1 }}

        // Optimization 3: Yeh spring transition ab sirf gestures (Hover/Tap/Drag) par smooth effect dega
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      ></motion.div> */}
  <OpenClick />
    </div>
  )
}

export default App