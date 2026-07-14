import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'

export default function FadeInSection({ children }) {
    return (
        <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            {children}
        </motion.section>
    )
}