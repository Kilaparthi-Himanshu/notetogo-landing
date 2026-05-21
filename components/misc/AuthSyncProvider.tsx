'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

async function ensureUserExists(session: any) {
	const { data: userData, error: userError } = await supabase
		.from("users")
		.select("*")
		.eq("user_id", session.user.id)
		.maybeSingle();

	if (!userError && !userData) {
		console.log("INSERTINGGGGGG");
		const { data: userInsertData, error: userInsertError } = await supabase
			.from("users")
			.insert({
					user_id: session.user.id,
					email: session.user.email,
			})
			.select()
			.maybeSingle();

		console.log("LOL: ", userInsertData, userInsertError);
	}
}

export default function AuthSyncProvider() {
	const queryClient = useQueryClient();

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				console.log("HERE!", event);

				if ((event === 'SIGNED_IN' ||
					event === 'INITIAL_SESSION') && 
					session
				) {
					await ensureUserExists(session);
					queryClient.invalidateQueries({
						queryKey: ['user']
					});
				}

				if (
					event === 'SIGNED_IN' ||
					event === 'SIGNED_OUT'
				) {
					queryClient.invalidateQueries({
						queryKey: ['user']
					});
				}
			}
		);

		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	return null;
}
