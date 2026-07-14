import { motion } from "framer-motion"
import InViewWrapper from "@/utils/InViewWrapper"

export default function VentRevealSection() {

    const ease = [0.65, 0, 0.35, 1]

    return (
        <InViewWrapper>
            {(isInView) => (
                <section className="h-fit w-full flex items-center justify-center overflow-hidden py-10">

                    <svg
                        width="1440"
                        height="291"
                        viewBox="0 0 1440 291"
                        className="w-full h-auto"
                        preserveAspectRatio="xMidYMid meet"
                    >

                        {/* ========================================= */}
                        {/* DEFINITIONS */}
                        {/* ========================================= */}
                        <defs>

                            {/* Concrete fill */}
                            <linearGradient id="concreteFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f5f5f5" />
                                <stop offset="50%" stopColor="#d9d9d9" />
                                <stop offset="100%" stopColor="#bfbfbf" />
                            </linearGradient>

                            {/* Slight softness */}
                            <filter id="soften">
                                <feGaussianBlur stdDeviation="0.35" />
                            </filter>

                            {/* Fill reveal mask */}
                            <mask id="fillMask">
                                {/* full hidden layer */}
                                <rect x="0" y="0" width="1440" height="291" fill="black" />

                                {/* reveal layer (no transform animation issues) */}
                                <motion.rect
                                    x="0"
                                    width="1440"
                                    height="291"
                                    fill="white"
                                    initial={{ y: 291 }}
                                    animate={isInView ? {y: 0} : {y: 291} }
                                    transition={{
                                        duration: 3,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: 1.8
                                    }}
                                />
                            </mask>

                        </defs>

                        {/* ========================================= */}
                        {/* BLUEPRINT LINES */}
                        {/* ========================================= */}

                        {/* Right horizontal */}
                        <motion.path
                            d="M1025 146.628V145.628L1324 145.628V146.628L1025 146.628Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{
                                duration: 0.7,
                                ease,
                                delay: 0
                            }}
                        />

                        {/* Top right diagonal */}
                        <motion.path
                            d="M1440.78 290L1440 290.628L1323 145.628L1323.78 145L1440.78 290Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{
                                duration: 0.7,
                                ease,
                                delay: 0.15
                            }}
                        />

                        {/* Bottom right diagonal */}
                        <motion.path
                            d="M1323.78 146.256L1323 145.628L1440 0.627958L1440.78 1.25592L1323.78 146.256Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{
                                duration: 0.7,
                                ease,
                                delay: 0.3
                            }}
                        />

                        {/* Left horizontal */}
                        <motion.path
                            d="M395 144.628V145.628L117 145.628V144.628L395 144.628Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{
                                duration: 0.7,
                                ease,
                                delay: 0.45
                            }}
                        />

                        {/* Bottom left diagonal */}
                        <motion.path
                            d="M116.222 145L117 145.628L0 290.628L-0.778244 290L116.222 145Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{
                                duration: 0.7,
                                ease,
                                delay: 0.6
                            }}
                        />

                        {/* Top left diagonal */}
                        <motion.path
                            d="M117.779 145L117 145.628L0 0.627962L0.778244 0L117.779 145Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{
                                duration: 0.7,
                                ease,
                                delay: 0.75
                            }}
                        />

                        <g transform="translate(-180 -30) scale(1.25)">

                            {/* ========================================= */}
                            {/* VENT OUTLINE */}
                            {/* ========================================= */}

                            {/* V */}
                            <motion.path
                                d="M482.432 191.628L450.432 99.084H468.288L493.056 169.932L517.696 99.084H535.616L503.616 191.628H482.432Z"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease,
                                    delay: 0.8
                                }}
                            />

                            {/* E */}
                            <motion.path
                                d="M612.368 191.628V99.084H675.92L675.856 114.828H631.12V137.292H669.968V152.716H630.992V175.692L676.56 175.756V191.628H612.368Z"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease,
                                    delay: 0.95
                                }}
                            />

                            {/* N */}
                            <motion.path
                                d="M757.993 191.628V99.084H776.489L818.729 160.332V99.084H837.417V191.628H820.585L776.617 127.948V191.628H757.993Z"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease,
                                    delay: 1.1
                                }}
                            />

                            {/* T */}
                            <motion.path
                                d="M942.15 191.628V115.724H914.182V99.084H988.23V115.724H960.902V191.628H942.15Z"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease,
                                    delay: 1.25
                                }}
                            />

                            {/* ========================================= */}
                            {/* CONCRETE FILL */}
                            {/* ========================================= */}

                            <g mask="url(#fillMask)" filter="url(#soften)">

                                <path
                                    d="M482.432 191.628L450.432 99.084H468.288L493.056 169.932L517.696 99.084H535.616L503.616 191.628H482.432Z"
                                    fill="url(#concreteFill)"
                                />

                                <path
                                    d="M612.368 191.628V99.084H675.92L675.856 114.828H631.12V137.292H669.968V152.716H630.992V175.692L676.56 175.756V191.628H612.368Z"
                                    fill="url(#concreteFill)"
                                />

                                <path
                                    d="M757.993 191.628V99.084H776.489L818.729 160.332V99.084H837.417V191.628H820.585L776.617 127.948V191.628H757.993Z"
                                    fill="url(#concreteFill)"
                                />

                                <path
                                    d="M942.15 191.628V115.724H914.182V99.084H988.23V115.724H960.902V191.628H942.15Z"
                                    fill="url(#concreteFill)"
                                />

                            </g>

                            {/* ========================================= */}
                            {/* TRIANGLE REVEAL */}
                            {/* ========================================= */}

                            <motion.path
                                d="M493.356 144.905L475.815 99.3933L509.602 98.9151L493.356 144.905Z"
                                fill="#929292"
                                initial={{
                                    scale: 0.6,
                                    opacity: 0,
                                    transformOrigin: "center"
                                }}
                                animate={ isInView ? {
                                    scale: 1,
                                    opacity: 1
                                } : {
                                    scale: 0.6,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 1,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 2.8
                                }}
                            />

                        </g>

                    </svg>

                </section>
            )}
        </InViewWrapper>
    )
}