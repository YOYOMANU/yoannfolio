import { usePage } from "@inertiajs/react";
import type { User } from "@/types";

type PageProps = {
    auth: { user: User | null };
};

export function useAuth() {
    const { auth } = usePage<PageProps>().props;

    return {
        user: auth.user,
        isLoggedIn: !!auth.user,
        is_admin: auth?.user?.role === 'admin'
    };
}