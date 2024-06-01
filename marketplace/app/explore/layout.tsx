export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="explore"
      className="flex flex-col min-h-screen p-20 bg-gradient-radial from-accent to-secondary text-primary-dark dark:text-primary-light"
    >
      {children}
    </div>
  );
}
