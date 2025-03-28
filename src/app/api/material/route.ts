import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../utils/prisma";
import { Dropbox } from "dropbox";

export async function GET() {
    const materials = await prisma.material.findMany()
    return NextResponse.json({
        materials
    })
}

export async function POST(req: NextRequest) {
    const thumbnailType = ['image/jpeg', 'image/png', 'image/jpg']
    const thumbnailSize = 2 * 1024 * 1024
    const videoType = ['video/mp4', 'video/webm', 'video/ogg']
    const videoSize = 20 * 1024 * 1024
    const formData = await req.formData()
    const thumbnailData = formData.get("thumbnail") as File
    const videoData = formData.get("video") as File

    if (!thumbnailType.includes(thumbnailData.type) || !videoType.includes(videoData.type) || thumbnailData.size > thumbnailSize || videoData.size > videoSize) {
        return NextResponse.json({message: 'Validation error'})
    }

    const number = formData.get("number") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const complete = formData.get("complete") as string
    const moduleId = formData.get("moduleId") as string

    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch })

    try {
        const thumbnailUpload = await dbx.filesUpload({
            path: '/' + Date.now().toString() + thumbnailData.name,
            contents: thumbnailData
        })

        const videoUpload = await dbx.filesUpload({
            path: '/' + Date.now().toString() + videoData.name,
            contents: videoData
        })

        const thumbnailPath = thumbnailUpload.result.path_lower || ''
        const videoPath = videoUpload.result.path_lower || ''

        const thumbnailSrc = await dbx.sharingCreateSharedLinkWithSettings({
            path: thumbnailPath
        })

        const videoSrc = await dbx.sharingCreateSharedLinkWithSettings({
            path: videoPath
        })

        const thumbnail = thumbnailSrc.result.url.replace('dl=0', 'raw=1')
        const video = videoSrc.result.url.replace('dl=0', 'raw=1')

        try {
            await prisma.material.create({
                data: {
                    thumbnail: thumbnail,
                    video: video,
                    number: Number(number),
                    title: title,
                    description: description,
                    complete: Number(complete) === 1 || complete === 'true' ? true : false,
                    moduleId: Number(moduleId)
                }
            })

            return NextResponse.json({message: 'Successfully added'})

        } catch(createErr) {
            try {
                await dbx.filesDeleteV2({
                    path: thumbnailPath
                })

                await dbx.filesDeleteV2({
                    path: videoPath
                })
    
                return NextResponse.json({message: 'Database error - ' + (createErr instanceof Error ? createErr.message : 'Something went wrong')})
    
            } catch(deleteErr) {
               return NextResponse.json({message: 'Database and storage error - ' + (deleteErr instanceof Error ? deleteErr.message : 'Something went wrong')})
            }
        }
    } catch(uploadErr) {
       return NextResponse.json({message: 'Storage error - ' + (uploadErr instanceof Error ? uploadErr.message : 'Something went wrong')})
    }
}