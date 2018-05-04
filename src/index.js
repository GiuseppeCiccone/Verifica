import Api from './helpers/api'
import packageJson from '../package'

const apiUrl = 'http://192.168.1.231:8080'
const api = new Api(apiUrl)

const getEsUrl = id => `/esercizi/${id}`

const accreditamento = () => api.post('/accreditamento', {nome: packageJson.author})

const getEs = esNumber => api.get( getEsUrl(esNumber) )

const es1 = ({ data }) => {
  return data.filter(number => number % 3 === 0)
}

const es2 = ({ data }) => {
  return data.map(stringa => stringa.toLowerCase()).filter(stringa => stringa.endsWith('e'))
}

const es3 = ({ data }) => {
  return data.filter(stringa => stringa.length < 5).reduce((accumulator, value) => accumulator + value.length, 0)
}

const processEs = {
  1: es1,
  2: es2,
  3: es3
}

accreditamento()
  .then(() => Promise.all( Object.keys(processEs).map( value => getEs(value) )) )
  .then(values => Promise.all( values.map( (value, index) => processEs[index + 1](value) ) ))
  .then(values => Promise.all( values.map((data, index) => {
    console.log(data)
    return api.post(getEsUrl(index + 1), { data })
  })) )
  .then(console.log)
  .catch(console.log)