import React, { useState } from 'react'
import {AnimatePresence, motion} from "motion/react"

const OpenClick = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      {/* 1. State properly toggle ho rahi hai */}
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Hide Box" : "Show Box"}
      </button>

      {/* 2. Sahi conditional rendering syntax */}
    <AnimatePresence>
          {show && (
        <motion.div
        initial={{opacity:0,scale:0}}
        animate={{opacity:1,scale:1}}
        transition={{duration:1,ease:'easeInOut'}}
        exit={{opacity:0,scale:0}}
        className='boxz'>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}

export default OpenClick