"use client";
import { SignOut } from "@phosphor-icons/react";

interface SignOutButtonProps {
  handleSignOut: () => void;
}

export function SignOutButton({ handleSignOut }: SignOutButtonProps) {
  return (
    <button
      className="flex w-full gap-1 justify-center text-xl px-5 py-3 transition-colors cursor-pointer text-red-500 hover:bg-red-500 hover:text-white"
      onClick={handleSignOut}
    >
      <SignOut size={25} />
      Sair
    </button>
  );
}
