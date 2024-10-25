import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { RequestAirdrop } from "./Airdrop";

function App() {
  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <RequestAirdrop />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
