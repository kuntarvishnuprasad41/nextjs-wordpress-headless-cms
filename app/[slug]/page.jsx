import { fetchDataFn } from "@/lib/fetch";
import { Section, Container } from "@/components/craft";
export default async function Page({ params }) {
    const { slug } = await params
    const data = await fetchDataFn(`/wp-json/wp/v2/parent-category-posts?parent_slug=${slug}`)
    return <Section>
        <Container>
            {JSON.stringify(data)}
        </Container>
    </Section>
}