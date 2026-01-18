import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🥾</span>
            <span className="text-xl font-bold text-primary italic">Hiking Buddies</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/events" className="text-body hover:text-heading transition-colors font-medium">
              Events
            </a>
            <a href="/routes" className="text-body hover:text-heading transition-colors font-medium">
              Routes
            </a>
            <a href="#" className="text-body hover:text-heading transition-colors font-medium">
              Community
            </a>
            <Button 
              variant="default" 
              size="default"
              className="w-[324px] pr-20 text-white"
              style={{
                background: 'oklch(0.1487 0.6538 250.307)'
              }}
            >
              Create event
            </Button>
            <button className="p-2 text-body hover:text-heading transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <a href="/userprofile" className="w-9 h-9 rounded-full bg-muted overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-body hover:text-heading transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="/events" className="text-body hover:text-heading transition-colors font-medium py-2">
                Events
              </a>
              <a href="#" className="text-body hover:text-heading transition-colors font-medium py-2">
                Routes
              </a>
              <a href="#" className="text-body hover:text-heading transition-colors font-medium py-2">
                Community
              </a>
              <Button variant="default" className="w-full mt-2">
                Create event
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
