export interface GithubLoginDTO {
	loginUrl: string
}

export interface GithubCredentials {
	id: string
	githubUsername?: string
	userId: number
}

export interface CreateGithubCredentials {
	githubUsername: string
}
