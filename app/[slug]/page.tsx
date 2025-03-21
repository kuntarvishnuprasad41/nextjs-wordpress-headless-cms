import { fetchDataFn } from "@/lib/fetch";
import { Section, Container } from "@/components/craft";
import { CategoryNewsSectionOne, CategoryNewsSectionTwo } from "./components/categoryNews"
const descriptions: any = {
    products: {
        name: "products",
        description: "Revolutionary Smart Home Device Launches: Enhance Security, Save Energy, and Simplify Life with Cutting-Edge Technology."
    },
    enterprise: {
        name: "enterprise",
        description: "Transform Your Business with Scalable Enterprise Solutions: Boost Efficiency, Innovation, and Growth Across All Operations."
    },
    smes: {
        name: "SMEs",
        description: "Empowering SMEs: Affordable Tools to Streamline Operations, Drive Productivity, and Compete in the Digital Economy."
    },
    startups: {
        name: "startups",
        description: "Fuel Your Startup's Success: Cutting-Edge Resources to Accelerate Growth, Innovation, and Market Reach."
    },
    'women-entrepreneurs': {
        name: "Women Entrepreneurs",
        description: "Supporting Women Entrepreneurs: Tools, Mentorship, and Networks to Break Barriers and Achieve Business Excellence."
    },
    'gen-new': {
        name: "Gen New",
        description: "Inspiring the Next Generation: Innovative Platforms to Foster Creativity, Leadership, and Entrepreneurial Spirit in Young Minds."
    }
}
export default async function Page({ params }: { params: any }) {
    const { slug } = await params
    const data = await fetchDataFn(`/wp-json/wp/v2/parent-category-posts?parent_slug=${slug}`)
    const { categories = [] } = data
    const [firstCategory = {}, secondCategory, thirdCategory, ...restCategories] = categories
    console.log(firstCategory);
    return <Section>
        <Container>
            <section className="container px-4 pt-8 max-w-10xl flex flex-col gap-4">
                <h1 className="md:text-center capitalize text-2xl md:text-4xl font-bold px-2">{data?.name || descriptions[slug]?.name}</h1>
                <div className="md:mx-auto w-full md:w-[570px] px-2">
                    <p className="md:text-center">{descriptions[slug]?.description}</p>
                </div>
                <CategoryNewsSectionOne data={firstCategory} />
            </section>
            <section className="container px-4 max-w-10xl">
                <CategoryNewsSectionTwo data={[secondCategory, thirdCategory]} />
            </section>
            <section className="container px-4 max-w-10xl">
                <CategoryNewsSectionTwo data={restCategories} />
            </section>
        </Container>
    </Section>
}