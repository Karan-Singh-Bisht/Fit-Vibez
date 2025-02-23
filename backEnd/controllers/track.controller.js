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
      {
        name: "_value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claim",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
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

export const curlTracker = async (req, res) => {
  const { userAddress, curlCount } = req.body;
  const value = ethers.parseUnits("0.01");
  if (!userAddress || curlCount === undefined) {
    return res
      .status(400)
      .json({ error: "User address and push-up count are required" });
  }

  if (curlCount >= 5) {
    try {
      // *Step 1: Mark goal as completed*
      const tx1 = await contract.setGoalComplete(userAddress, value);
      await tx1.wait();

      return res.json({
        status: 200,
        success: true,
        txHash: tx1.hash,
      });
    } catch (err) {
      console.error("❌ Error setting goal:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json({
      message: `User has only completed ${curlCount} push-ups. Keep going!`,
    });
  }
};

export const pushUpTracker = async (req, res) => {
  const { userAddress, pushupCount } = req.body;
  const value = ethers.parseUnits("0.01");
  if (!userAddress || pushupCount === undefined) {
    return res
      .status(400)
      .json({ error: "User address and push-up count are required" });
  }

  if (pushupCount >= 5) {
    try {
      // *Step 1: Mark goal as completed*
      const tx1 = await contract.setGoalComplete(userAddress, value);
      await tx1.wait();

      return res.json({
        status: 200,
        success: true,
        txHash: tx1.hash,
      });
    } catch (err) {
      console.error("❌ Error setting goal:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json({
      message: `User has only completed ${pushupCount} push-ups. Keep going!`,
    });
  }
};

export const squatTracker = async (req, res) => {
  const { userAddress, squatCount } = req.body;
  const value = ethers.parseUnits("0.01");
  if (!userAddress || squatCount === undefined) {
    return res
      .status(400)
      .json({ error: "User address and push-up count are required" });
  }

  if (squatCount >= 5) {
    try {
      // *Step 1: Mark goal as completed*
      const tx1 = await contract.setGoalComplete(userAddress, value);
      await tx1.wait();

      return res.json({
        status: 200,
        success: true,
        txHash: tx1.hash,
      });
    } catch (err) {
      console.error("❌ Error setting goal:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json({
      message: `User has only completed ${squatCount} push-ups. Keep going!`,
    });
  }
};
