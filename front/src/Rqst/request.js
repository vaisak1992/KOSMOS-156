import axios from 'axios'

const Base_Url = "https://backend.test-project.xyz/api/"

export const publicRequest=axios.create({baseURL:Base_Url})
