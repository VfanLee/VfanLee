export const runtime = 'edge'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const owner = url.searchParams.get('owner')
  const repo = url.searchParams.get('repo')
  const token = url.searchParams.get('token')

  const apiUrl = new URL(`https://api.github.com/repos/${owner}/${repo}/deployments`)
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
  }
  const res = await fetch(apiUrl.toString(), { headers })

  if (!res.ok) {
    return Response.json(
      {
        message: 'Failed to fetch GitHub deployments',
      },
      { status: res.status },
    )
  }

  const data = await res.json()
  return Response.json(data)
}

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const owner = url.searchParams.get('owner')
  const repo = url.searchParams.get('repo')
  const id = url.searchParams.get('id')
  const token = url.searchParams.get('token')

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/deployments/${id}`
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
  }
  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers,
  })

  if (!res.ok) {
    return Response.json(
      {
        message: 'Failed to delete GitHub deployment',
      },
      { status: res.status },
    )
  }

  return new Response(null)
}
