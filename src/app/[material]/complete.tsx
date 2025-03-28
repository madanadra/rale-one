'use client'

import { complete } from "@/fetch"
import { Main } from "@/type"
import { useActionState, useRef } from "react"

export default function Complete({data}: {data: Main}) {
    const [state, formAction, isPending] = useActionState(complete, null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    
    return (
        <form action={formAction} className="flex">
            <input type='text' name='id' defaultValue={data.id} className='hidden' />
            {isPending ? <div className="self-center w-4 h-4 rounded-full border border-t-0 border-gray-300 animate-spin" /> :
            <input type="checkbox" name="complete" id="mark-complete" className="cursor-pointer" 
            onChange={() => buttonRef.current?.click()} defaultChecked={state?.data || data.complete} />}
            <label htmlFor="mark-complete" className="cursor-pointer pl-2 text-gray-500 font-light">Mark complete</label>
            <button ref={buttonRef} type="submit" className="hidden" />
        </form>
    )
}