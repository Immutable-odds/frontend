import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const API = axios.create({
    baseURL: API_URL,
    headers: { "content-Type": "application/json" }
});

export const createProfile = async (walletAddress) => {
    try {
        const response = await API.get(`/users/${walletAddress}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateUsername = async (data: { walletAddress: string, username: string }) => {
    try {
        const response = await API.post('users/update_username', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getPoolsByType = async (type: string) => {
    try {
        const response = await API.get(`pool/get_pools_by_type/${type}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserBets = async (uuid: string) => {
    try {
        const response = await API.get(`bets/${uuid}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserBetStats = async (uuid: string) => {
    try {
        const response = await API.get(`bets/stats/${uuid}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const saveUserBet = async (payload: any) => {
    try {
        const response = await API.post("bets/create", payload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getWinnings = async (payload: any) => {
    try {
        const response = await API.post(`pool/getWinnings`, payload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserAllocations = async (payload: any) => {
    try {
        const response = await API.post(`pool/getAllocations`, payload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserPoolIds = async (uuid: string) => {
    try {
        const response = await API.get(`pool/ids/${uuid}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}