'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import ensureUserExists from '@/app/utils/ensureUserExists';
import { useSetAtom } from 'jotai';
import { userAtom, userDetailsAtom } from '@/lib/atoms';
import { Session } from '@supabase/supabase-js';

export default function AuthSyncProvider() {
	const setUser = useSetAtom(userAtom);
  const setUserDetails = useSetAtom(userDetailsAtom);

	useEffect(() => {
		const syncUser = async (session: Session | null) => {
			setUser(session?.user ?? null);

			if (!session?.user) {
				setUserDetails(null);
				return;
			}

			const userDetails = await ensureUserExists(session);
			setUserDetails(userDetails);
		};

		supabase.auth.getSession().then(({ data }) => {
			syncUser(data.session);
		});

		// Supabase auth events can be broadcast from other contexts using the same
		// Supabase project (e.g. our Chrome extension). Before syncing user state,
		// verify that the event's session matches the session currently stored by
		// this website. This prevents auth events originating from the extension
		// from updating the website's user state.
		//
		// The auth callback intentionally performs no async work directly.
		// Supabase holds an internal auth lock while invoking onAuthStateChange
		// listeners, and awaiting another Supabase auth call (e.g. getSession())
		// inside the callback can deadlock (known Supabase issue).
		//
		// queueMicrotask() defers the async work until after the callback returns,
		// allowing Supabase to release its internal lock before we call getSession()
		// and sync the user.
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			queueMicrotask(async () => {
				const {
					data: { session: localSession },
				} = await supabase.auth.getSession();

				if (
					localSession?.access_token !== session?.access_token ||
					localSession?.user?.id !== session?.user?.id
				) {
					// console.log("Ignoring external auth event");
					return;
				}

				await syncUser(session);
			});
		});

		return () => subscription.unsubscribe();
	}, []);

	return null;
}
