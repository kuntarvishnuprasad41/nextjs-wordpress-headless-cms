import Image from "next/image"
import Link from "next/link"
export const NewsHeadings = ({ url, title, excerpt, author }: { author?: string; url: string; title?: string; excerpt?: string; }) => {
    return <div className="flex flex-col gap-2">
        <Link href={"#"}>
            <Image src={url} alt="Description Image" width={200} height={160}
                className="w-[100%] rounded-xl h-[200px] object-cover"
            />
        </Link>
        <div className="flex flex-col">
            <Link href={"#"} className="font-bold md:text-xl break-all">
                <h1>{title}</h1>
            </Link>
            <p className="text-base break-all pb-2 text-black/80">{excerpt}</p>
            <p className="text-base pb-2 text-black uppercase">{author}</p>
        </div>

    </div>

}
export function CategoryNewsSectionOne({ data }: { data: any }) {
    const { posts = [], name } = data
    return <div className="flex flex-col mx-auto gap-[1px] p-2">
        {
            name && (
                <div>
                    <span className="px-3 py-1 rounded-full capitalize bg-black text-white">{name}</span>
                </div>
            )
        }
        {
            posts?.length > 0 && (
                <div className="border-t border-t-black py-4 grid grid-cols-1 md:grid-cols-4 gap-7">
                    {posts.slice(0, 3).map((item: any) => {
                        return <NewsHeadings key={item.id} url={item?.featured_image?.url} excerpt={item?.excerpt} title={item?.title} author={item?.author?.name} />
                    })}
                    <div>
                        <Image alt="ad" className="md:w-full w-[300px] md:mx-auto mx-0 h-[450px] md:h-full object-cover" src={"https://wordpress.sscinitiatives.com/wp-content/uploads/2025/02/ad-section-one.png"} width={274} height={462} />
                    </div>
                </div>
            )
        }

    </div>
}
function CategorySectionSegment({ name, posts }: { name: string; posts: any }) {
    return <div className="flex flex-col mx-auto gap-[1px] p-2">
        {
            name && (
                <div>
                    <span className="px-3 py-1 rounded-full capitalize bg-black text-white">{name}</span>
                </div>
            )
        }
        {
            posts?.length > 0 && (
                <div className="border-t border-t-black py-4 grid grid-cols-1 md:grid-cols-2 gap-7">
                    {posts.slice(0, 2).map((item: any) => {
                        return <NewsHeadings key={item.id} url={item?.featured_image?.url} excerpt={item?.excerpt} title={item?.title} author={item?.author?.name} />
                    })}
                </div>
            )
        }

    </div>
}
export function CategoryNewsSectionTwo({ data = [] }: { data: any }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {data.length > 0 && data.map((item: any, index: number) => {
            return <CategorySectionSegment key={index} name={item?.name} posts={item?.posts} />
        })}
    </div>
}