import { atom } from "jotai";

export const authModalAtom = atom<boolean>(false);

export const themeAtom = atom<"dark" | "light">("dark");

export const navAtom = atom<"home" | "features" | "pricing" | "contact">("home");
