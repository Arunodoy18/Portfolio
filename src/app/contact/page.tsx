import type { Metadata } from "next";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Arunodoy Banerjee for internships, collaboration, and full stack engineering opportunities.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact | AGENT ARUNODOY",
    description:
      "Get in touch with Arunodoy Banerjee for projects, internships, and engineering collaboration.",
    url: `${siteUrl}/contact`,
  },
  twitter: {
    card: "summary",
    title: "Contact | AGENT ARUNODOY",
    description: "Connect with Arunodoy Banerjee via email, GitHub, and LinkedIn.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-[#b9bac5] leading-relaxed">
          I am open to internships, freelance projects, and full-time engineering roles. If you are building
          products that need strong full stack execution, scalable architecture, or interactive web experiences,
          I would be glad to connect.
        </p>
        <ul className="space-y-3 text-[#b9bac5]">
          <li>
            Email: <a className="underline" href="mailto:barun4927@gmail.com">barun4927@gmail.com</a>
          </li>
          <li>
            GitHub: <a className="underline" href="https://github.com/Arunodoy18">https://github.com/Arunodoy18</a>
          </li>
          <li>
            LinkedIn: <a className="underline" href="https://www.linkedin.com/in/arunodoy-banerjee-214251342/">https://www.linkedin.com/in/arunodoy-banerjee-214251342/</a>
          </li>
        </ul>
      </div>
    </main>
  );
}
