import Hero from "./HomeUI/Hero";
import Intro from "./HomeUI/Intro";
import ProjectsPreview from "./HomeUI/ProjectsPreview";
import AboutPreview from "./HomeUI/AboutPreview";
import ContactCTA from "./HomeUI/ContactCTA";
import LogoScene from "@/components/scene/LogoScene";
import { useState, useEffect, useRef } from "react";
import ServicesPreview from "./HomeUI/ServicesPreview";
import VentRevealSection from "./HomeUI/VentRevealSection/VentRevealSection";

export default function HomePage() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [sectionProgress, setSectionProgress] = useState({ hero: 0, intro: 0 });
    const heroRef = useRef(null);
    const introRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const transitionHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const progress = Math.min(Math.max(scrollY / transitionHeight, 0), 1);
            setScrollProgress(progress);

            // Calculate section-specific progress for mobile two-phase animation
            if (heroRef.current && introRef.current) {
                const heroRect = heroRef.current.getBoundingClientRect();
                const introRect = introRef.current.getBoundingClientRect();

                // Hero progress: from when hero enters viewport to when it leaves
                const heroStart = heroRect.top + scrollY;
                const heroEnd = heroRect.top + scrollY + heroRect.height;
                const heroProgress = Math.min(
                    Math.max((scrollY - heroStart) / heroRect.height, 0),
                    1,
                );

                // Intro progress: from when intro enters viewport to when it leaves
                const introStart = introRect.top + scrollY;
                const introEnd = introRect.top + scrollY + introRect.height;
                const introProgress = Math.min(
                    Math.max((scrollY - introStart) / introRect.height, 0),
                    1,
                );

                setSectionProgress({ hero: heroProgress, intro: introProgress });
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call once on mount

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="pt-20 md:pt-24">
            <div className="relative">
                <div className="absolute inset-0 -z-10 min-h-screen">
                    <LogoScene
                        scrollProgress={scrollProgress}
                        sectionProgress={sectionProgress}
                    />
                </div>

                <div ref={heroRef}>
                    <Hero />
                </div>
                
                <div ref={introRef}>
                    <Intro />
                </div>
            </div>
            
            <VentRevealSection />
            
            <ServicesPreview />

            <ProjectsPreview type="Exterior" />
            <ProjectsPreview type="Interior" />

            <AboutPreview />
            <ContactCTA />
        </div>
    );
}
