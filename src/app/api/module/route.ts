import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../utils/prisma";

export async function GET() {
    const modules = await prisma.module.findMany()
    return NextResponse.json({
        modules
    })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    await prisma.module.create({
        data: {
            number: body.number,
            title: body.title
        }
    })
    return NextResponse.json({message: 'Successfully added'})
}