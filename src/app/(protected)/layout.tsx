interface ProtectedLayoutProps {
    children: React.ReactNode
}

import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import Navbar from "./_components/navbar"

export default async function layout({ children }: ProtectedLayoutProps) {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
                <Navbar />
                {children}
            </div>
        </SessionProvider>
    )
};
