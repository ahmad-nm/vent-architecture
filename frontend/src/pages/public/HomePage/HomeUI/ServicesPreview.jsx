import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function ServicesPreview() {
    return (
        <Section>
            <Container>

                <h2 className="text-2xl font-light mb-10">Selected Services</h2>
                    
                <div className="grid md:grid-cols-3 gap-6">

                    {[1,2,3].map((item) => (
                        <div
                            key={item}
                            className="border border-white/10 rounded-xl overflow-hidden"
                        >
                            <div className="h-48 bg-white/5"></div>

                            <div className="p-4 space-y-2">
                                <h3 className="text-lg">Service Title</h3>
                                <p className="text-white/50 text-sm">Description of the service offered</p>
                            </div>
                        </div>
                    ))}

                </div>

            </Container>
        </Section>
    );
}