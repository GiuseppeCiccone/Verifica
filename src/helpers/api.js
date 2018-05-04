import fetch from 'node-fetch'

export default class Api{
  constructor(apiUrl){
    this.apiUrl = apiUrl
  }

  parseInt(res){
    return res.json()
  }

  get(url, headers = {}){
    return fetch(this.apiUrl + url, {
      headers: {
        'x-data': true,
        ...headers
      }
    })
      .then(this.parseInt)
  }

  post(url, body = {}, headers = {}){
    return fetch(this.apiUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    })
      .then(this.parseInt)
  }
}