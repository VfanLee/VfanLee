import qs from 'qs'

interface DepartmentsRequest {
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

/** List deployments */
export const reqDepartments = async (params: DepartmentsRequest) => {
  const { owner, repo, token, ...rest } = params
  const query = qs.stringify(rest)
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/deployments${query ? `?${query}` : ''}`
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()
  return data
}

interface DeleteDepartmentRequest {
  owner: string
  repo: string
  token: string
  id: number
}

/** Delete a deployment */
export const reqDeleteDepartment = async (params: DeleteDepartmentRequest) => {
  const { owner, repo, token, id } = params
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/deployments/${id}`
  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status === 204) return null
  try {
    return await response.json()
  } catch (err) {
    return null
  }
}
