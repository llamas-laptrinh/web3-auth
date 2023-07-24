
import { Signature } from "@/util";
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
      message: {
        label: "Message",
        type: "text",
      },
    },
    async authorize(credentials, req) {
      const { publicKey, host } = JSON.parse(credentials?.message || "{}");

      const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");

      if (host !== nextAuthUrl.host) {
        return null;
      }
      const crsf = await getCsrfToken({ req: { ...req, body: null } });

      if (!crsf) {
        return null;
      }
      const noneUnit8 = Signature.create(crsf);

      const isValidate = await Signature.validate(
        {
          signature: credentials?.signature || "",
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
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.name = token.sub;
        session.user.image = `https://ui-avatars.com/api/?name=${token.sub}`;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
