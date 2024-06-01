export default function MarketplaceLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div
        id="my-assets"
        className="flex flex-col min-h-screen p-20 bg-gradient-radial from-accent to-secondary text-primary-dark dark:text-primary-light"
      >
        {children}
      </div>
    );
  }