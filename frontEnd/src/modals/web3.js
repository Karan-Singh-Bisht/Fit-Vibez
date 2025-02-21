import { useReadContract, useWriteContract } from "wagmi";
import { ABI } from "../Abi/abi";

// function sto be called from frontend 
export function useCheckReward(userAddress) {
    return useReadContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "rewards",
        args: [userAddress],
    });
}

function claim() {
    const { data: hash, writeContract } = useWriteContract();
    return writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "claim"
    });
}


//setGoalcompletion and setRewards will be called from backend using ethers