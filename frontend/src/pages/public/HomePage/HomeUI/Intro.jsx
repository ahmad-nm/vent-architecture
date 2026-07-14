import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function Intro() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              We design architecture that exists between structure and emotion.
            </h2>

            <p className="text-white/60 leading-relaxed text-lg">
              Our studio focuses on minimal, precise, and experimental
              architectural forms. Each project is a study of light, material,
              and spatial rhythm.
            </p>

            <p className="text-white/50 leading-relaxed">
              From concept to completion, we maintain a philosophy that
              celebrates the relationship between form and function, creating
              spaces that inspire and endure.
            </p>
          </div>

          <div className="hidden lg:block">
            {/* Space for the floating building */}
          </div>
        </div>
      </Container>
    </Section>
  );
}
