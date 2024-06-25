"use client"

import { useModal } from "@/components/modals/hooks/modal-hook"

import { Button } from "@/components/ui/button"
import Link from "next/link"

function LinkBox({ LinkId, title, url, shortUrl, cDate }) {
    const { onOpen } = useModal()

    const handleCopy = async () => {
        const currentUrl = window.location.origin
        await navigator.clipboard.writeText(`${currentUrl}/${shortUrl}`)
    }

    const handleDelete = () => {
        const linkData = {
            id: LinkId,
            slug: shortUrl,
            link: url,
            name: title,
            createdAt: cDate
        }
        onOpen("linkDel", linkData)
    }

    return (
        <div
            className="relative rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 shadow-lg transition duration-200 h-48 px-12 md:px-0">
            <div className="absolute p-6 top-0 bottom-0 inset-x-0">
                <div className="flex flex-col">
                    {title ? (
                        <>
                            <h2 className="text-xl font-bold my-0">{title.split(" ").slice(0, 5).join(" ")}{title.split(" ").length > 5 && "..."}</h2>
                            <span className="font-light text-sm truncate">{url}</span>
                        </>
                    ) : (
                        <h2 className="text-xl font-bold my-0 line-clamp-3">
                            {url}
                        </h2>
                    )}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                    <div className="flex justify-between items-end">
                        <Button variant="ghost2" className="text-rose-600" onClick={() => handleDelete()}>Delete</Button>
                        <div className="flex">
                            <Button variant="ghost2" onClick={() => handleCopy()}>Copy Link</Button>
                            <Button variant="ghost2" asChild><Link href={url}>Open Link</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkBox