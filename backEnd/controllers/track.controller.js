// *Connect to Ethereum*
import { ethers } from "ethers";
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const CONTRACT_ABI = [
  {
    type: "function",
    name: "setGoalComplete",
    inputs: [
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRewards",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  CONTRACT_ABI,
  wallet
);

export const pushUpTracker = async (req, res) => {
  const { userAddress, pushUpCount } = req.body;
  console.log(req.body);
  if (!userAddress || pushUpCount === undefined) {
    return res
      .status(400)
      .json({ error: "User address and push-up count are required" });
  }

  if (pushUpCount >= 5) {
    try {
      // *Step 1: Mark goal as completed*
      const tx1 = await contract.setGoalComplete(userAddress);
      await tx1.wait();

      // *Step 2: Assign reward*
      const rewardAmount = ethers.parseUnits("0.01", "ether"); // Correctly converts to 100000000000000 Wei
      const tx2 = await contract.setRewards(userAddress, rewardAmount);
      await tx2.wait();

      return res.json({
        status: 200,
        success: true,
        txHashes: [tx1.hash, tx2.hash],
      });
    } catch (err) {
      console.error("❌ Error setting goal/reward:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json({
      message: ` User has only completed ${pushUpCount} push-ups. Keep going! `,
    });
  }
};
