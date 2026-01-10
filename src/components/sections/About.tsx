import Container from "@/components/ui/Container";

export default function About() {
  return (
    <section className="py-20" id="about">
      <Container>
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <p className="text-lg text-slate-600">
          Software engineer dedicated to building high-performance systems and contributing to open-source software.
        </p>
      </Container>
    </section>
  );
}
