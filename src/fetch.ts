'use server'

import { prisma } from "./app/utils/prisma"

export async function index() {
    const err = {error: 'Something went wrong'}
    
    try {
        const res = await prisma.module.findUnique({
            where: {
                number: 3
            },
            include: {
                material: {
                    orderBy: {
                        number: 'asc'
                    }
                }
            }
        })
        
        if (!res) return err

        return {data: res}

    } catch {
        return err
    }
}

export async function main(material: number) {
    const err = {error: 'Something went wrong'}

    try {
        const res = await prisma.material.findUnique({
            where: {
                number: material
            },
            include: {
                module: {
                    select: {
                        number: true
                    }
                }
            }
        })
        
        if (!res) return err

        return {data: res}
        
    } catch {
        return err
    }
}

export async function complete(_current: {data: boolean} | null, e: FormData) {
    const id = e.get('id')
    const complete = e.get('complete')

    try {
        const res = await prisma.material.update({
            where: {
                id: Number(id)
            },
            data: {
                complete: complete ? true : false
            }
        })

        if (!res) return {data: complete ? false : true}

        return {data: res.complete}

    } catch {
        return {data: complete ? false : true}
    }
}