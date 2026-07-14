export const ModelResponsivness = {
    mobile: {
        camera: {
            position: [-0.8, 1.8, 3.5],
            fov: 45
        },
        model: {
            scale: 0.06,
            position: [0, 0.8, 0]
        },
        scrollTargets: {
            cameraX: { start: -0.8, end: 0.5 },
            cameraY: { start: 1.8, end: 0 },
            modelX: { start: 0, end: 0.1 },
            modelY: { start: 1.15, end: 0 }
        },
        // Mobile-specific two-phase animation (only for mobile breakpoint)
        mobileAnimation: {
            // Hero phase: exit right to left
            hero: {
                modelX: { start: 0, end: 3 }, // Exit off-screen right
                modelY: 1.15 // Y stays constant
            },
            // Intro phase: enter left to right
            intro: {
                modelX: { start: -3, end: 0 }, // Enter from off-screen left
                modelY: 0 // Y moves to intro position
            }
        },
        light: {
            directional: { position: [1.5, 1, 6], intensity: 1 },
            ambient: { intensity: 0.2 },
            sweep: { distance: 4, verticalWave: 0.4, depthMove: 1 }
        }
    },
    mobileLandscape: {
        camera: {
            position: [-1, 2, 4],
            fov: 48
        },
        model: {
            scale: 0.11,
            position: [0, 1, 0]
        },
        scrollTargets: {
            cameraX: { start: -1, end: 0.6 },
            cameraY: { start: 2, end: 0.2 },
            modelX: { start: -0.8, end: 0.8 },
            modelY: { start: 1, end: -0.6 }
        },
        light: {
            directional: { position: [1.8, 1.2, 7], intensity: 1.1 },
            ambient: { intensity: 0.18 },
            sweep: { distance: 4.5, verticalWave: 0.5, depthMove: 1.2 }
        }
    },
    tablet: {
        camera: {
            position: [-1.2, 2.2, 4.5],
            fov: 50
        },
        model: {
            scale: 0.12,
            position: [0, 1.1, 0]
        },
        scrollTargets: {
            cameraX: { start: -1.2, end: 0.8 },
            cameraY: { start: 2.2, end: 0 },
            modelX: { start: -0.9, end: 0.9 },
            modelY: { start: 1.1, end: -0.9 }
        },
        light: {
            directional: { position: [1.9, 1.1, 7.5], intensity: 1.15 },
            ambient: { intensity: 0.17 },
            sweep: { distance: 5, verticalWave: 0.55, depthMove: 1.3 }
        }
    },
    desktop: {
        camera: {
            position: [-1.5, 2.5, 5],
            fov: 50
        },
        model: {
            scale: 0.15,
            position: [0, 1.3, 0]
        },
        scrollTargets: {
            cameraX: { start: -1.5, end: 1.4 },
            cameraY: { start: 2.5, end: -0.1 },
            modelX: { start: -1.2, end: 1.4 },
            modelY: { start: 1.3, end: -1.2 }
        },
        light: {
            directional: { position: [2, 1, 9], intensity: 1.2 },
            ambient: { intensity: 0.15 },
            sweep: { distance: 6, verticalWave: 0.6, depthMove: 1.5 }
        }
    },
    desktopLarge: {
        camera: {
            position: [-1.8, 2.8, 5.5],
            fov: 52
        },
        model: {
            scale: 0.18,
            position: [0, 1.5, 0]
        },
        scrollTargets: {
            cameraX: { start: -1.8, end: 1.6 },
            cameraY: { start: 2.8, end: -0.3 },
            modelX: { start: -1.4, end: 1.6 },
            modelY: { start: 1.5, end: -1.4 }
        },
        light: {
            directional: { position: [2.2, 1.2, 10], intensity: 1.3 },
            ambient: { intensity: 0.14 },
            sweep: { distance: 6.5, verticalWave: 0.65, depthMove: 1.7 }
        }
    }
}

/**
 * Get the screen type based on window dimensions
 * @returns {string} - 'mobile', 'mobileLandscape', 'tablet', 'desktop', or 'desktopLarge'
 */
export const getScreenType = () => {
    if (typeof window === 'undefined') return 'desktop'

    const width = window.innerWidth
    const height = window.innerHeight
    const isLandscape = width > height

    // Mobile: < 640px
    if (width < 640) {
        return isLandscape ? 'mobileLandscape' : 'mobile'
    }

    // Tablet: 640px - 1024px
    if (width < 1024) {
        return 'tablet'
    }

    // Desktop: 1024px - 1440px
    if (width < 1440) {
        return 'desktop'
    }

    // Large Desktop: >= 1440px
    return 'desktopLarge'
}