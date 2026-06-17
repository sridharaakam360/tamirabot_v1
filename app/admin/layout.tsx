import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal — Tamirabot",
  description: "Tamirabot Blog Administration System",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
