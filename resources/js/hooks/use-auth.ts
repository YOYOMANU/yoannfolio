import { usePage } from "@inertiajs/react";

export default function useAuth() {
    const { auth } = usePage().props
    return {
        user: auth.user,
        is_admin: auth.user?.role === 'admin'
    }
}