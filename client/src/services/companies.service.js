import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export default {
    getCompanies () {
        return Axios.request({
            method: 'GET',
            url: '/companies',
        })
    },
    getCompanyById (id) {
       return Axios.request({
            method: 'GET',
            url: '/companies/'+id,
        })
    },
    editCompany (formData) {
        return Axios.request({
            method: 'PUT',
            url: '/companies/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    },
    deleteCompany (formData) {
        return Axios.request({
            method: 'DELETE',
            url: '/companies/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    }
}