import Link from "next/link";
import Icon from "@phosphor-icons/react";

type MenuItemProps = {
  text: string;
  icon: Icon.IconProps;
  path: string;
  active?: boolean;
  onClick?: () => void;
};

export function MenuItem({ icon, path, text, active, onClick }: MenuItemProps) {
  return active ? (
    <li onClick={onClick} className="menu-item bg-menu-active-zinc active">
      <>{icon}</>
      <Link href={path}>
        <span>{text}</span>
      </Link>
    </li>
  ) : (
    <li onClick={onClick} className="menu-item text-zinc-500">
      <>{icon}</>
      <Link href={path}>
        <span>{text}</span>
      </Link>
    </li>
  );
}
