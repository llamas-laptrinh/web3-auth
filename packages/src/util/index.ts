export const connectWallet = async () => {
  const { solana }: any = window;

  if (solana) {
    const response = await solana.connect();
    console.log("Connected with Public Key:", response.publicKey.toString());
    console.log(
      "Connected with Public Key toBase58:",
      response.publicKey.toBase58()
    );
    return response;
  }
  return null;
};
