import bs58 from "bs58";
import nacl from "tweetnacl";

interface signature {
  signature: string;
  publicKey: any;
}
export class Signature {
  public static create(nonce: string) {
    return new TextEncoder().encode(nonce);
  }
  public static async validate(
    { signature, publicKey }: signature,
    nonceMsgUint8: Uint8Array
  ) {
    const signatureUint8 = bs58.decode(signature);
    const pubKeyUint8 = bs58.decode(publicKey);

    return nacl.sign.detached.verify(
      nonceMsgUint8,
      signatureUint8,
      pubKeyUint8
    );
  }
}
