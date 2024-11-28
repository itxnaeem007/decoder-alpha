import { ethers } from 'ethers';

const BSC_RPC_URL = 'https://bsc-dataseed.binance.org/';

/**
 * Fetches the token balance of a given user address from a specified contract.
 *
 * @param {string} contractAddress - The address of the token contract.
 * @param {ethers.Interface | string[]} abi - The ABI of the token contract (as an Interface or JSON array).
 * @param {string} userAddress - The user's wallet address.
 * @returns - The token balance formatted as a string.
 */

export const getBalanceOf = async (
    contractAddress: string,
    abi: any,
    userAddress: string
) => {
    try {
        // Initialize the provider for Binance Smart Chain
        const provider = new ethers.JsonRpcProvider(BSC_RPC_URL);

        // Connect to the contract using the ABI, address, and provider
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Fetch the balance for the specified user address
        const balance = await contract.balanceOf(userAddress);
        // Return the balance formatted to 18 decimal places (standard for most ERC20 tokens)

        return ethers.formatUnits(balance, 18);
    } catch (error) {
        console.error('Failed to fetch balance:', error);
        throw new Error("Failed to fetch token balance. Please check the input parameters.");
    }
};
