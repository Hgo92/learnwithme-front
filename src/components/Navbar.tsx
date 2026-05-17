import { Link } from "react-router"

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b border-border bg-cream/90 backdrop-blur-md">
            <Link to="/" className="font-serif text-lg font-bold tracking-tight text-ink">
                Learn With Me
            </Link>
            <div className="flex gap-2">
                <Link
                    to="/decks"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-ink-soft hover:bg-cream-dark hover:border-border border border-transparent transition-all duration-200"
                >
                    Mes decks
                </Link>
                <Link
                    to="/play"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-all duration-200 shadow-sm"
                >
                    Jouer →
                </Link>
            </div>
        </nav>
    )
}