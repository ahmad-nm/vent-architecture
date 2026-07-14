export default function Footer() {
    return (
        <footer className="border-t border-white/5 sm:mt-10 md:mt-15">
            <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-white/50">
                <p>© {new Date().getFullYear()} Studio. All rights reserved.</p>

                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition">Instagram</a>
                    <a href="#" className="hover:text-white transition">LinkedIn</a>
                    <a href="#" className="hover:text-white transition">Behance</a>
                </div>

            </div>
        </footer>
    );
}