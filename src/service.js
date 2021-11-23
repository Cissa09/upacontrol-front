import axios from 'axios'

export default class Services {

    static defaults() {
        const urlApi = 'https://localhost:44376'
        axios.defaults.baseURL = `${urlApi}/api/v1`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    static async cancelRequest(requestId) {
        axios.cancel(requestId)
    }

    static async get(url, entidade) {
        this.defaults()
        try {
            const response = await axios.get(`/${url}`)
            return response.data
        } catch (error) {
            console.error(`ERRO AO BUSCAR ${entidade}`, error)
            return error.response
        }
    }

    static async post(url, entidade, value) {
        this.defaults()
        try {
            const response = await axios.post(`/${url}`, value)
            return response
        } catch (error) {
            console.error(`ERRO AO BUSCAR ${entidade}`, error)
            return error.response
        }
    }

    static async put(url, entidade, value) {
        this.defaults()
        try {
            const response = await axios.put(`/${url}`, value)
            return response
        } catch (error) {
            console.error(`ERRO AO BUSCAR ${entidade}`, error)
            return error.response
        }
    }


}