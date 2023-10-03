import axios from "@/app/api/interceptors"
import { getUsersUrl } from "@/config/api.config"

export const AdminService = {
    async getCountUsers () {
        return axios.post<number>(getUsersUrl('/count'))
    }
}