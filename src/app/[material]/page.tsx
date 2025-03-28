import { main } from "@/fetch"
import { Main } from "@/type"
import Link from "next/link"
import { Suspense } from "react"
import { PiTextOutdentBold } from "react-icons/pi"
import Complete from "./complete"

export default async function Part({params}: {params: Promise<{ material: string }>}) {
    const { material } = await params

    const Load = () => {
        return (
            <div className="grid lg:flex gap-x-8 gap-y-6">
                <div className="-mx-6 -mt-6 md:m-0 grow h-max">
                    <div className="w-full aspect-video bg-gray-200 animate-pulse" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-1 content-start gap-x-12 gap-y-6 w-full lg:w-75">
                    <div className="grid gap-y-4">
                        <div className="flex gap-x-4 items-center justify-between">
                            <div className="bg-gray-200 animate-pulse w-25 h-4.5 my-[3px]" />
                            <div className="bg-gray-200 animate-pulse w-25 h-4.5 my-[3px]" />
                        </div>
                        <div className="grid gap-y-1">
                            <div className="bg-gray-200 animate-pulse w-full h-6 my-1" />
                            <div className="bg-gray-200 animate-pulse w-1/2 h-4 my-1" />
                        </div>
                        <div className="flex gap-x-2 items-center mt-2">
                            <div className="bg-gray-200 animate-pulse flex-1 h-9" />
                            <div className="bg-gray-200 animate-pulse flex-1 h-9" />
                        </div>
                    </div>
                    <div className="grid content-start gap-y-1">
                        <div className="bg-gray-200 animate-pulse w-25 h-4 my-1" />
                        <div className="bg-gray-200 animate-pulse w-full h-4 my-1" />
                    </div>
                </div>
            </div>
        )
    }
    
    const Main = async () => {
        const getMain: {error: string} | {data: Main} = await main(Number(material))
    
        if (!("data" in getMain) && "error" in getMain) {
            return (
              <div className="grid place-content-center">
                <h1 className="text-xl font-medium">{getMain.error}</h1>
              </div>
            )
        }
    
        return (
            <div className="grid lg:flex gap-x-8 gap-y-6">
                <div className="bg-gray-200 -mx-6 -mt-6 md:m-0 md:rounded-2xl grow aspect-video overflow-hidden"> 
                    <iframe src={getMain.data.video} title={getMain.data.title} loading="lazy" allowFullScreen 
                    className="w-full h-full" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-1 content-start gap-x-12 gap-y-6 w-full lg:w-75">
                    <div className="grid gap-y-4">
                        <div className="flex gap-x-4 items-center justify-between">
                            <Link href='/' className="flex items-center gap-x-2">
                                <PiTextOutdentBold className="text-lg" />
                                <h1 className="text-sm font-semibold">Home</h1>
                            </Link>
                            <Complete data={getMain.data} />
                        </div>
                        <div className="grid gap-y-1">
                            <h1 className="text-2xl font-medium">{getMain.data.title}</h1>
                            <div className="flex gap-x-2 text-gray-500 font-light">
                                <h1>module {getMain.data.module.number}</h1>
                                <h1>&rsaquo;</h1>
                                <h1>material {getMain.data.number}</h1>
                            </div>
                        </div>
                        <div className="flex gap-x-2 items-center mt-2">
                            <Link href={'/'+(Number(getMain.data.number)-1).toString()} 
                            className="flex-1 rounded-full text-center text-sm font-semibold outline outline-gray-300 hover:bg-gray-100 py-2 px-3">
                                Prev
                            </Link>
                            <Link href={'/'+(Number(getMain.data.number)+1).toString()} 
                            className="flex-1 rounded-full text-center text-sm font-semibold bg-gray-950 hover:bg-gray-900 text-gray-50 py-2 px-3">
                                Next
                            </Link>
                        </div>
                    </div>
                    <div className="grid content-start gap-y-1">
                        <h1 className="font-medium">Description</h1>
                        <h1 className={`${getMain.data.description ? '' : 'text-gray-500'} font-light`}>
                            {getMain.data.description ? getMain.data.description : 'Not added'}
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <Suspense fallback={<Load />}>
            <Main />
        </Suspense>
    )
}