import { ethers } from "ethers";
import { IMMUTABLE_ODDS_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS, provider } from "@/config";
import IMMUTABLE_ODDS_INTERFACE from "@/config/abis/immutable-odds-abi";
import { Interface, formatEther, parseEther, parseUnits } from "ethers/lib/utils";
import ERC20_INTERFACE from "@/config/abis/erc20";
import { toast } from "react-toastify";
import { formatLargeNum } from "./formatLargeNum";
import { formatNumber } from "./formatNumber";
export const callContract = async ({
    contractAddress,
    contractABI,
    method,
    args = [],
    signer,
    options
}: {
    contractAddress: string;
    contractABI: string | Interface;
    method: string;
    args: any[],
    signer?: any,
    options?: any
}) => {
    try {
        if (!signer) {
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            return await contract[method](...args);
        }
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const transaction = await contract[method](...args);
        const transactionReceipt = await transaction.wait(1);
        console.log(transactionReceipt); // Do something with the transactionReceipt
        return transactionReceipt;
    } catch (error: any) {
        toast.error(error?.message ?? 'Error calling contract function')
    }
};

export const getWalletBalance = async (address: string) => {
    const result = await callContract({
        contractAddress: USDT_CONTRACT_ADDRESS,
        contractABI: ERC20_INTERFACE,
        method: 'balanceOf',
        args: [address]
    })

    return formatNumber(+formatEther(result.toString()))
}

export const withdrawFunds = async ({ poolIds, signer }: { poolIds: Array<number>; signer: any }) => {
    console.log({ poolIds, signer }, "stake args");

    const result = await callContract({
        contractAddress: IMMUTABLE_ODDS_CONTRACT_ADDRESS,
        contractABI: IMMUTABLE_ODDS_INTERFACE,
        method: 'withdraw',
        args: [poolIds],
        signer
    })

    return result;
}

export const stakeCustomBet = async ({ amount, option, poolId, signer }: { amount: string; poolId: number; option: number; signer: any }) => {
    console.log({ amount, option, poolId, signer }, "stake args");

    const value = parseEther(amount)
    const result = await callContract({
        contractAddress: IMMUTABLE_ODDS_CONTRACT_ADDRESS,
        contractABI: IMMUTABLE_ODDS_INTERFACE,
        method: 'betCustom',
        args: [poolId, value, option],
        signer
    })

    return result;
}

export const stakeNativeBet = async ({ amount, option, poolId, signer }: { amount: string; poolId: number; option: number; signer: any }) => {
    console.log({ amount, option, poolId, signer }, "stake args");

    const value = parseEther(amount)
    const result = await callContract({
        contractAddress: IMMUTABLE_ODDS_CONTRACT_ADDRESS,
        contractABI: IMMUTABLE_ODDS_INTERFACE,
        method: 'betNative',
        args: [poolId, option],
        options: {
            value
        },
        signer
    })

    return result;
}

export const approveTransaction = async ({ amount, address, signer }: { amount: string, address: string, signer: any }) => {
    const value = parseEther(amount)
    const result = await callContract({
        contractAddress: address,
        contractABI: ERC20_INTERFACE,
        method: 'approve',
        args: [IMMUTABLE_ODDS_CONTRACT_ADDRESS, value],
        signer
    })

    return result;
}
