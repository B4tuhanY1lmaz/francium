import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

import AboutHeader from "@/components/about/header"
import LinkBox from "@/components/shorter/link-box"
import LinkNewBox from "@/components/shorter/link-new-box"
import { Separator } from "@/components/ui/separator"
import PageRooter from "@/components/body/page-footer"

async function MyLinksPage() {
    const session = await ServerSession()
    if (!session) {
        return redirect("/")
    }

    const userContent = await db.user.findUnique({
        where: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email
        },
        include: {
            links: true
        },
    })
    const links = userContent.links
    const shortedLinks = links.sort((a, b) => {
        let dateA = new Date(a.createdAt)
        let dateB = new Date(b.createdAt)

        return dateB.getTime() - dateA.getTime()
    })

    return (
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-20">
            <AboutHeader title="My Links" />
            <div className="flex flex-col gap-2 py-5">
                <h2 className="text-2xl font-bold py-1">Links you've shorted</h2>
                <Separator className="bg-gray-700 dark:bg-white/20" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {!session.user.banned && <LinkNewBox />}
                        {shortedLinks.map((link) => (
                            <LinkBox
                                key={link.id}
                                LinkId={link.id}
                                title={link.name}
                                url={link.link}
                                shortUrl={link.slug}
                                cDate={link.createdAt}
                            />
                        ))}
                    </div>
            </div>
            <PageRooter />
        </div>
    )
}

export default MyLinksPage