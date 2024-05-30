import CreateAvatar from "./page";

export default function CreateAvatarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="create-avatar"
      className="p-20 bg-gradient-radial from-accent to-secondary text-primary-dark dark:text-primary-light"
    >
      {children}
    </div>
  );
}
