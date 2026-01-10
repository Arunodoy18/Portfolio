import Container from "@/ui/Container";

export default function Contact() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
        <p className="text-lg text-gray-600 mb-8">
          Have a question or want to work together? Feel free to reach out.
        </p>
        <div className="max-w-md">
          <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
            Send a Message
          </button>
        </div>
      </Container>
    </section>
  );
}
