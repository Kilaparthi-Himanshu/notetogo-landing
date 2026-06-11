'use client';

import { initializeDodo } from '@/lib/dodoCheckout';
import React, { useEffect } from 'react';

export default function DodoProvider() {
	useEffect(() => {
		initializeDodo();
	}, []);

	return null;
}

// If we want to intialize here only
// 'use client';

// import { useEffect } from 'react';
// import { DodoPayments } from 'dodopayments-checkout';

// export default function DodoProvider() {
// 	useEffect(() => {
// 		DodoPayments.Initialize({
// 			mode:
// 				process.env.NODE_ENV === 'development'
// 					? 'test'
// 					: 'live',

// 			displayType: 'overlay',

// 			onEvent: (event) => {
// 				console.log(event);
// 			},
// 		});
// 	}, []);

// 	return null;
// }
