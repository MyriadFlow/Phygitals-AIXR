import CreateAvatar from "./page";

export default function CreateAvatarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="create-avatar"
      className="p-20 bg-gradient-radial from-accent to-secondary text-primary-dark dark:text-primary-light h-[100vh]"
    >
      <h2 className="text-3xl font-bold mb-4">Create Your Avatar</h2>
      {children}
    </div>
  );
}
