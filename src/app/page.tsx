import { index } from "@/fetch";
import { Index } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PiChartPieSliceBold, PiPlayCircleBold, PiPlayFill, PiCheckBold } from "react-icons/pi";

export const dynamic = 'force-dynamic'

export default function Home() {
  const Load = () => {
    return (
      <div className="grid gap-y-12">
        <div className="grid gap-y-2">
          <div className="bg-gray-200 animate-pulse w-25 h-4.5 my-[5px]" />
          <div className="bg-gray-200 animate-pulse w-full max-w-160 h-9 my-0.5" />
          <div className="flex items-center gap-x-4 mt-2">
            <div className="flex gap-x-1">
              <div className="bg-gray-200 animate-pulse w-12 h-5" />
            </div>
            <div className="flex gap-x-1">
              <div className="bg-gray-200 animate-pulse w-12 h-5" />
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-y-12">
          {Array(6).fill(1).map((_, i) => 
            <div key={i} className="grid">
              <div className="bg-gray-200 animate-pulse w-full aspect-video mb-2" />
              <div className="bg-gray-200 animate-pulse w-full h-4.5 my-[5px]" />
              <div className="bg-gray-200 animate-pulse w-1/2 h-4 my-1" />
            </div>
          )}
        </div>
      </div>
    )
  }

  const Main = async () => {
    const getIndex: {error: string} | {data: Index} = await index()

    if (!("data" in getIndex) && "error" in getIndex) {
      return (
        <div className="grid place-content-center">
          <h1 className="text-xl font-medium">{getIndex.error}</h1>
        </div>
      )
    }

    return (
      <div className="grid gap-y-12">
        <div className="grid gap-y-2">
          <h1 className="font-[family-name:var(--font-geist-mono)] text-lg">Module {getIndex.data.number}</h1>
          <h1 className="text-4xl font-medium">{getIndex.data.title}</h1>
          <div className="flex items-center gap-x-4 text-gray-500 mt-2">
            <div className="flex gap-x-1">
              <PiChartPieSliceBold className="text-xl" />
              <h1 className="text-sm font-semibold">
                {Math.floor(getIndex.data.material.filter(item => item.complete).length*100/getIndex.data.material.length)}%
              </h1>
            </div>
            <div className="flex gap-x-1">
              <PiPlayCircleBold className="text-xl" />
              <h1 className="text-sm font-semibold">{getIndex.data.material.length}</h1>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-y-12">
          {getIndex.data.material.map((item, i) => 
            <Link key={i} href={'/'+item.number} className="group">
              <div className="relative w-full aspect-video mb-2 rounded-xl overflow-hidden bg-gray-200">
                <Image src={item.thumbnail} alt="Thumbnail" loading="lazy" fill className="object-cover object-center" />
                <div className={`${item.complete ? 'flex' : 'hidden'} absolute bottom-2 right-2 text-gray-50 gap-x-2 rounded-lg py-2 px-3 backdrop-brightness-35`}>
                  <PiCheckBold className="text-lg" />
                  <h1 className="text-sm">Completed</h1>
                </div>
                <div className="hidden group-hover:grid place-content-center absolute inset-0 backdrop-brightness-70">
                  <PiPlayFill className="text-gray-50 text-4xl" />
                </div>
              </div>
              <h1 className={`${item.complete ? 'text-gray-500' : ''} text-lg font-medium`}>{item.title}</h1>
              <h1 className={`${item.complete ? 'text-gray-500' : ''} font-light`}>Material {item.number}</h1>
            </Link>
          )}
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
