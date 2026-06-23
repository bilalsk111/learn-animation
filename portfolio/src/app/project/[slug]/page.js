import ProjectPage from "@/components/ProjectPage"
import { projects } from "@/data/projects"

const page = async ({ params }) => {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen w-full text-[#f5eae4]">
        Project not found
      </div>
    )
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <ProjectPage project={project} nextProject={nextProject} />
  )
}

export default page
