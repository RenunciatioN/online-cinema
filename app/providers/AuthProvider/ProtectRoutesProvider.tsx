import { FC } from "react";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authConfig } from "@/config/next-auth.config";


const ProtectRoutesProvider: FC<{accessRole?: string, children:React.ReactNode}> = async ({accessRole, children}) => {
  const session = await getServerSession(authConfig)

  const Children = () => children

  if (!accessRole) return <Children />

  if(!session) return redirect('/404')

  if (session.user.isAdmin) return <Children />

  if (accessRole === 'admin') {
		redirect('/404')
	}
  const isUser = session.user && !session.user?.isAdmin;

	if (isUser && accessRole === 'user') {
		return <Children />;
	} else {
    
		redirect('/auth?redirect')
	
	}

};
export default ProtectRoutesProvider;
