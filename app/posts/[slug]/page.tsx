import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";
import { FaTwitter, FaLinkedin, FaFacebook, FaShareAlt } from "react-icons/fa";
import Head from "next/head";
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

import { Section, Container, Article, Prose } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

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

  // const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  // ogUrl.searchParams.append("title", post.title.rendered);
  // // Strip HTML tags for description
  // const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  // ogUrl.searchParams.append("description", description);

  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  const featuredImage = post.featured_media
    ? (await getFeaturedMediaById(post.featured_media)).source_url
    : `${siteConfig.site_domain}/default-image.jpg`; // Fallback image

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
          url: featuredImage,
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
      images: [featuredImage],
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
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const time = new Date(post.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone,
    timeZoneName: "short", // Adds time zone abbreviation
  });
  const category = await getCategoryById(post.categories[0]);

  console.log(post.content.rendered);
  console.log(post.excerpt.rendered);

  return (
    <>
      <section className="flex flex-col md:flex-row gap-8 mx-auto px-10 md:px-48 py-8 bg-black text-white">
        <div className="md:w-1/2">
          {featuredMedia?.source_url && (
            <Image
              src={featuredMedia.source_url || "/placeholder.svg"}
              width={600}
              height={400}
              alt={post.title.rendered}
              className="rounded-lg w-full h-auto object-cover"
              priority
            />
          )}
        </div>

        <div className="md:w-1/2 flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {/* {title} */}
            {post.title.rendered}
          </h1>

          <Article
            className="prose prose-lg max-w-none text-white"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />

          <div className="pt-4 flex flex-col space-y-4">
            <div className="flex items-center text-sm text-gray-400">
              <span className="uppercase">
                {" "}
                <p>
                  <a
                    href={`/posts/?author=${author.id}`}
                    className="text-white hover:underline"
                  >
                    {author.name}
                  </a>
                  -{time}-{date}
                </p>
              </span>
              {/* <span className="mx-2">•</span> */}
              {/* <span>{publishDate}</span> */}
            </div>

            <div className="flex space-x-4">
              <Link href="#" aria-label="Share on LinkedIn">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Share on Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Share on Facebook">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Share on Twitter">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Section>
        <Container className="w-full max-w-4xl mx-auto p-4">
          <Article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </Container>
      </Section>
    </>
  );
}
