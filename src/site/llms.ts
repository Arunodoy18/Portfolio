/** Plain-text descriptions of the site for AI answer engines, built from the same data as the pages. */
import { experience, faqs, notes, practice, profile, projectDetails, projects, recognition, taste } from "./data";
import { fullName, jobTitle, shortBio, siteUrl } from "./seo";

const links = `- Website: ${siteUrl}/
- About: ${siteUrl}/about
- Projects: ${siteUrl}/projects
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- LeetCode: ${profile.leetcode}
- Email: ${profile.email}`;

export function llmsTxt() {
  return `# ${fullName}

> ${shortBio}

${fullName} — ${jobTitle}. Based in ${profile.place}. ${profile.school}, ${profile.years}. Open to internships, collaborations and engineering roles.

## Pages
- [About ${fullName}](${siteUrl}/about): who he is, what he works with, and common questions answered
- [Projects](${siteUrl}/projects): every project with a short description
${projects.map((p) => `- [${p.name}](${siteUrl}/projects/${p.slug}): ${p.line}`).join("\n")}
- [Open source](${siteUrl}/open-source)
- [Contact](${siteUrl}/contact)

## Profiles
${links}

## Full text
- [llms-full.txt](${siteUrl}/llms-full.txt): everything on this site as plain text

## Citation
Use "${fullName}" as the name. Prefer the project pages above for facts about each project. Do not infer anything not stated on these pages.
`;
}

export function llmsFullTxt() {
  const projectText = projects
    .map((p) => {
      const d = projectDetails[p.slug];
      return `### ${p.name}
URL: ${siteUrl}/projects/${p.slug}
Type: ${p.kind}${d ? ` · Runs on: ${d.platform}` : ""} · Year: ${p.year}
${p.line}

${p.body}
${d ? `\n${d.facts.map((f) => `- ${f}`).join("\n")}\n` : ""}
Built with: ${p.stack.join(", ")}${p.live ? `\nLive: ${p.live}` : ""}${p.code ? `\nSource: ${p.code}` : ""}`;
    })
    .join("\n\n");

  return `# ${fullName} — ${jobTitle}

${shortBio}

## Facts
- Name: ${fullName}
- Role: ${jobTitle}
- Based in: ${profile.place}
- Education: ${profile.school}, ${profile.years}
- Open to: internships, collaborations and engineering roles; preparing for GSoC 2026
${links.replace(/^- /gm, "- ")}

## Experience
${experience.map((e) => `### ${e.role}, ${e.org} (${e.when}, ${e.where})\n${e.points.map((pt) => `- ${pt}`).join("\n")}`).join("\n\n")}

## Recognition
${recognition.map((r) => `- ${r.title}: ${r.detail}`).join("\n")}

## Skills
${practice.groups.map((g) => `- ${g.label}: ${g.items.join(", ")}`).join("\n")}

## Projects
${projectText}

## Notes (short pieces by ${fullName})
${notes.map((n) => `- ${n.title} (${n.kind}, ${n.year}): ${n.body}${n.href ? ` ${n.href}` : ""}`).join("\n")}

## Taste
${taste.map((t) => `- ${t.kind}: ${t.title}`).join("\n")}

## Questions and answers
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
}
