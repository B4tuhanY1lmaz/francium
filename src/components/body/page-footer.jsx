import { Github, Info, SquareCheckBig } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"

function PageRooter() {
    return (
        <footer className="w-full py-5">
            <div className="mx-auto text-center">
                <div className="flex gap-3 justify-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/about"><Info className="h-6 w-6" /> </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            About
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/check"><SquareCheckBig className="h-6 w-6" /> </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Check Urls
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="https://github.com/B4tuhanY1lmaz/francium"><Github className="h-6 w-6" /> </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Source Code
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p>Francium by <a href="https://www.yyilmaz.com.tr" className="hover:underline font-bold">Batuhan Y. Yılmaz</a></p>
            </div>
        </footer>
    )
}

export default PageRooter