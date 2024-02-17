"use client"

import config from "../../../../config/siteconfig.json"
import items from "../../../../config/infoSection.json"

import LinkShorterBox from "../home/link-shorter"
import HomeFAQ from "../home/home-faq-section"
import InfoSection from "../home/info-section"

function HomeContainer() {
    return (
        <div className="justify-center mx-auto flex flex-col py-10 sm:py-28">
            <div className="relative">
                <div className="absolute top-0 left-20 w-72 h-72 bg-purple-300 rounded-full  mix-blend blur-2xl opacity-70 animate-blob delay-50" />
                <div className="absolute top-0 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend blur-2xl opacity-70 animate-blob"/>
                <div className="absolute top-6 left-48 w-72 h-72 bg-pink-300 rounded-full mix-blend blur-2xl opacity-60 animate-blob" />
                <div className="absolute">
                    <h1 className="text-center text-3xl font-semibold">Francium Link shortener</h1>
                    <p className="text-center font-medium text-md mt-3">{config.SiteDescription}</p>
                    <div className="py-10">
                        <LinkShorterBox />
                        <InfoSection 
                            items={items}
                        />
                        <HomeFAQ />
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default HomeContainer