'use client';

import { supabase } from '@/lib/supabase/client'

export default function DebugButtons() {
	return (
		<div className='flex gap-4 absolute z-99999999 top-2 left-2'>
			<button className='bg-blue-400/90 text-white px-2 py-4' onClick={async () => console.log("Session: ", await supabase.auth.getSession())}>
				Log Session
			</button>
			<button className='bg-blue-400/90 text-white px-2 py-4' onClick={async () => console.log("User: ", await supabase.auth.getUser())}>
				Log User
			</button>
		</div>
	);
}
