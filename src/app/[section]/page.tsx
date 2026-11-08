
import { notFound } from "next/navigation";
import SectionContent from "@/app/components/SectionContent";

const sectionNames = [
  "actualites",
  "competitions",
  "resultats",
  "programmation",
  "etablissements",
  "palmares",
  "contact",
];

export function generateStaticParams() {
  return sectionNames.map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!sectionNames.includes(section)) {
    notFound();
  }

  return <SectionContent section={section} />;
}
