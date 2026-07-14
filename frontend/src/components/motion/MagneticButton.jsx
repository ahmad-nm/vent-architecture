import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children }) {
    const ref = useRef(null)

    const handleMouseMove = (e) => {
        const { left, top, width, height } = ref.current.getBoundingClientRect()

        const x = (e.clientX - left - width / 2) * 0.3
        const y = (e.clientY - top - height / 2) * 0.3

        ref.current.style.transform = `translate(${x}px, ${y}px)`
    }

    const handleMouseLeave = () => {
        ref.current.style.transform = `translate(0px, 0px)`
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            style={{
                display: 'inline-block',
                transition: 'transform 0.2s ease'
            }}
        >
            {children}
        </motion.button>
    )
}