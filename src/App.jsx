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
import { ShowSolBalance } from "./ShowSolBalance";
import { SendTokens } from "./SendTokens";
import { SignMessage } from "./SignMessage";

function App() {
  return (
    <>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/c609qx6p1WPIwlHJbyzdUZy9vvOhCe5t"
        }
      >
        {/* From Alchemy Apps Devenet  */}
        {/* <ConnectionProvider endpoint={"https://api.devnet.solana.com"}> */}
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
            <ShowSolBalance />
            <SendTokens />
            <SignMessage />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
