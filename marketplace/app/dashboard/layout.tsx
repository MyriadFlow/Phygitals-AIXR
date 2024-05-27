export default function MarketplaceLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div
        id="my-assets"
        className="p-20 bg-gradient-radial from-accent to-secondary text-primary-dark dark:text-primary-light h-[100vh]"
      >
        {children}
      </div>
    );
  }