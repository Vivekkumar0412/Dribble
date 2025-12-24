import LandingSection from "@/src/components/base/LandingSection";
import TextareaDemo from "@/src/components/input/Inputcomp";
import Navbar from "@/src/components/navbar/Navbar";
import TestNav from "@/src/components/navbar/TestNav";
import DustParticles from "@/src/components/ui/Dustparticles";


// Home component
export default async function Home() {
  return (
    <div className="min-h-screen w-screen relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      />
      <DustParticles />
      {/* <Navbar /> */}
      <TestNav/>
      <LandingSection />
    </div>
  );
}
