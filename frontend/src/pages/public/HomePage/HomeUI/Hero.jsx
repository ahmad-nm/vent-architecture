import Container from "@/components/ui/Container";
import RevealText from "@/components/motion/RevealText";
import MagneticButton from "@/components/motion/MagneticButton";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero min-h-[90vh] relative flex items-center z-10">
      <Container className="pt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left space for building */}
          <div className="hidden lg:block" />

          {/* Right side text */}
          <div className="space-y-6 max-w-xl">
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              className="text-white/50 text-sm tracking-widest uppercase"
            >
              Architecture Studio
            </motion.p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
              <RevealText text="Building spaces" />
              <br />
              <RevealText text="for the future" />
            </h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              className="text-white/60 max-w-xl"
            >
              We design architectural experiences that merge structure, light,
              and emotion.
            </motion.p>

            <motion.div variants={fadeInUp} initial="show">
              <MagneticButton>
                <Link
                  to="/projects"
                  className="px-6 py-3 border border-white/20 rounded-full"
                >
                  Explore Projects
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
