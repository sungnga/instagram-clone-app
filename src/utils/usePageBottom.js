import React, { useEffect, useState } from 'react';

function usePageBottom() {
	const [bottom, setBottom] = useState(false);

	useEffect(() => {
		function handleScroll() {
			const isBottom =
				window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight;
			setBottom(isBottom);
		}
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return bottom;
}

export default usePageBottom;
