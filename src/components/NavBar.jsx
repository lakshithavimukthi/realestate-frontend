import { Link } from "react-router"
import { Home } from 'lucide-react'

export function NavBar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold text-lg">Dreamscape </span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-secondary-foreground">Home</Link>
            <Link to="/#properties" className="hover:text-secondary-foreground">Properties</Link>
            <Link to="/about" className="hover:text-secondary-foreground">About</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

