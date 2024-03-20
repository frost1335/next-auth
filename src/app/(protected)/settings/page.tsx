'use client'

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Settings() {
    const user = useCurrentUser()

    console.log(user);

    const onClick = () => {
        logout()
    }

    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={onClick} type="submit">
                Sign out
            </button>
        </div>
    )
};
