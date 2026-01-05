import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <Mountain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-heading">TrailMates</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-body hover:text-heading transition-colors font-medium">
              Events
            </a>
            <a href="#" className="text-body hover:text-heading transition-colors font-medium">
              Routes
            </a>
            <a href="#" className="text-body hover:text-heading transition-colors font-medium">
              Communities
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="default" size="default">
              Add Event
            </Button>
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
              <a href="#" className="text-body hover:text-heading transition-colors font-medium py-2">
                Events
              </a>
              <a href="#" className="text-body hover:text-heading transition-colors font-medium py-2">
                Routes
              </a>
              <a href="#" className="text-body hover:text-heading transition-colors font-medium py-2">
                Communities
              </a>
              <Button variant="default" className="w-full mt-2">
                Add Event
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
