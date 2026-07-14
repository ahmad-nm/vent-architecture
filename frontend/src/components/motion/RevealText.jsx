import { motion } from 'framer-motion'
import { transitions } from '@/animations/transitions'

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.04,
        }
    }
}

const word = {
    hidden: {
        y: 30,
        opacity: 0
    },
    show: {
        y: 0,
        opacity: 1,
        transition: transitions.smooth
    }
}

export default function RevealText({ text }) {
    const words = text.split(' ')

    return (
        <motion.span
            variants={container}
            initial="hidden"
            animate="show"
            style={{ display: 'inline-block' }}
        >
            {words.map((w, i) => (
                <motion.span
                    key={i}
                    variants={word}
                    style={{ display: 'inline-block', marginRight: '6px' }}
                >
                    {w}
                </motion.span>
            ))}
        </motion.span>
    )
}