// /* eslint-disable @typescript-eslint/no-unused-vars */
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { loginUser, registerUser } from '../../../Webservices/HotelAPIController'; 

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
//       async authorize(credentials) {
//         const { email, password, fullName, mobileNumber, isSignUp } = credentials || {};

//         if (!email || !password || (isSignUp && !fullName)) {
//           throw new Error('Invalid input');
//         }

//         // Sign-Up Process
//         if (isSignUp) {
//           try {
//             const userData = await registerUser({
//               email,
//               password,
//               fullName,
//               mobileNumber,
//             });
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
//         url: 'https://accounts.google.com/o/oauth2/v2/auth',
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
//   debug: true,
// });
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { loginUser, registerUser } from '../../../Webservices/HotelAPIController'; // Adjust import path accordingly

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
      async authorize(credentials) {
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
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',  // Custom sign-in page
    error: '/auth/error',  // Custom error page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + `/rooms`;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure HTTPS is being used
        sameSite: 'lax',
        domain: process.env.NODE_ENV === 'production' ? '.hotelsudarshan.com' : undefined, // Ensure domain is correct
      },
    },
  },
  debug: true,  // Debugging enabled to see more detailed errors in the logs
});
