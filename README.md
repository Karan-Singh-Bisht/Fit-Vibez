# Fit Vibez Documentation

## NOTE

Refresh these APIs before testing

## AI APIS LINK

AI Curl Counter API => https://pushup-poseestimation-2.onrender.com/process_frame/
AI Pushup Counter API => https://pushups-8vy9.onrender.com/process_frame/
AI Squats Counter API => https://squatsposeestimation.onrender.com/process_frame/

## Live Link

https://fit-vibez-dmonkygpz-karan-singh-bishts-projects.vercel.app/

## Overview
Fit Vibez is a blockchain-integrated fitness tracking platform that incentivizes users to complete physical activities like push-ups and squats by rewarding them with cryptocurrency. The platform leverages smart contracts to verify completed workouts and process reward transactions securely.

[![Watch the video]()](https://www.youtube.com/watch?v=3SaxoWLoSNQ)


## Features
- **Real-time Workout Tracking**: Tracks push-ups and squats in real-time through an interactive interface.
- **Blockchain Rewards**: Users completing workout goals receive 0.01 ETH as a reward.
- **Decentralized Storage**: Uses smart contracts for secure and transparent transactions.
- **Redux Integration**: Manages activity data and user progress efficiently.

## Technology Stack
- **Frontend**: React.js, Redux, Wagmi
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethereum, Ethers.js
- **Database**: MongoDB
- **Notifications**: Sonner (for toast notifications)

## Components
### 1. **Pushup Component**
Handles push-up tracking and communicates with an embedded iframe that detects movements.

#### Logic Flow
1. Listens for messages from the iframe.
2. Updates count based on received data.
3. Upon stopping, verifies completion and dispatches the transaction to the blockchain.
4. Displays loading state during transaction processing.

### 2. **Squat Component**
Similar to Pushup, but tracks squats and handles blockchain interactions accordingly.

### 3. **Redux Store (AiSlice.js)**
Manages global state for activity tracking and rewards.

#### Actions
- `pushUpTracker(payload)`: Sends push-up data to the backend.
- `squatTracker(payload)`: Sends squat data to the backend.
- `setFinalActivityCount(count)`: Updates the final count in the Redux store.

## Smart Contract Interaction
### **Function: `setGoalComplete(userAddress, value)`**
- Marks workout completion and processes rewards.
- Requires a minimum of 5 push-ups or squats to execute.

```javascript
const tx1 = await contract.setGoalComplete(userAddress, { value: ethers.utils.parseUnits("0.01", "ether") });
await tx1.wait();
```

## API Endpoints
### **POST /api/pushupTracker**
**Request Body:**
```json
{
  "userAddress": "0x123...",
  "pushUpCount": 10
}
```
**Response:**
```json
{
  "status": 200,
  "success": true,
  "txHash": "0xabc..."
}
```

### **POST /api/squatTracker**
Similar to push-up tracking, but for squats.

## Deployment
- **Smart Contract**: Ethereum Mainnet / Testnet

## Future Enhancements
- Adding leaderboards and social features.
- Multi-chain support (Polygon, BSC, etc.).
- Mobile app integration.

## Conclusion
Fit Vibez leverages blockchain to promote fitness by offering crypto rewards for workouts. It ensures transparency, security, and real-time tracking, making fitness more engaging and rewarding.

For Specific backEnd and frontEnd docs please visit the specific branch.

