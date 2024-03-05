export function getISODate(date: string): string | undefined {
	try {
		return new Date(date).toISOString()
	} catch {
		console.error('Could not convert date to ISO string')
		return undefined
	}
}
