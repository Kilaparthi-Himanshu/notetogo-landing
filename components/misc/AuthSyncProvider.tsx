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

		// Supabase auth events can be received from other contexts using the
		// same Supabase project (e.g. our Chrome extension). Before syncing
		// user state, verify that the event session matches this client's
		// current session so we don't react to external sign-ins/sign-outs.

		// Ignore auth events whose session does not match the session currently
		// stored by this client. This prevents cross-context auth events
		// (extension, other tabs, etc.) from triggering user sync logic.
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			queueMicrotask(async () => {
				const {
					data: { session: localSession },
				} = await supabase.auth.getSession();

				console.log("Callback Session", session);
				console.log("Fetched Session", localSession);

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
