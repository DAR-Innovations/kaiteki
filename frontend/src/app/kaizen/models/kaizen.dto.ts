export enum KAIZEN_MODES {
	SUMMARIZE = 'SUMMARIZE',
	PARAPHRASE = 'PARAPHRASE',
	KEYWORDS = 'KEYWORDS',
	CHATBOT = 'CHATBOT',
	VOICE = 'VOICE',
}

export interface KaizenRequest {
	prompt: string
}

export interface KaizenResponse {
	result: string
}
