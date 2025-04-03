import { wagmiAdapter, projectId, networks } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { cookieToInitialState, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) {
    throw new Error("Project ID is not defined.");
}

const metadata = {
    name: "HALO WORLD",
    description:
        "HALO NFT PRESALE",

};

createAppKit({
    adapters: [wagmiAdapter],
    networks: networks, // Explicit cast
    projectId,
    defaultNetwork: networks[0],
    metadata,
});

export function Wagmi({ children }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig);

    return (
        <WagmiProvider
            config={wagmiAdapter.wagmiConfig}
            initialState={initialState}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}