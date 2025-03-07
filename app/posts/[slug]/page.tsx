import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";
import { FaTwitter, FaLinkedin, FaFacebook, FaShareAlt } from "react-icons/fa";
import Head from "next/head";

import { Section, Container, Article, Prose } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", post.title.rendered);
  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  ogUrl.searchParams.append("description", description);

  return {
    title: post.title.rendered,
    description: description,
    openGraph: {
      title: post.title.rendered,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/posts/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  console.log(post.content.rendered);
  console.log(post.excerpt.rendered);

  return (
    <>
      <Section>
        <Container className="w-full max-w-4xl mx-auto p-4">
          <Prose>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <Balancer>{post.title.rendered}</Balancer>
            </h1>
            <div className="flex justify-between items-center text-sm mb-4">
              <p>
                Published {date} by{" "}
                <a
                  href={`/posts/?author=${author.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {author.name}
                </a>
              </p>
              <Link
                href={`/posts/?category=${category.id}`}
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "!no-underline"
                )}
              >
                {category.name}
              </Link>
            </div>
            <div className="flex gap-4 mb-6">
              <FaTwitter className="cursor-pointer text-blue-500" />
              <FaLinkedin className="cursor-pointer text-blue-700" />
              <FaFacebook className="cursor-pointer text-blue-600" />
              <FaShareAlt className="cursor-pointer text-gray-600" />
            </div>
            {featuredMedia?.source_url && (
              <div className="my-8 rounded-xl overflow-hidden ">
                <img
                  className="w-full h-auto object-cover"
                  src={featuredMedia.source_url}
                  alt={post.title.rendered}
                />
              </div>
            )}
          </Prose>
          <Article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </Container>
      </Section>
    </>
  );
}
