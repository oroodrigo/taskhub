import { useSession } from "next-auth/react";
import { LateralBar } from "./LateralBar";
import { redirect } from "next/navigation";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/autentication?callbackUrl=/");
    },
  });
  return (
    <section className={"h-screen flex bg-zinc-900 text-white p-10 gap-10"}>
      <LateralBar />
      <main className="h-full w-full py-5 px-7 flex flex-col gap-5 border-2 rounded-lg border-zinc-500 overflow-y-auto">
        <h1 className="text-xl font-bold">{props.title}</h1>
        {props.children}
      </main>
    </section>
  );
}
