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
  const query = qs.stringify(params)
  const apiUrl = `/api/gh/departments?${query}`
  const res = await fetch(apiUrl, { method: 'GET' })
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
  const query = qs.stringify(params)
  const apiUrl = `/api/gh/departments/?${query}`
  const response = await fetch(apiUrl, { method: 'DELETE' })
  const data = await response.json()
  return data
}
