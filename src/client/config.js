import ky from 'ky'

const apiClient = ky.create({
    prefixUrl: process.env.REACT_APP_API_URL,
})

const { get, post, put, delete: destroy} = apiClient
export { get, post, put, destroy }