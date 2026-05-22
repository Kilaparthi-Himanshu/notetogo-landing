import { User } from "@supabase/supabase-js";
import { atom } from "jotai";

export type UserDetailsType = {
    created_at: string;
    email: string;
    subscription_status: string;
    user_id: string;
}

export const userAtom = atom<User | null>(null);

export const userDetailsAtom = atom<UserDetailsType | null>(null);

// export const userAtom = atom<any>(null);