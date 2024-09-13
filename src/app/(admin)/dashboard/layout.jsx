import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"

import AdminHeader from "@/components/admin/admin-header"

import conf from "&/siteconfig.json"

async function AdminLayout({ children }) {
    const server = await ServerSession()
    if (!server) {
        return redirect("/login?callbackUrl=https%3A%2F%2Fvexxit.xyz%2Fdashboard")
    } else if (server.user?.role !== "ADMIN") {
        return redirect("/")
    }

    return (
        <section className="container mx-auto w-full min-h-screen py-20">
            <AdminHeader title={conf.SiteName} />
            {children}
        </section>
    )
}

export default AdminLayout