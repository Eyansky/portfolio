
interface AboutSectionProps {
  about: string;
  philosophy: string;
}

export function AboutSection({ about, philosophy }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
            {about}
          </p>
          
          <div className="border-l-4 border-primary pl-6 opacity-0 animate-fade-in [animation-delay:400ms] [animation-fill-mode:forwards]">
            <p className="italic text-muted-foreground">
              "{philosophy}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
