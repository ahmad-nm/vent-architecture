import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "@/animations/gsap";
import floatingBuilding from "@/assets/images/floatingBuilding.png";

export default function FloatingBuilding({ triggerRef }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const trigger = triggerRef?.current;
        if (!el || !trigger) return;

        const ctx = gsap.context(() => {
            gsap.to(el.parentElement, {
                filter: "blur(0.5px)",
                x: "35vw",
                y: 600,
                scale: 0.9,
                opacity: 0.75,
                ease: "none",
                scrollTrigger: {
                trigger: trigger,
                start: "top top",
                end: "bottom bottom-=20%",
                scrub: 1.2,
                },
            });

            gsap.to(el, {
                y: "+=12",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            }, el);

        return () => ctx.revert();
    }, [triggerRef]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-[320px] rounded-xl 
                            flex items-center justify-center text-white/30 relative"
        >
            <div className="text-center space-y-2">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="
                            w-[70%]
                            h-[70%]
                            rounded-full
                            bg-white/10
                            blur-3xl
                            opacity-40
                        "
                    />
                </div>
                <img src={floatingBuilding} alt="Floating Building" className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(255,255,255,0.15)]" />
            </div>
        </motion.div>
    );
}
