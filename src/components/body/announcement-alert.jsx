"use client"

import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import {Button} from "@/components/ui/button"
import Link from "next/link"

function AnnouncementAlert() {
    const [isVisible, setIsVisible] = useState(false)
    const [alertData, setAlertData] = useState({
        "alertTitle": "",
        "alertDescription": "",
        "alertUrl": ""
    })

    useEffect(() => {
        const fetchAlertData = async () => {
            const response = await fetch("/api/content/announcement")
            if (!response.ok) {
                setIsVisible(false)
                return null
            } else {
                const data = await response.json()
                setAlertData({
                    "alertTitle": data.title,
                    "alertDescription": data.description,
                    "alertUrl": data.url,
                })
                setTimeout(() => setIsVisible(true), 1000)
            }
        }
        fetchAlertData()

        setTimeout(() => setIsVisible(false), 20000)
    }, [])
    return (
        <div className="w-full z-20 md:-mt-20 mb-20">
            <div
                className={cn(`transform transition-all duration-500 ease-out h-0`,
                    isVisible ? ' translate-y-0 opacity-100 h-10' : '-translate-y-full opacity-0'
                    )}
            >
                <Alert>
                    <AlertTitle>{alertData.alertTitle}</AlertTitle>
                    <AlertDescription>
                        <p className="mt-2 flex gap-3">{alertData.alertDescription}
                            {alertData.alertUrl && <Link href={alertData.alertUrl}
                                          className="text-indigo-600 dark:text-indigo-400 transform transition-all hover:underline hover:-translate-y-1">Read more...</Link>} </p>
                    </AlertDescription>
                    <Button variant="ghost" size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => setIsVisible(false)}
                    >
                        <XCircle className="h-4 w-4" />
                    </Button>
                </Alert>
            </div>
        </div>
    )
}

export default AnnouncementAlert