import { Wallet } from "@solana/wallet-adapter-react";
import { Keypair, Transaction, PublicKey } from "@solana/web3.js";

export class SimpleWallet implements Wallet {
    private readonly keypair: Keypair;

    constructor(keypair: Keypair) {
        this.keypair = keypair;
    }

    async signTransaction(tx: Transaction): Promise<Transaction> {
        tx.partialSign(this.keypair);
        return tx;
    }

    async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
        return Promise.all(txs.map(async (tx) => await this.signTransaction(tx)));
    }

    get publicKey(): PublicKey {
        return this.keypair.publicKey;
    }

    adapter: any;
    readyState: any;
}