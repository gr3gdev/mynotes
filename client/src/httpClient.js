import axios from 'axios'
import jwtDecode from 'jwt-decode'

const path = process.env.MYNOTES_CONTEXT || 'mynotes'

let url_notes = '/api/notes'
let url_users = '/api/users'
if (path.length > 0) {
    url_notes = `/${path}${url_notes}`
    url_users = `/${path}${url_users}`
}

// instantiate axios
const httpClient = axios.create()

httpClient.getNotes = function() {
    return this({ method: 'get', url: url_notes })
        .then((serverResponse) => {
            return serverResponse.data
        })
}

httpClient.saveNotes = function(notes) {
    return this({ method: 'post', url: url_notes, data: notes })
        .then((serverResponse) => {
			if (serverResponse.status === 200) {
				return true
			} else {
				return false
			}
        })   
}

httpClient.getToken = function() {
	return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
	localStorage.setItem('token', token)
	return token
}

httpClient.getCurrentUser = function() {
	const token = this.getToken()
	if (token) {
        return jwtDecode(token)
    }
	return null
}

httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: `${url_users}/authenticate`, data: credentials })
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if (token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
}

// During initial app load attempt to set a localStorage stored token
// as a default header for all api requests.
httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient