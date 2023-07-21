export const connectWallet = async () => {
  const { solana }: any = window;

  if (solana) {
    const response = await solana.connect();
    return response;
  }
  return null;
};
export * from "./signature";
