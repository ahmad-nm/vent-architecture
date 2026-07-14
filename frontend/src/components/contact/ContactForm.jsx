import InputField from "./InputField";

export default function ContactForm() {
  return (
    <form className="space-y-6">
      <InputField label="Name" placeholder="Your name" />

      <InputField label="Email" type="email" placeholder="your@email.com" />

      <InputField
        label="Message"
        placeholder="Tell us about your project..."
        textarea
      />

      <button
        type="submit"
        className="
                w-full sm:w-auto
                px-8 py-4
                rounded-xl
                bg-white
                text-black
                hover:opacity-90
                transition
                cursor-pointer
                "
      >
        Send Message
      </button>
    </form>
  );
}
