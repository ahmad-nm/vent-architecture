import { transitions } from './transitions'

// Fade in from bottom
export const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: transitions.smooth
    }
}

// Fade in simple
export const fadeIn = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: transitions.smooth
    }
}

// Scale in
export const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    show: {
        opacity: 1,
        scale: 1,
        transition: transitions.smooth
    }
}

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};