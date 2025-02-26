// /* eslint-disable @typescript-eslint/no-unused-vars */
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// import { loginUser, registerUser } from '../../../Webservices/HotelAPIController'; 

// type User = {
//   id: string;
//   email: string;
//   name: string;
//   mobileNumber?: string;
// };

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//         fullName: { label: 'Full Name', type: 'text' },
//         mobileNumber: { label: 'Mobile Number', type: 'text' },
//         isSignUp: { label: 'Sign Up', type: 'checkbox' },
//       },
//       async authorize(credentials): Promise<User | null> {
//         const { email, password, fullName, mobileNumber, isSignUp } = credentials || {};

//         if (!email || !password || (isSignUp && !fullName)) {
//           throw new Error('Invalid input');
//         }

//         // Sign-Up Process
//         if (isSignUp) {
//           // Call your API to register the user
//           try {
//             const userData = await registerUser({
//               email,
//               password,
//               fullName,
//               mobileNumber,
//             });

//             // Assuming the userData returned from the API contains the necessary user fields
//             return {
//               id: userData.id,
//               email: userData.email,
//               name: userData.name,
//               mobileNumber: userData.mobileNumber,
//             };
//           } catch (error) {
//             throw new Error('Error registering user');
//           }
//         }

//         // Login Process
//         try {
//           const loginData = await loginUser({ email, password });

//           // Assuming the response from the API contains user details
//           return {
//             id: loginData.id,
//             email: loginData.email,
//             name: loginData.name,
//             mobileNumber: loginData.mobileNumber,
//           };
//         } catch (error) {
//           throw new Error('Invalid email or password');
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           scope: 'openid profile email',
//         },
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//     error: '/auth/error',
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl) ? url : baseUrl + `/rooms`;
//     },
//   },  
//   debug: true, // Enable debugging
// });

/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { loginUser, registerUser } from '../../../Webservices/HotelAPIController';

type User = {
  id: string;
  email: string;
  name: string;
  mobileNumber?: string;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        fullName: { label: 'Full Name', type: 'text' },
        mobileNumber: { label: 'Mobile Number', type: 'text' },
        isSignUp: { label: 'Sign Up', type: 'checkbox' },
      },
      async authorize(credentials): Promise<User | null> {
        const { email, password, fullName, mobileNumber, isSignUp } = credentials || {};

        if (!email || !password || (isSignUp && !fullName)) {
          throw new Error('Invalid input');
        }

        // Sign-Up Process
        if (isSignUp) {
          try {
            const userData = await registerUser({
              email,
              password,
              fullName,
              mobileNumber,
            });

            return {
              id: userData.id,
              email: userData.email,
              name: userData.name,
              mobileNumber: userData.mobileNumber,
            };
          } catch (error) {
            throw new Error('Error registering user');
          }
        }

        // Login Process
        try {
          const loginData = await loginUser({ email, password });

          return {
            id: loginData.id,
            email: loginData.email,
            name: loginData.name,
            mobileNumber: loginData.mobileNumber,
          };
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid profile email',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google Sign-In
      if (account?.provider === 'google') {
        // You can save the user to your database here if needed
        console.log('Google User:', user);
        console.log('Google Account:', account);
        console.log('Google Profile:', profile);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect URL:', url);
      console.log('Redirect Base URL:', baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl + `/rooms`;
    },
    async session({ session, token }) {
      // Add custom session properties if needed
      session.user.id = token.sub!;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development', // Enable debugging only in development
});
//-----------//