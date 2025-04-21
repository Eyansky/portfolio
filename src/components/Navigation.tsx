
import { useState, useEffect } from 'react';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      
      const sections = ['about', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
          }
        }
      }
      
      // If at the top, set to hero
      if (scrollPosition < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-3' : 'py-5'
    }`}>
      <div className="container max-w-4xl mx-auto px-4 flex justify-end items-center gap-6">
        <button 
          onClick={() => scrollToSection('hero')}
          className={`text-sm ${activeSection === 'hero' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
        >
          Home
        </button>
        <button 
          onClick={() => scrollToSection('about')}
          className={`text-sm ${activeSection === 'about' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('skills')}
          className={`text-sm ${activeSection === 'skills' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
        >
          Skills
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className={`text-sm ${activeSection === 'contact' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
