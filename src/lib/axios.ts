import axios from "axios"

const BASE_URL =
    process.env.NODE_ENV === "development"
        ? process.env.LOCAL_BASE_URL
        : process.env.PRODUCTION_BASE_URL

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
})

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
})
