import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import OpenSource from "@/components/sections/OpenSource";
import Contact from "@/components/sections/Contact";
export default function Home(){
    return(
        <>
        <Hero />
        <About />
        <Projects />
        <OpenSource />
        <Contact />
        </>
    );
}
