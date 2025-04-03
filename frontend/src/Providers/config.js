import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sepolia, mainnet } from "@reown/appkit/networks";

export const projectId = "7b757624540f7cd90e72c72f5e7eec52";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [sepolia, mainnet];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
