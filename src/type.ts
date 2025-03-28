export type Module = {
    id: number
    number: number
    title: string
    updatedAt: Date
    createdAt: Date
}

export type Material = {
    id: number
    thumbnail: string
    video: string
    complete: boolean
    number: number
    title: string
    description: string | null
    moduleId: number
    updatedAt: Date
    createdAt: Date
}


export type Index = (
    Module & {
        material: Material[]
    }
)

export type Main = (
    Material & {
        module: {
            number: Module['number']
        }
    }
)