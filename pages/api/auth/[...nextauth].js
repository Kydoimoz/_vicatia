import { connectDB } from "../../../libs/connectDB";
import User from "../../../models/dbschema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import queryData from "../../../query/mongooseQuery";
import { Cookies } from "react-cookie";

export let userAccount;
export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ email: credentials?.email });
                    console.log("User: ", user);
                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                    if (credentials.email === user.email && passwordMatch) {
                        userAccount = {
                            userID: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            role: user.role,
                            password: user.password,
                            image: user.image,
                            birthDate: user.birthDate,
                            city: user.city,
                            country: user.country,
                            description: user.description,
                            gender: user.gender,
                            services: user.services,
                            pets_sit: user.pets_sit,
                            workplaces: user.workplaces,
                            amount_pet: user.amount_pet,
                            mypets: user.mypets,
                        };
                        console.log(userAccount);
                        return Promise.resolve(userAccount);
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.error(err);
                    return null;
                }
            },
        }),
    ],
    jwt: {
        encryption: true,
        maxAge: 30 * 24 * 60 * 60
    },
    session: {
        jwt: true,
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
     callbacks: {
        async session(session, token) {
            
            const updatedUser = await fetchUpdatedUserData(token.user.userID);
    
            session.user = {
                userID: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                role: updatedUser.role,
                password: updatedUser.password,
                image: updatedUser.image,
                birthDate: updatedUser.birthDate,
                city: updatedUser.city,
                country: updatedUser.country,
                description: updatedUser.description,
                gender: updatedUser.gender,
                services: updatedUser.services,
                pets_sit: updatedUser.pets_sit,
                workplaces: updatedUser.workplaces,
                amount_pet: updatedUser.amount_pet,
                mypets: updatedUser.mypets,
            };
    
            return session;
        },
     },
    callbacks: {
        async signIn(user, account, profile) {
            const { email } = user;
            const additionalUserInfo = await queryData(email);

            // Add additional user info to the session
            return Promise.resolve({ ...user, ...additionalUserInfo });
        },
        async session(session) {
            if (session) {
                // Include user details in the session
                session.user = {
                    id: userAccount.userID,
                    email: userAccount.email,
                    firstName: userAccount.firstName,
                    lastName: userAccount.lastName,
                    phoneNumber: userAccount.phoneNumber,
                    role: userAccount.role,
                    image: userAccount.image,
                    password: userAccount.password,
                    birthDate: userAccount.birthDate,
                    city: userAccount.city,
                    country: userAccount.country,
                    gender: userAccount.gender,
                    workplaces: userAccount.workplaces,
                    description: userAccount.description,
                    services: userAccount.services,
                    pets_sit: userAccount.pets_sit,
                    amount_pet: userAccount.amount_pet,
                    mypets: userAccount.mypets,
                };
            }
            
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login/",
        callbackUrl: "/home/",
    },
};
/*
export const config = {
    api: {
        bodyParser: false,
    },
};
*/

const handler = NextAuth(authOptions);

export default handler;
export const GET = (req, res) => handler.handleRequest(req, res, { ...authOptions });
export const POST = (req, res) => handler.handleRequest(req, res, { ...authOptions });