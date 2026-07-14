export default function ValueCard({ title, description }) {
    return (
        <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">

            <h3 className="text-xl font-light mb-4">
                {title}
            </h3>

            <p className="text-white/60 leading-relaxed">
                {description}
            </p>

        </div>
    );
}