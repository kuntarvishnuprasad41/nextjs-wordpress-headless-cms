
import Image from "next/image"
import Link from "next/link"

export const NewsHeadings = ({ news, category }: { news: any, category?: string | undefined }) => {
    const [firstItem] = news
    return <div className="flex flex-col gap-2 p-2">
        {category && <h1 className="uppercase text-black/60">{category}</h1>}
        <div className="flex flex-col gap-2">
            <Link href={"#"}>
                <Image src={firstItem.featured_image.url} alt="Description Image" width={200} height={160}
                    className="w-[100%] rounded-xl h-[200px]"
                />
            </Link>
            {
                news.length > 0 && news.slice(0, 3).map((item: any, index: number) => {
                    return <Link href={"#"} key={index} className="font-semibold break-all border-b pb-2">
                        <h1>
                            {item.title}
                        </h1>
                    </Link>
                })
            }
        </div>
    </div>
}

export const NewsHeadingsSectionOne = ({ data }: { data: any }) => {
    const { categories } = data
    return <div className="container p-3">
        <div className="flex flex-col mx-auto gap-[1px] p-2">
            <div>
                <span className="px-3 py-1 rounded-full capitalize bg-black text-white">{data?.name}</span>
            </div>
            <div className="border-t border-t-black py-4 grid grid-cols-4 gap-3">
                {categories.length > 0 && categories.slice(0, 4).map((item: any) => {
                    return <NewsHeadings key={item?.id} category={item.name} news={item.posts} />
                })}
            </div>

        </div>
    </div>


}
export const NewsHeadingsSectionTwo = ({ data1, data }: { data: any, data1: any }) => {
    return <div className="container grid grid-cols-2 gap-7 p-3">
        {

            <div className="flex flex-col gap-[1px] px-2">
                <div>
                    <span className="px-3 py-1 rounded-full capitalize bg-black text-white">{data?.name}</span>
                </div>
                <div className="border-t border-t-black py-4 grid grid-cols-2 gap-3">
                    <NewsHeadings news={data.posts.slice(0,3)} />
                    <NewsHeadings news={data.posts.slice(3)} />
                </div>
            </div>

        }
        {
                <div className="flex flex-col gap-[1px]">
                    <div>
                        <span className="px-3 py-1 rounded-full capitalize bg-black text-white">{data1?.name}</span>
                    </div>
                    <div className="border-t border-t-black py-4 grid grid-cols-2 gap-3">
                        <NewsHeadings news={data1.posts.slice(0,3)} />
                        <NewsHeadings news={data1.posts.slice(3)} />

                    </div>
                </div>
        }
    </div>
}