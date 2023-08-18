import { ethers } from "ethers";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const providerUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";

export const provider = new ethers.providers.JsonRpcProvider(providerUrl)

export const CHAIN_ID = 97;

export const USDT_DECIMAL = 18

export const IMMUTABLE_ODDS_CONTRACT_ADDRESS = '0xDDb3E49bBd666957F881D3C5e0B706fA2575FFbc'
export const USDT_CONTRACT_ADDRESS = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'

export const NETWORK_URLS = {
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545"
}