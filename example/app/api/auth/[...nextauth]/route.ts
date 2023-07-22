import { Signature } from "llmas-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";

const providers = [
  CredentialsProvider({
    name: "web3-auth",
    credentials: {
      signature: {
        label: "Signature",
        type: "text",
      },
    },
    async authorize(credentials, req) {
      const { signature, publicKey, host } = JSON.parse(
        credentials?.signature || "{}"
      );
      console.log("====================================");
      console.log(process.env.NEXTAUTH_URL);
      console.log("====================================");
      const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");

      if (host !== nextAuthUrl.host) {
        return null;
      }

      const crsf = await getCsrfToken({ req: { ...req } });
      if (!crsf) {
        return null;
      }
      const noneUnit8 = Signature.create(crsf);
      const isValidate = await Signature.validate(
        {
          signature,
          publicKey,
        },
        noneUnit8
      );

      if (!isValidate) {
        throw new Error("Could not validate the signed message");
      }

      return { id: publicKey };
    },
  }),
];

const handler = NextAuth({
  providers,
  callbacks: {
    session({ session }) {
      return session;
    },
  },
});
export { handler as GET, handler as POST };
