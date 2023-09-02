import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://demo-odds-api.fusionxperience.io/api';

export const API = axios.create({
    baseURL: API_URL,
    headers: { "content-Type": "application/json" }
});

export const createProfile = async (walletAddress: string) => {
    try {
        const response = await API.get(`/users/${walletAddress}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateUsername = async (data: { walletAddress: string, username: string }) => {
    try {
        const response = await API.post('users/updateUsername', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateReferral = async (data: { uuid: string, referredBy: string }) => {
    try {
        const response = await API.post('users/updateReferral', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchUserByRefId = async (refId: string) => {
    try {
        const response = await API.get(`/users/fetchUserByRefId/${refId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchUserInvites = async (uuid: string) => {
    try {
        const response = await API.get(`/users/fetchUserInvites/${uuid}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getPoolsByType = async (type: string) => {
    try {
        const response = await API.get(`pool/getPoolsByType/${type}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getFootballCompetitions = async () => {
    try {
        const response = await API.get(`pool/getFootballCompetitions`)
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