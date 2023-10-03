'use client'

import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';


const NextAuthProvider:FC<{children: React.ReactNode}> = ({children}) => {


  return (
    <SessionProvider >{children}</SessionProvider>
  )
}
export default NextAuthProvider