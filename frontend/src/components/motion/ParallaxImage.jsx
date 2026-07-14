import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ParallaxImage({ src }) {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

    return (
        <div ref={ref} style={{ overflow: 'hidden' }}>
            <motion.img
                src={src}
                style={{ y, width: '100%', height: 'auto' }}
            />
        </div>
    )
}