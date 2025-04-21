import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { useEffect } from "react";
import { Code, Database, FileCode, Github, Server, Workflow } from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";

const Index = () => {
  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // Sample skill data - customize this with your own skills
  // Define the skill categories type to match the Skill interface
  type SkillCategory = 'languages' | 'frameworks' | 'tools';
  
  const skills = [
    { name: "JavaScript", icon: <FileCode />, category: "languages" as SkillCategory },
    { name: "TypeScript", icon: <FileCode />, category: "languages" as SkillCategory },
    { name: "Python", icon: <FileCode />, category: "languages" as SkillCategory },
    { name: "Go", icon: <FileCode />, category: "languages" as SkillCategory },


    { name: "FastApi", icon: <Code />, category: "frameworks" as SkillCategory },
    { name: "Django", icon: <Code />, category: "frameworks" as SkillCategory },
    { name: "Flask", icon: <Code />, category: "frameworks" as SkillCategory },
    { name: "GraphQL", icon: <Code />, category: "frameworks" as SkillCategory },
    { name: "React", icon: <Code />, category: "frameworks" as SkillCategory },
    { name: "Next.js", icon: <Code />, category: "frameworks" as SkillCategory },
    { name: "Tailwind CSS", icon: <Code />, category: "frameworks" as SkillCategory },
    { name: "Node.js", icon: <Server />, category: "frameworks" as SkillCategory },
    { name: "Express", icon: <Server />, category: "frameworks" as SkillCategory },

    { name: "MongoDB", icon: <Database />, category: "tools" as SkillCategory },
    { name: "PostgreSQL", icon: <Database />, category: "tools" as SkillCategory },
    { name: "Redis", icon: <Database />, category: "tools" as SkillCategory },
    { name: "Kafka", icon: <Database />, category: "tools" as SkillCategory },
    { name: "RabbitMQ", icon: <Database />, category: "tools" as SkillCategory },
    { name: "ElasticSearch", icon: <Database />, category: "tools" as SkillCategory },
    { name: "Git", icon: <Github />, category: "tools" as SkillCategory },
    { name: "Docker", icon: <Workflow />, category: "tools" as SkillCategory },
    { name: "AWS", icon: <Server />, category: "tools" as SkillCategory },
    { name: "GCP", icon: <Server />, category: "tools" as SkillCategory },
    { name: "Azure", icon: <Server />, category: "tools" as SkillCategory },
    { name: "Terraform", icon: <Server />, category: "tools" as SkillCategory },
    { name: "Kubernetes", icon: <Server />, category: "tools" as SkillCategory },
    { name: "CI/CD", icon: <Workflow />, category: "tools" as SkillCategory },
    { name: "Jenkins", icon: <Workflow />, category: "tools" as SkillCategory },
    { name: "GitHub Actions", icon: <Workflow />, category: "tools" as SkillCategory },
    { name: "Figma", icon: <FileCode />, category: "tools" as SkillCategory },
    { name: "Postman", icon: <FileCode />, category: "tools" as SkillCategory },
    { name: "Swagger", icon: <FileCode />, category: "tools" as SkillCategory },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Interactive Background */}
      <InteractiveBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Hero Section */}
      <HeroSection name="Ian Mwangi" />

      {/* About Section */}
      <AboutSection 
        about="I'm a full stack engineer with a heavy focus on backend systems, passionate about designing clean, scalable, and maintainable architecture that powers real-world applications. 
        I specialize in building robust APIs, event-driven systems, and real-time infrastructure using tools like FastAPI, Kafka, and Redis. Beyond the backend, I'm deeply invested in the future of 
        technology—especially generative AI. I see AI not just as a feature, but as a foundation for the next wave of innovation, 
        and I'm driven to build tools and products that harness its full potential to solve meaningful problems and unlock new creative frontiers."
        philosophy="Building with purpose means more than shipping code — it's about engineering intelligent, scalable systems that evolve, adapt, and empower the future."
      />

      {/* Skills Section */}
      <SkillsSection skills={skills} />

      {/* Contact Section */}
      <ContactSection 
        email="ian@mwangi.dev"
        github="https://github.com/eyansky"
        linkedin="https://www.linkedin.com/in/mwangithedev/"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
