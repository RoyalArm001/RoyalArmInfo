import { notFound } from "next/navigation";
import english from "../en.json";
import armenian from "../hy.json";
import PrintButton from "../PrintButton";
import "../cv.css";

const resumes = { en: english, hy: armenian };

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(resumes).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!Object.hasOwn(resumes, lang)) notFound();
  const title = lang === "hy" ? "Սիփան Դանիելյան | ՏՏ տեխնիկ · CV" : "Sipan Danielyan | IT Technician · CV";
  const description = lang === "hy"
    ? "Սիփան Դանիելյանի աշխատանքային փորձը Mota-Engil-ում, ցանցային ճարտարագիտության հմտություններն ու Fortinet-ի հավաստագրերը։"
    : "Sipan Danielyan’s CV, including IT technician experience at Mota-Engil, network engineering, and Fortinet cybersecurity credentials.";
  const url = `/cv/${lang}`;
  return {
    title, description,
    alternates: { canonical: url, languages: { en: "/cv/en", hy: "/cv/hy" } },
    openGraph: { type: "profile", title, description, url, locale: lang === "hy" ? "hy_AM" : "en_US" },
    twitter: { card: "summary", title, description },
  };
}

export default async function Resume({ params }) {
  const { lang } = await params;
  if (!Object.hasOwn(resumes, lang)) notFound();
  const { name, location, sections } = resumes[lang];
  const hy = lang === "hy";
  return (
    <main id="main-content" className="resume-sheet" lang={lang}>
      <nav aria-label={hy ? "CV-ի գործիքներ" : "CV tools"}>
        <a href="/#resume">{hy ? "← Պորտֆոլիո" : "← Portfolio"}</a>
        <a href={hy ? "/cv/en" : "/cv/hy"} lang={hy ? "en" : "hy"}>{hy ? "English" : "Հայերեն"}</a>
        <PrintButton>{hy ? "Արտահանել PDF" : "Export PDF"}</PrintButton>
      </nav>
      <header>
        <h1>{name}</h1>
        <p>{hy ? "ՏՏ տեխնիկ · Ցանցային ինժեներ" : "IT Technician · Network Engineer"}</p>
        <p>{location}</p>
        <p><a href="mailto:RoyalArm001@gmail.com">RoyalArm001@gmail.com</a> · <a href="tel:+37491733633">+374 91 733633</a></p>
      </header>
      {sections.map(({ title, entries }) => (
        <section key={title}>
          <h2>{title}</h2>
          <ul>{entries.map(([subject, detail]) => (
            <li key={subject || detail}>{subject && <strong>{subject}</strong>}{detail && <span>{detail}</span>}</li>
          ))}</ul>
        </section>
      ))}
    </main>
  );
}
