import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import LogoModel from "./LogoModel";
import { Suspense, useEffect, useRef, useState } from "react";
import {
    ModelResponsivness,
    getScreenType,
} from "../../constants/ModelResponsivness";

export default function LogoScene({
    scrollProgress,
    sectionProgress = { hero: 0, intro: 0 },
}) {
    const sweepLight = useRef();
    const [screenType, setScreenType] = useState("desktop");
    const [canvasKey, setCanvasKey] = useState(0);

    const config = ModelResponsivness[screenType];

    useEffect(() => {
        const handleResize = () => {
            const newScreenType = getScreenType();
            setScreenType(newScreenType);
            setCanvasKey((prev) => prev + 1);
        };

        // Initial set
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Canvas
            key={canvasKey}
            camera={{ position: config.camera.position, fov: config.camera.fov }}
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                powerPreference: "high-performance",
            }}
            frameloop="always"
        >
            <CameraController scrollProgress={scrollProgress} config={config} />
            <LightController
                scrollProgress={scrollProgress}
                lightRef={sweepLight}
                config={config}
            />

            <ambientLight intensity={config.light.ambient.intensity} />
            <directionalLight
                position={config.light.directional.position}
                intensity={config.light.directional.intensity}
            />

            <Suspense fallback={null}>
                <LogoModel
                    scrollProgress={scrollProgress}
                    config={config}
                    sectionProgress={sectionProgress}
                    screenType={screenType}
                />
            </Suspense>

            <Environment preset="city" intensity={0.6} />
        </Canvas>
    );
}

// =========================================================
// CAMERA SCROLL SYSTEM
// =========================================================
function CameraController({ scrollProgress, config }) {
    useFrame((state) => {
        const cameraX = config.scrollTargets.cameraX;
        const cameraY = config.scrollTargets.cameraY;

        const targetX =
            cameraX.start + (cameraX.end - cameraX.start) * scrollProgress;
        const targetY =
            cameraY.start + (cameraY.end - cameraY.start) * scrollProgress;

        state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
        state.camera.position.y += (targetY - state.camera.position.y) * 0.05;

        state.camera.lookAt(0, 0, 0);
    });

    return null;
}

function LightController({ scrollProgress, lightRef, config }) {
    useFrame(() => {
        if (!lightRef.current) return;

        const { distance, verticalWave, depthMove } = config.light.sweep;

        // horizontal sweep
        lightRef.current.position.x = -3 + scrollProgress * distance;

        // slight vertical wave (feels premium)
        lightRef.current.position.y =
            2.2 + Math.sin(scrollProgress * Math.PI) * verticalWave;

        // depth movement
        lightRef.current.position.z = 3 - scrollProgress * depthMove;
    });

    return null;
}
