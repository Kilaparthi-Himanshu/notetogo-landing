import { Tables } from "@/database.types";
import { User } from "@supabase/supabase-js";
import { atom } from "jotai";

export type UserDetailsType = Tables<'users'>;

export const userAtom = atom<User | null>(null);

export const userDetailsAtom = atom<UserDetailsType | null>(null);

// export const userAtom = atom<any>(null);
