import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { TaskContextProvider } from "@/context/TaskContext";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskHub",
  description: "Task Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={nunito.className} suppressHydrationWarning>
        <AuthProvider>
          <TaskContextProvider>{children}</TaskContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
