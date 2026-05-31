export interface SearchParams {
  owner: string
  repo: string
  token: string
  sha?: string
  ref?: string
  task?: string
  environment?: string
  per_page?: number
  page?: number
}

export interface TableData {
  url: string
  id: number
  node_id: string
  sha: string
  ref: string
  task: string
  payload: Payload
  original_environment: string
  environment: string
  description: string
  creator: Creator
  created_at: string
  updated_at: string
  statuses_url: string
  repository_url: string
  transient_environment: boolean
  production_environment: boolean
}

interface Creator {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

interface Payload {
  [key: string]: any
}
