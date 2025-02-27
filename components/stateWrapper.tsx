"use client"
import { StateContext } from "@/app/states/state"
import React, { useEffect, useState } from "react"
const CategoryState = ({ children, data }: { children: React.ReactNode, data: [] }) => {
    const [categories, setCategories] = useState<[]>(data)
    useEffect(() => {
        setCategories(data)
    }, [data])
    return <StateContext.Provider value={{ categories, setCategories }}>
        {children}
    </StateContext.Provider>
}
export const StateWrapper = ({ children, data }: { children: React.ReactNode, data: [] }) => {
    return <CategoryState data={data}>
        {children}
    </CategoryState>
} 