"use client"
import { StateContext, useStateContext } from "@/app/states/state"
import { useFetch } from "@/lib/use.fetch"
import Image from "next/image"
import { useContext } from "react"
export interface News {
    content: string,
    image_url: string,
    headline: string
}
interface NewsHeadingProps {
    news: News[],
    tag?: string
}
export const NewsHeadings = ({ news, tag }: NewsHeadingProps) => {
    const [firstItem] = news
    return <div className="flex flex-col gap-2 p-2">
        <h1 className="uppercase text-black/60">{tag}</h1>
        <div className="flex flex-col gap-2">
            <Image src={firstItem.image_url} alt="Description Image" width={200} height={160}
                className="w-[100%] rounded-xl"
            />
            {
                news.length > 0 && news.slice(0, 3).map((item: News, index: number) => {
                    return <div key={index} className="font-semibold break-all border-b pb-2">
                        <h1>
                            {item.headline}
                        </h1>
                    </div>
                })
            }
        </div>
    </div>
}
interface productNewsHeading {
    data: []
}
export const ProductNewsHeadings = () => {
    const { categories } = useStateContext()
    const { data, loading } = useFetch({ url: "/wp-json/wp/v2/posts?tag=products&per_page=3" })
    if (loading) {
        return <div>Loading....</div>
    }
    const categoriesData = categories.map((item: any) => {
        const { id, name } = item
        const filterData = data?.filter((post: any) => post.categories.includes(id))
        return filterData && filterData.length > 0 ? { id, name, posts: filterData } : null;
    })
        .filter((category: any) => category !== null);

    console.log("filterData", categoriesData);
    return <div>
        {JSON.stringify(data, null, 2)}
    </div>
}