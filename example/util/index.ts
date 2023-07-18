export const connectWallet = async () => {
  const { solana }: any = window;

  if (solana) {
    const response = await solana.connect();
    console.log("Connected with Public Key:", response.publicKey.toString());
    return response.publicKey.toString() as string;
  }
  return null;
};
