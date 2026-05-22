import { supabase } from '@/lib/supabase/client';
import { Session } from '@supabase/supabase-js';
import { UserDetailsType } from '@/lib/atoms';

export default async function ensureUserExists(session: Session): Promise<UserDetailsType> {
	const { data, error } = await supabase
		.from('users')
		.upsert(
			{
				user_id: session.user.id,
				email: session.user.email,
			},
			{
				onConflict: 'user_id',
			}
		)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return data as UserDetailsType;
}
