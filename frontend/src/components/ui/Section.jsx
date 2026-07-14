export default function Section({ children, className = "" }) {
    return (
        <section className={`py-6 sm:py-8 md:py-12 lg:py-16 ${className}`}>
            {children}
        </section>
    );
}