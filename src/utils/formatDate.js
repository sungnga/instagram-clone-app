import { format, formatDistanceStrict, isThisYear, formatDistanceToNow } from 'date-fns';

// If date is not in current year, include the year
// If date is in current year, include the month and day only
export function formatPostDate(date) {
	// MARCH 2
	const formatShort = format(new Date(date), 'MMMM d').toUpperCase();
	// MARCH 2, 2020
	const formatLong = format(new Date(date), 'MMMM d, yyy').toUpperCase();

	// Check if given date is this year
	// If it is, return short format date
	// Else return long format date
	return isThisYear(new Date(date)) ? formatShort : formatLong;
}

export function formatDateToNowShort(date) {
	// 5 days ago -> 5 days -> ['5', 'days'] -> ['5', 'd'] -> 5d
	// 7 weeks ago -> 7w
	return (
		formatDistanceStrict(new Date(date), new Date(Date.now()))
			// split it on a space and get a new array back: ['5', 'days']
			.split(' ')
			// if there is a second index, take only the first char of the string
			// else return the entire string
			// ['5', 'days'] -> ['5', 'd']
			.map((s, i) => (i === 1 ? s[0] : s))
			// join an array back to a string
			.join('')
	);
}

export function formatDateToNow(date) {
  return formatDistanceToNow(new Date(date), {addSuffix: true}).toUpperCase()
}