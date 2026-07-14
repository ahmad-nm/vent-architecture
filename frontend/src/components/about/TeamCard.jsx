export default function TeamCard() {
    return (
        <div className="space-y-5">

            {/* Image */}
            <div className="aspect-[4/5] rounded-2xl bg-white/5 border border-white/10" />

            {/* Info */}
            <div className="space-y-2">

                <h3 className="text-xl font-light">
                    Alex Morgan
                </h3>

                <p className="text-white/40 text-sm uppercase tracking-wider">
                    Lead Architect
                </p>

            </div>

        </div>
    );
}