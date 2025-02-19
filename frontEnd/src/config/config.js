import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'viem/chains';

export const config = getDefaultConfig({
    projectId: import.meta.env.VITE_PROJECT_ID,
    appName: import.meta.env.VITE_APP_NAME,
    chains: [mainnet],
    ssr: true, 
});