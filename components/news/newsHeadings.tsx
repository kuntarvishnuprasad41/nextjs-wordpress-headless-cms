
import Image from "next/image"
import Link from "next/link"

export const NewsHeadings = ({ news, category }: { news: any, category: string }) => {
    const [firstItem] = news
    return <div className="flex flex-col gap-2 p-2">
        <h1 className="uppercase text-black/60">{category}</h1>
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
    console.log(data);
    const { categories } = data
    return <div className="flex flex-col max-w-[1600px] mx-auto gap-[1px] px-20">
        <div>
            <span className="px-3 py-1 rounded-full capitalize bg-black text-white">{data?.name}</span>
        </div>
        <div className="border-t border-t-black py-4 grid grid-cols-4 gap-3">
            {categories.length > 0 && categories.map((item: any) => {
                return <NewsHeadings key={item?.id} category={item.name} news={item.posts} />
            })}
        </div>

    </div>
}