// Craft Imports
import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Next.js Imports
import Link from "next/link";

// Icons
import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
import { WordPressIcon } from "@/components/icons/wordpress";
import { NextJsIcon } from "@/components/icons/nextjs";
import Hero from "@/components/hero/hero";
import { NewsHeadingsSectionOne, NewsHeadingsSectionTwo } from "@/components/news/newsHeadings";
import { fetchDataFn } from "@/lib/fetch";
import NewsOverview from "@/components/majorArticles/NewsOverview";

// This page is using the craft.tsx component and design system
export default async function Home() {
  const [headingSectionOne, headingSectionTwo, headingSectionTwo1, ...restHeadings] = await fetchDataFn("/wp-json/wp/v2/home-headlines")
  return (
    <Section>
      <Container>
        <Hero />
        <NewsHeadingsSectionOne data={headingSectionOne} />
        <NewsHeadingsSectionTwo data={headingSectionTwo} data1={headingSectionTwo1} />
        <NewsOverview />
        {/* <Hero /> */}
        {/* <ToDelete /> */}
      </Container>
    </Section>
  );
}

// This is just some example TSX
const ToDelete = () => {
  return (
    <main className="space-y-0">
      <Prose>
        <h1>
          <Balancer>Headless WordPress built with the Next.js</Balancer>
        </h1>
      </Prose>

      <div className="flex justify-between items-center gap-4">
        {/* Vercel Clone Starter */}

        <div className="flex gap-2 items-center">
          <WordPressIcon className="text-foreground" width={32} height={32} />
          <NextJsIcon className="text-foreground" width={32} height={32} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts"
        >
          <Pen size={32} />
          <span>
            Posts{" "}
            <span className="block text-sm text-muted-foreground">
              All posts from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/pages"
        >
          <File size={32} />
          <span>
            Pages{" "}
            <span className="block text-sm text-muted-foreground">
              Custom pages from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/authors"
        >
          <User size={32} />
          <span>
            Authors{" "}
            <span className="block text-sm text-muted-foreground">
              List of the authors from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/tags"
        >
          <Tag size={32} />
          <span>
            Tags{" "}
            <span className="block text-sm text-muted-foreground">
              Content by tags from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/categories"
        >
          <Diamond size={32} />
          <span>
            Categories{" "}
            <span className="block text-sm text-muted-foreground">
              Categories from your WordPress
            </span>
          </span>
        </Link>
        <a
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="https://github.com/9d8dev/next-wp/blob/main/README.md"
        >
          <Folder size={32} />
          <span>
            Documentation{" "}
            <span className="block text-sm text-muted-foreground">
              How to use `next-wp`
            </span>
          </span>
        </a>
      </div>
    </main>
  );
};
