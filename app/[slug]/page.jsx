import { fetchDataFn } from "@/lib/fetch";
import { Section, Container } from "@/components/craft";
const descriptions = {
    products: "Revolutionary Smart Home Device Launches: Enhance Security, Save Energy, and Simplify Life with Cutting-Edge Technology.",
    enterprise: "Transform Your Business with Scalable Enterprise Solutions: Boost Efficiency, Innovation, and Growth Across All Operations.",
    smes: "Empowering SMEs: Affordable Tools to Streamline Operations, Drive Productivity, and Compete in the Digital Economy.",
    startups: "Fuel Your Startup's Success: Cutting-Edge Resources to Accelerate Growth, Innovation, and Market Reach.",
    'women-entrepreneurs': "Supporting Women Entrepreneurs: Tools, Mentorship, and Networks to Break Barriers and Achieve Business Excellence.",
    'gen-new': "Inspiring the Next Generation: Innovative Platforms to Foster Creativity, Leadership, and Entrepreneurial Spirit in Young Minds."
}
export default async function Page({ params }) {
    const { slug } = await params
    const data = await fetchDataFn(`/wp-json/wp/v2/parent-category-posts?parent_slug=${slug}`)
    console.log(data);
    const { posts } = data
    return <Section>
        <Container>
            <section className="container px-8 py-8 max-w-10xl flex flex-col gap-4">
                <h1 className="text-center capitalize text-4xl font-bold">{data?.name || slug}</h1>
                <div className="mx-auto" style={{
                    width: "570px"
                }}>
                    <p className="text-center">{descriptions[slug]}</p>
                </div>
            </section>
        </Container>
    </Section>
}