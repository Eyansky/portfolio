import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

interface ContactSectionProps {
  email: string;
  github: string;
  linkedin: string;
}

export function ContactSection({ email, github, linkedin }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formspreeEndpoint = 'https://formsubmit.co/mwangii921@gmail.com'; // Replace with your Formspree endpoint

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Reset status after 3 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
            <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[120px] w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : formStatus === 'success' ? 'Sent!' : 'Send Message'}
                {!isSubmitting && formStatus !== 'success' && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </div>
          
          <div className="opacity-0 animate-fade-in [animation-delay:400ms] [animation-fill-mode:forwards]">
            <h3 className="text-xl font-semibold mb-6">Connect with me</h3>
            
            <div className="space-y-6">
              <a 
                href={`mailto:${email}`}
                className="flex items-center p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                <span>{email}</span>
              </a>
              
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <Github className="h-5 w-5 mr-3" />
                <span>GitHub</span>
              </a>
              
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-3" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
