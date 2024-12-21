import Link from "next/link";
import { ReactNode } from "react";

type MenuItemProps = {
  text: string;
  icon: ReactNode;
  path: string;
  active?: boolean;
  onClick?: () => void;
};

export function MenuItem({ icon: Icon, path, text, active, onClick }: MenuItemProps) {
  return active ? (
    <li onClick={onClick} className="menu-item bg-menu-active-zinc active">
      {Icon}
      <Link href={path}>
        <span>{text}</span>
      </Link>
    </li>
  ) : (
    <li onClick={onClick} className="menu-item text-zinc-500">
      {Icon}
      <Link href={path}>
        <span>{text}</span>
      </Link>
    </li>
  );
}
