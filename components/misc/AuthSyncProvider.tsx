'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export default function AuthSyncProvider() {
	const queryClient = useQueryClient();

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			(event) => {
				console.log("HERE!", event);
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
