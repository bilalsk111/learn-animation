import CarouselCard from "@/components/CarouselCard";
import { projects } from "@/data/projects";
import InfiniteCarousel from "@/components/InfiniteCarousel";

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex items-center">
      <InfiniteCarousel projects={projects} />
    </main>
  );
}