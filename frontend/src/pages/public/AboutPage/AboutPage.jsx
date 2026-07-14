import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import TeamCard from "@/components/about/TeamCard";
import ValueCard from "@/components/about/ValueCard";

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <Section>
        <Container>
          <div className="max-w-4xl space-y-8">
            <p className="uppercase tracking-[0.3em] text-sm text-white/40">
              About
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-tight">
              Architecture shaped by atmosphere, precision, and emotion.
            </h1>

            <p className="text-white/60 leading-relaxed max-w-2xl">
              We are a multidisciplinary architecture studio focused on
              contemporary spatial experiences through minimal and expressive
              design language.
            </p>
          </div>
        </Container>
      </Section>

      {/* PHILOSOPHY */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div className="space-y-6">
              <p className="uppercase text-sm tracking-widest text-white/40">
                Philosophy
              </p>

              <h2 className="text-3xl md:text-4xl font-light leading-tight">
                We believe architecture should create emotional resonance.
              </h2>

              <p className="text-white/60 leading-relaxed">
                Our work explores the relationship between geometry, light,
                texture, and human movement to create spaces that feel timeless
                and immersive.
              </p>
            </div>

            {/* RIGHT */}
            <div className="h-72 md:h-[500px] rounded-2xl bg-white/5 border border-white/10" />
          </div>
        </Container>
      </Section>

      {/* VALUES */}
      <Section>
        <Container>
          <div className="mb-12 space-y-4">
            <p className="uppercase tracking-widest text-sm text-white/40">
              Approach
            </p>

            <h2 className="text-3xl md:text-4xl font-light">
              Our design principles
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard
              title="Minimal Precision"
              description="Every line and proportion is intentional, balancing clarity with spatial elegance."
            />

            <ValueCard
              title="Atmospheric Spaces"
              description="We shape environments through light, shadow, and material rhythm."
            />

            <ValueCard
              title="Timeless Identity"
              description="Our projects aim for longevity beyond trends and temporary aesthetics."
            />
          </div>
        </Container>
      </Section>

      {/* TEAM */}
      <Section>
        <Container>
          <div className="mb-12 space-y-4">
            <p className="uppercase tracking-widest text-sm text-white/40">
              Team
            </p>

            <h2 className="text-3xl md:text-4xl font-light">
              The people behind the studio
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <TeamCard key={item} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CLOSING STATEMENT */}
      <Section>
        <Container>
          <div className="border border-white/10 rounded-3xl p-10 md:p-16 bg-white/[0.02]">
            <div className="max-w-3xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                We design spaces that remain meaningful over time.
              </h2>

              <p className="text-white/60 leading-relaxed">
                Through thoughtful architectural language and spatial
                storytelling, we aim to create environments that inspire
                presence, calmness, and connection.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
