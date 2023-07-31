# llmas-auth

llmas auth is a simple implementation of the standard auth mechanism for authentication of react web applications.

## Installing

using Yarn

```bash
yarn add llmas-auth
```

## Usage

```tsx
import { SignButton, Signature, getProvider } from "llmas-auth";
```

Get provider and connect to wallet

```tsx
const provider = getProvider();
if (!provider) {
  window.open("https://phantom.app/", "_blank");
}

const resp = await provider.connect();
console.log("Connect", resp.publicKey.toString()); // get the public key
```

Create and validate the signature

```tsx
const noneUnit8 = Signature.create(uniqueValue);
const { signature } = await provider.signMessage(noneUnit8);
const serializedSignature = bs58.encode(signature);

const isValidate = await Signature.validate(
  {
    signature: serializedSignature,
    publicKey,
  },
  noneUnit8
);
if (!isValidate) {
  //
}
```

## Example

read tutorial [here](https://dev.to/ducdang/build-an-web3-authentication-method-with-solana-wallets-5bfh)
