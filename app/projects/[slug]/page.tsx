import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import ProjectTemplate from "@/components/project/ProjectTemplate";
import { getProject, getAllProjects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.intro.title} | Rizwan Shaji`,
    description: project.intro.description,
    openGraph: {
      title: project.intro.title,
      description: project.intro.description,
      images: [
        {
          url: project.intro.image.src,
          alt: project.intro.image.alt || project.intro.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

async function ProjectContent({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectTemplate project={project} />;
}

export default function Page({ params }: PageProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#050000]">
      <SiteHeader />
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex items-center justify-center bg-[#050000]">
            <div className="size-8 rounded-full border-2 border-[#E5484D] border-t-transparent animate-spin" />
          </div>
        }
      >
        <ProjectContent params={params} />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
