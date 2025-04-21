
export function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-border">
      <div className="container max-w-4xl mx-auto text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} - Built with React & Tailwind CSS</p>
      </div>
    </footer>
  );
}
