
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypeWriter from "@/components/TypeWriter";
import { useState } from "react";

interface HeroSectionProps {
  name: string;
}

export function HeroSection({ name }: HeroSectionProps) {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  const taglines = [
    "Full-Stack Engineer | Clean Code Enthusiast",
    "Building AI powered Applications",
    "Turning Ideas into Reality",
  ];

  // Handle typing completion and cycle to next tagline
  const handleTypingComplete = () => {
    setTimeout(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 500);
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-center items-center bg-gradient-to-br from-background to-secondary/50 px-4 z-10"
    >
      <div className="container max-w-4xl mx-auto text-center animate-fade-in [animation-delay:200ms] [animation-fill-mode:backwards]">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">{name}</h1>
        <TypeWriter
          text={taglines[currentTaglineIndex]}
          delay={80}
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          onComplete={handleTypingComplete}
        />
        <Button onClick={scrollToAbout} className="rounded-full mt-8" variant="outline">
          View my work <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in [animation-delay:1000ms] [animation-fill-mode:backwards]">
        <Button onClick={scrollToAbout} variant="ghost" size="icon" className="rounded-full animate-bounce">
          <ArrowDown />
        </Button>
      </div>
    </section>
  );
}

export default HeroSection;
