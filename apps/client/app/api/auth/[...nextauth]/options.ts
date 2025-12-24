import { Account, AuthOptions, Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import axios from "axios"
import { JWT } from "next-auth/jwt";
import Router from "@/src/routes/client.router";
export interface UserType {
    id?: string | null,
    name?: string | null,
    email?: string | null,
    image?: string | null,
    provider?: string | null,
    token?: string | null

}
export const authoptions: AuthOptions = {
    pages: {
        signIn: "/"
    },
    callbacks: {
        async signIn({ user, account }: { user: UserType, account: Account | null }) {
            try {
                if (account?.provider == "google" || account?.provider == "github") {
                    const response = await axios.post(`${Router.SIGNIN_URL}`, {
                        user,
                        account,
                    });
                    const result = response.data;
                    console.log(result,"---------------------------------------")
                    if (result?.success) {
                        user.id = result.user.id.toString();
                        user.token = result.token;
                        return true;
                    }
                };
                return false;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user as UserType;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = token.user as UserType;
            return session;
        },
    },

    providers:[
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
      })  
    ]
}