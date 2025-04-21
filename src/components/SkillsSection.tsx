
import { useEffect, useState } from 'react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'languages' | 'frameworks' | 'tools';
}

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [categories] = useState({
    languages: skills.filter(skill => skill.category === 'languages'),
    frameworks: skills.filter(skill => skill.category === 'frameworks'),
    tools: skills.filter(skill => skill.category === 'tools')
  });

  const [visibleElements, setVisibleElements] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.skill-item').forEach(item => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll('.skill-item').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  const renderSkill = (skill: Skill, index: number) => (
    <div 
      id={`skill-${skill.category}-${index}`}
      key={`${skill.name}-${index}`}
      className={`skill-item p-4 rounded-lg border border-border bg-card flex items-center space-x-3 opacity-0 transition-all duration-300 ${
        visibleElements.includes(`skill-${skill.category}-${index}`) ? 'opacity-100 translate-y-0' : 'translate-y-4'
      }`}
    >
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-muted">
        {skill.icon}
      </div>
      <span className="font-medium">{skill.name}</span>
    </div>
  );

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/50">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Skills</h2>
        
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
              Languages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.languages.map((skill, index) => renderSkill(skill, index))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 opacity-0 animate-fade-in [animation-delay:400ms] [animation-fill-mode:forwards]">
              Frameworks & Libraries
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.frameworks.map((skill, index) => renderSkill(skill, index))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 opacity-0 animate-fade-in [animation-delay:600ms] [animation-fill-mode:forwards]">
              Tools & Technologies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.tools.map((skill, index) => renderSkill(skill, index))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
