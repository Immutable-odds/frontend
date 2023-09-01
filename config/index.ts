import { ethers } from "ethers";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const providerUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";

export const provider = new ethers.providers.JsonRpcProvider(providerUrl)

export const CHAIN_ID = 97;

export const USDT_DECIMAL = 18

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000001000";

export const IMMUTABLE_ODDS_CONTRACT_ADDRESS = '0xEa7dB19b7faAfB5675e90CaAF4682fb5FE01e92C'
export const USDT_CONTRACT_ADDRESS = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'

export const NETWORK_URLS = {
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545"
}