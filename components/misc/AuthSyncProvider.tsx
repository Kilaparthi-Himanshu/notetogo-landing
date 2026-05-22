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

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			syncUser(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	return null;
}
