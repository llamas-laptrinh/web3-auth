export const connectWallet = async () => {
  const { solana }: any = window;

  if (solana) {
    const response = await solana.connect();
    return response;
  }
  return null;
};
export const getProvider = () => {
  if ("phantom" in window) {
    const { phantom }: any = window;
    const provider = phantom.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }
  return null;
};
export * from "./signature";
