export function isValidHttpUrl(url: string) {
	let formattedUrl = null
	try {
		formattedUrl = new URL(url)
	} catch (_) {
		return false
	}

	return formattedUrl.protocol === 'http:' || formattedUrl.protocol === 'https:'
}
