import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig: AuthOptions = {
	providers: [
		Credentials({
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'email', type: 'password' },
			},

			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;

				const response = await fetch('http://localhost:4000/api/auth/login', {
					method: 'POST',
					body: JSON.stringify({
						email: credentials.email,
						password: credentials.password,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const data = await response.json();

				if (!data) return null;

				delete data.user.password;
				delete data.user.updatedAt;
				delete data.user.__v;

				return data;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) return { ...token, ...user };

			return token;
		},

		async session({ token, session }) {
			session.user = token.user;
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;

			return session;
		},
	},
	pages: {
		signIn: '/auth'
	}
};
