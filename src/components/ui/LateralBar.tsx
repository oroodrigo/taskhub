"use client"
import { menu } from "@/@utils/menu";
import { Profile } from "./Profile";
import { MenuItem } from "./MenuItem";
import { ArrowLeft, List, SignOut } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function LateralBar() {
  const [menuMobileIsCollapsed, setMenuMobileIsCollapsed] = useState(true)

  const path = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  function handleSignOut() {
    signOut({ redirect: false });
    router.push("/autentication");
  }

  function handleMenuMobileState() {
    setMenuMobileIsCollapsed(!menuMobileIsCollapsed)
  }

  return (
    <aside className={`h-full min-w-fit flex flex-col justify-between border-2 rounded-lg border-zinc-600 bg-zinc-900 mobile-menu ${menuMobileIsCollapsed ? "" : "open"}`}>
      <button className="absolute -right-11 top-20 p-2 rounded-r-lg bg-zinc-900 border-b-2 border-r-2 border-t-2 border-zinc-600 border-l-2 border-l-zinc-900 text-zinc-400 hover:text-zinc-200 sm:hidden transition-colors duration-300"
        onClick={handleMenuMobileState}>{menuMobileIsCollapsed ? <List size={25} /> : <ArrowLeft size={25} />}</button>

      <Profile
        name={session?.user?.name}
        avatarUrl={session?.user?.image}
        onClick={() => router.push("/profile")}
      />

      <nav>
        <ul className="flex flex-col gap-2">
          {menu.map((item) => {
            return path === item.path ? (
              <MenuItem
                key={item.id}
                active
                icon={<item.icon size={25} weight="fill" />}
                text={item.title}
                path={item.path}
              />
            ) : (
              <MenuItem
                key={item.id}
                icon={<item.icon size={25} />}
                text={item.title}
                path={item.path}
                onClick={() => router.push(item.path)}
              />
            );
          })}
        </ul>
      </nav>

      <button
        className="flex w-full gap-1 justify-center text-xl px-5 py-3 transition-colors rounded-b-md cursor-pointer text-red-500 hover:bg-red-500 hover:text-white"
        onClick={handleSignOut}
      >
        <SignOut size={25} />
        Sair
      </button>
    </aside>
  );
}
