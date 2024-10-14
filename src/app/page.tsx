"use client";
import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";

const App: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string>("");

  // Function to generate a new mnemonic phrase
  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div>
      <button onClick={handleGenerateMnemonic}>Create Seed Phrase</button>
      <input type="text" value={mnemonic} readOnly />
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </div>
  );
};

interface SolanaWalletProps {
  mnemonic: string;
}

const SolanaWallet: React.FC<SolanaWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Keypair["publicKey"][]>([]);

  const handleAddWallet = () => {
    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  };

  return (
    <div>
      <button onClick={handleAddWallet}>Add Solana Wallet</button>
      {publicKeys.map((p, index) => (
        <div key={index}>Solana - {p.toBase58()}</div>
      ))}
    </div>
  );
};

interface EthWalletProps {
  mnemonic: string;
}

const EthWallet: React.FC<EthWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div>
      <button onClick={handleAddWallet}>Add ETH Wallet</button>
      {addresses.map((addr, index) => (
        <div key={index}>ETH - {addr}</div>
      ))}
    </div>
  );
};

export default App;
