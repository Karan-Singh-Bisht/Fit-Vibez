import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'viem/chains';

export const config = getDefaultConfig({
    projectId: 'c43d0ede86805ea14ef43b99accbc39d',
    appName: 'My RainbowKit App',
    chains: [mainnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
});