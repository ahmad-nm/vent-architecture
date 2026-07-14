import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function ContactCTA() {
    return (
        <Section>
            <Container>

                <div className="border border-white/10 rounded-xl p-10 text-center space-y-6">

                    <h2 className="text-2xl font-light">
                        Let’s build something together
                    </h2>

                    <p className="text-white/60">
                        Have a project in mind? We’re open to collaborations.
                    </p>

                    <a
                        href="/contact"
                        className="inline-block px-6 py-3 bg-transparent border border-white text-white rounded-md"
                    >
                        Contact Us
                    </a>

                </div>

            </Container>
        </Section>
    );
}