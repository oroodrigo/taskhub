"use client";
import Image from "next/image";

type ProfileProps = {
  name: string | null | undefined;
  avatarUrl: string | null | undefined;
  onClick: () => void;
};

export function Profile({ name, avatarUrl, onClick }: ProfileProps) {
  const formattedUsername =
    name &&
    name
      .trim()
      .split(" ")
      .map((word) => {
        return (
          word[0]
            .toLocaleUpperCase()
            .concat(word.substring(1).toLocaleLowerCase())
        );
      });

  return (
    <div
      className="flex justify-center mt-3 mx-2 items-center self-center min-w-fit rounded-md py-2 px-3 gap-3 cursor-pointer transition-all duration-300 hover:bg-zinc-950 group"
      onClick={onClick}
    >
      <Image
        src={avatarUrl || "./default-user-icon.svg"}
        alt="Foto do usuário"
        width={100}
        height={100}
        className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-gray-500 group-hover:scale-105 transition-all duration-300"
      />
      <strong className="text-md lg:text-lg w-[4.875rem] transition-all duration-300">{`${formattedUsername ? formattedUsername[0] : "Olá"
        } ${formattedUsername ? formattedUsername[formattedUsername.length - 1] : "Visitante"}`}</strong>
    </div>
  );
}
