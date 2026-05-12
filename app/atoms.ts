import { atom } from "jotai";

export const themeAtom = atom<"dark" | "light">("dark");

export const navAtom = atom<"home" | "features" | "pricing">("home");
