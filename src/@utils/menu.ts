import {
  CalendarCheck,
  ChartLine,
  House,
  ListDashes,
  NotePencil,
} from "@phosphor-icons/react";

export const menu = [
  {
    id: 1,
    title: "Todas",
    icon: House,
    path: "/",
  },
  {
    id: 2,
    title: "Importantes",
    icon: ListDashes,
    path: "/important",
  },
  {
    id: 3,
    title: "Completas",
    icon: CalendarCheck,
    path: "/completed",
  },
  {
    id: 4,
    title: "A Fazer",
    icon: NotePencil,
    path: "/donow",
  },
];
