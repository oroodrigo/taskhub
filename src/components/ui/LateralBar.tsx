import { menu } from "@/@utils/menu";
import { Profile } from "./Profile";
import { MenuItem } from "./MenuItem";
import { SignOut } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export function LateralBar() {
  const path = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  function handleSignOut() {
    signOut({ redirect: false });
    router.push("/autentication");
  }

  return (
    <div className="h-full w-60 hidden lg:flex flex-col justify-between border-2 rounded-lg border-zinc-500 overflow-hidden">
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
        className="flex w-full gap-1 justify-center text-xl px-5 py-3 transition-colors cursor-pointer text-red-500 hover:bg-red-500 hover:text-white"
        onClick={handleSignOut}
      >
        <SignOut size={25} />
        Sair
      </button>
    </div>
  );
}
