const apiRoute = 'http://localhost:3000'

export const genericFetch = <T>(url:string, methods: 'POST'|'GET'|'DELETE'|'PATCH', object: T): Promise<Response> => {
  return fetch(apiRoute + url, {
    method: methods,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(object),
  })
}