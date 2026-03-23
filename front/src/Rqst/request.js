import axios from 'axios'

const Base_Url="http://13.232.145.41/api/"

export const publicRequest=axios.create({baseURL:Base_Url})
