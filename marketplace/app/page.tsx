"use client"

function ConnectWallet() {
  return <w3m-button/>; ;
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-background-light dark:bg-background-dark text-primary-dark dark:text-primary-light">
      <ConnectWallet />
    </div>
  );
}
