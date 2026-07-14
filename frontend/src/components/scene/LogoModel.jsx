import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useGLTF, Float } from "@react-three/drei";

const targets = {
    left: -2.5,
    center: 0,
    right: -2.5,
};

export default function LogoModel({
    scrollProgress,
    config,
    sectionProgress = { hero: 0, intro: 0 },
    screenType = "desktop",
}) {
    const { nodes } = useGLTF("/models/logo.glb");

    const group = useRef();

    const left = useRef();
    const center = useRef();
    const right = useRef();

    // cached meshes
    const leftMeshes = useRef([]);
    const centerMeshes = useRef([]);
    const rightMeshes = useRef([]);

    const [ready, setReady] = useState(false);

    const timeRef = useRef(0);
    const transparencyDisabled = useRef(false);

    const ANIMATION_DURATION = 1.5;
    const STAGGER_DELAY = 0.3;
    const SLIDE_DISTANCE = 2;

    const currentX = useRef(config.model.position[0]);
    const currentY = useRef(config.model.position[1]);

    // =========================================================
    // INIT
    // =========================================================
    useEffect(() => {
        if (!nodes || !group.current) return;

        console.log("🧱 MODEL INIT START");

        group.current.visible = false;

        // Reset position refs based on config
        currentX.current = config.model.position[0];
        currentY.current = config.model.position[1];

        // clear old cached meshes
        leftMeshes.current = [];
        centerMeshes.current = [];
        rightMeshes.current = [];

        group.current.traverse((obj) => {
            if (obj.isMesh && obj.material) {
                obj.material.transparent = true;

                obj.material.metalness = 0.8;
                obj.material.roughness = 0.15;
                obj.material.envMapIntensity = 2.5;

                obj.material.onBeforeCompile = (shader) => {
                    shader.fragmentShader = shader.fragmentShader.replace(
                        "#include <output_fragment>",
                        `
                            #include <output_fragment>

                            vec3 viewDir = normalize(vViewPosition);
                            vec3 normal = normalize(vNormal);

                            float fresnel = pow(
                                1.0 - max(dot(normal, viewDir), 0.0),
                                3.0
                            );

                            vec3 edgeColor = vec3(0.4, 0.7, 1.0);

                            gl_FragColor.rgb += fresnel * edgeColor * 0.8;
                            `,
                    );
                };

                obj.material.needsUpdate = true;
            }
        });

        console.log("🧱 MATERIALS CONFIGURED");

        // cache LEFT meshes
        left.current?.traverse((obj) => {
            if (obj.isMesh) {
                leftMeshes.current.push(obj);
            }
        });

        // cache CENTER meshes
        center.current?.traverse((obj) => {
            if (obj.isMesh) {
                centerMeshes.current.push(obj);
            }
        });

        // cache RIGHT meshes
        right.current?.traverse((obj) => {
            if (obj.isMesh) {
                rightMeshes.current.push(obj);
            }
        });

        console.log("📦 LEFT:", leftMeshes.current.length);
        console.log("📦 CENTER:", centerMeshes.current.length);
        console.log("📦 RIGHT:", rightMeshes.current.length);

        // initial positions
        if (left.current) left.current.position.x = -3;
        if (center.current) center.current.position.x = 3;
        if (right.current) right.current.position.x = 5;

        group.current.visible = true;

        setReady(true);
    }, [nodes, config]);

    // =========================================================
    // ANIMATION LOOP
    // =========================================================
    useFrame((state, delta) => {
        if (!ready || !group.current) return;

        timeRef.current += delta;

        // =====================================================
        // GROUP SCROLL MOVE
        // =====================================================
        let targetX, targetY;

        // Mobile uses two-phase animation (hero exit, intro enter)
        if (screenType === "mobile" && config.mobileAnimation) {
            const heroPhase = config.mobileAnimation.hero;
            const introPhase = config.mobileAnimation.intro;

            // Hero phase: model exits right to left
            const heroX =
                heroPhase.modelX.start +
                (heroPhase.modelX.end - heroPhase.modelX.start) * sectionProgress.hero;
            // Intro phase: model enters left to right
            const introX =
                introPhase.modelX.start +
                (introPhase.modelX.end - introPhase.modelX.start) *
                sectionProgress.intro;

            // Use hero X during hero scroll, switch to intro X during intro scroll
            targetX = sectionProgress.hero < 1 ? heroX : introX;

            // Smoothly interpolate Y from hero to intro
            targetY =
                heroPhase.modelY +
                (introPhase.modelY - heroPhase.modelY) *
                Math.min(sectionProgress.intro, 1);

            //   if (timeRef.current % 30 < delta) {
            //     // Log every ~0.5 seconds
            //     console.log("🎬 Mobile Animation:", {
            //       heroProgress: sectionProgress.hero.toFixed(2),
            //       introProgress: sectionProgress.intro.toFixed(2),
            //       heroX: heroX.toFixed(2),
            //       introX: introX.toFixed(2),
            //       targetX: targetX.toFixed(2),
            //       targetY: targetY.toFixed(2),
            //       usingPhase: sectionProgress.hero < 1 ? "HERO" : "INTRO",
            //     });
            //   }
        } else {
            // All other breakpoints use standard single-path animation
            const modelX = config.scrollTargets.modelX;
            const modelY = config.scrollTargets.modelY;

            targetX = modelX.start + (modelX.end - modelX.start) * scrollProgress;
            targetY = modelY.start + (modelY.end - modelY.start) * scrollProgress;
        }

        currentX.current += (targetX - currentX.current) * 0.5;

        currentY.current += (targetY - currentY.current) * 0.5;

        group.current.position.x = currentX.current;
        group.current.position.y = currentY.current;

        // =====================================================
        // LEFT
        // =====================================================
        const leftProgress = Math.min(timeRef.current / ANIMATION_DURATION, 1);

        if (left.current) {
            left.current.position.x =
                -SLIDE_DISTANCE + leftProgress * (targets.left + SLIDE_DISTANCE);

            const opacity = Math.min(leftProgress * 10, 1);

            leftMeshes.current.forEach((mesh) => {
                if (mesh.material) {
                    mesh.material.opacity = opacity;
                }
            });
        }

        // =====================================================
        // CENTER
        // =====================================================
        const centerStart = STAGGER_DELAY;

        const centerProgress = Math.max(
            0,
            Math.min((timeRef.current - centerStart) / ANIMATION_DURATION, 1),
        );

        if (center.current) {
            center.current.position.x =
                SLIDE_DISTANCE - centerProgress * (targets.center + SLIDE_DISTANCE);

            const opacity = Math.min(centerProgress * 10, 1);

            centerMeshes.current.forEach((mesh) => {
                if (mesh.material) {
                    mesh.material.opacity = opacity;
                }
            });
        }

        // =====================================================
        // RIGHT
        // =====================================================
        const rightStart = STAGGER_DELAY * 2;

        const rightProgress = Math.max(
            0,
            Math.min((timeRef.current - rightStart) / ANIMATION_DURATION, 1),
        );

        if (right.current) {
            right.current.position.x =
                SLIDE_DISTANCE - rightProgress * (targets.right + SLIDE_DISTANCE);

            const opacity = Math.min(rightProgress * 10, 1);

            rightMeshes.current.forEach((mesh) => {
                if (mesh.material) {
                    mesh.material.opacity = opacity;
                }
            });
        }

        if (rightProgress >= 1 && !transparencyDisabled.current) {
            transparencyDisabled.current = true;

            group.current.traverse((obj) => {
                if (obj.isMesh && obj.material) {
                    obj.material.transparent = false;
                    obj.material.opacity = 1;
                    obj.material.needsUpdate = true;
                }
            });
        }
    });

    // =========================================================
    // CLEANUP
    // =========================================================
    // useEffect(() => {

    //     return () => {

    //         group.current?.traverse((obj) => {

    //             if (obj.isMesh) {

    //                 obj.geometry?.dispose()

    //                 if (Array.isArray(obj.material)) {

    //                     obj.material.forEach((m) => m.dispose())

    //                 } else {

    //                     obj.material?.dispose()
    //                 }
    //             }
    //         })
    //     }

    // }, [])

    // =========================================================
    // RENDER
    // =========================================================
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group
                ref={group}
                position={[config.model.position[0], config.model.position[1], 0]}
                scale={config.model.scale}
            >
                {nodes.logo_left && <primitive object={nodes.logo_left} ref={left} />}

                {nodes.logo_center && (
                    <primitive object={nodes.logo_center} ref={center} />
                )}

                {nodes.logo_right && (
                    <primitive object={nodes.logo_right} ref={right} />
                )}
            </group>
        </Float>
    );
}
