import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Link } from "react-router-dom";
import wpLogo from "@/assets/icons/whatsapp.png";

import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div>
      {/* HERO */}
      <Section>
        <Container>
          <div className="max-w-4xl space-y-8">
            <p className="uppercase tracking-[0.3em] text-sm text-white/40">
              Contact
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-tight">
              Let’s discuss your next project.
            </h1>

            <p className="text-white/60 leading-relaxed max-w-2xl">
              Whether it’s a residential concept, commercial space, or
              architectural collaboration, we’d love to hear from you.
            </p>
          </div>
        </Container>
      </Section>

      {/* CONTACT SECTION */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* LEFT INFO */}
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="uppercase tracking-widest text-sm text-white/40">
                  Studio
                </p>

                <div className="space-y-2 text-white/70">
                  <p>Studio Architecture</p>
                  <p>Beirut, Lebanon</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="uppercase tracking-widest text-sm text-white/40">
                  Contact
                </p>

                <div className="space-y-2 text-white/70">
                  <p>hello@studio.com</p>
                  <p>+961 00 000 000</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="uppercase tracking-widest text-sm text-white/40">
                  Social
                </p>

                <div className="flex flex-wrap gap-6 text-white/70">
                  <a href="#">Instagram</a>
                  <a href="#">LinkedIn</a>
                  <a href="#">Behance</a>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div
              className="
                            flex flex-col
                            border border-white/10
                            rounded-3xl
                            p-8 md:p-10
                            bg-white/[0.02]
                        "
            >
              <div>
                <Link
                  to="https://wa.me/70898982"
                  target="_blank"
                  className="
                                        w-full
                                        px-8 py-6
                                        mb-6
                                        flex items-center justify-center
                                        bg-transparent
                                        text-white
                                        border border-white/20
                                        rounded-lg
                                        hover:text-white
                                        hover:border-white
                                        transition
                                    "
                >
                  <img src={wpLogo} alt="Whatsapp" className="w-5 h-5 mr-2" />
                  Chat with us on WhatsApp
                </Link>
              </div>

              <p className="text-white/60 mb-6">
                Or send us a message using the form below:
              </p>

              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* BOTTOM CTA */}
      <Section>
        <Container>
          <div
            className="
                    border border-white/10
                    rounded-3xl
                    p-10 md:p-16
                    bg-white/[0.02]
                    text-center
                "
          >
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Architecture begins with conversation.
              </h2>

              <p className="text-white/60 leading-relaxed">
                We approach every project with curiosity, precision, and
                long-term vision.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
