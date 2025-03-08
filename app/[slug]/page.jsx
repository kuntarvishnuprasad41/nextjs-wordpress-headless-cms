import { fetchDataFn } from "@/lib/fetch";
export default async function Page({ params }) {
    const { slug } = await params
    const data = await fetchDataFn(`/wp-json/wp/v2/parent-category-posts?parent_slug=/${slug}`)
    return <div>
        {JSON.stringify(data)}
    </div>
}