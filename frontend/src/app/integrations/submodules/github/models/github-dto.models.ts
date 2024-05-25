export interface GithubOwnerDTO {
	login: string
	id: number
	nodeId: string
	avatarUrl: string
	gravatarId: string
	url: string
	type: string
	siteAdmin: boolean
}

export interface GithubRepositoryDTO {
	id: number
	nodeId: string
	name: string
	fullName: string
	isPrivate: boolean
	owner: GithubOwnerDTO
	htmlUrl: string
	description: string
	fork: boolean
	url: string
	createdAt: Date
	updatedAt: Date
	pushedAt: Date
	gitUrl: string
	cloneUrl: string
	stargazersCount: number
	language: string
	hasIssues: boolean
	hasProjects: boolean
	hasDownloads: boolean
	hasWiki: boolean
	hasPages: boolean
	hasDiscussions: boolean
	forksCount: number
	archived: boolean
	disabled: boolean
	openIssuesCount: number
	allowForking: boolean
	isTemplate: boolean
	webCommitSignoffRequired: boolean
	topics: string[]
	visibility: string
	forks: number
	openIssues: number
	watchers: number
	defaultBranch: string
}

export interface GithubRepoDetails {
	activities: GithubRepoActivity[]
	pullRequests: GithubPullRequestDTO[]
	issues: GithubIssueDTO[]
	repository: GithubRepositoryDTO
}

export enum GithubActivityEnum {
	PUSH = 'push',
	FORCE_PUSH = 'force_push',
	BRANCH_CREATION = 'branch_creation',
	BRANCH_DELETION = 'branch_deletion',
	PR_MERGE = 'pr_merge',
	MR_QUEUE_MR = 'merge_queue_merge',
}

interface GithubRepoActivity {
	id: number
	nodeId: string
	before: string
	after: string
	ref: string
	timestamp: Date
	activity_type: GithubActivityEnum
	actor: GithubActivityActorDTO
}

interface GithubPullRequestDTO {
	url: string
	id: number
	nodeId: string
	state: string
	title: string
	user: GithubActivityActorDTO
	created_at: Date
	updated_at: Date
	assignee?: GithubActivityActorDTO
	html_url: string
}

interface GithubActivityActorDTO {
	login: string
	id: number
	nodeId: string
	avatarUrl: string
	gravatarId: string
	url: string
	html_url: string
	followersUrl: string
	followingUrl: string
	gistsUrl: string
	starredUrl: string
	subscriptionsUrl: string
	organizationsUrl: string
	reposUrl: string
	eventsUrl: string
	receivedEventsUrl: string
	type: string
	siteAdmin: boolean
}

interface GithubIssueDTO {
	url: string
	id: number
	node_id: string
	title: string
	state: string
	assignee: GithubActivityActorDTO
	comments: number
	created_at: Date
	body: string
	html_url: string
}
