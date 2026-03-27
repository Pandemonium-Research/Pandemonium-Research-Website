import HeroSection from "@/components/sections/HeroSection";
import CoreIntersections from "@/components/sections/CoreIntersections";
import WorkingInTheDark from "@/components/sections/WorkingInTheDark";
// import ActiveProjects from "@/components/sections/ActiveProjects";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreIntersections />
      <WorkingInTheDark />
      {/* <ActiveProjects /> */}
    </>
  );
}
