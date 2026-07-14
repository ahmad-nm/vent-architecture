import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function AboutPreview() {
    return (
        <Section>
            <Container>

                <div className="grid md:grid-cols-2 gap-10 items-center">

                    <div className="space-y-4">
                        <h2 className="text-2xl font-light">About Vent</h2>

                        <p className="text-white/60 leading-relaxed">
                            We are a multidisciplinary architecture studio exploring form,
                            structure, and spatial storytelling through modern design language.
                        </p>

                        <a href="/about" className="text-sm text-white/60 hover:text-white">
                            Learn more →
                        </a>
                    </div>

                    <div className="h-64 bg-white/5 border border-white/10 rounded-xl"></div>

                </div>

            </Container>
        </Section>
    );
}