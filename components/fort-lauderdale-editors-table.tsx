import RailTable from "@/vendor/rail-kit/RailTable";
import {
  CHECKED_DATE,
  FORT_LAUDERDALE_EDITORS_COMPARED,
} from "@/lib/fort-lauderdale-editors-compared";

export function FortLauderdaleEditorsTable({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const label = es
    ? "Comparativa de 12 editores de video y estudios en Fort Lauderdale con tarifas y especialidades"
    : "Comparison of 12 Fort Lauderdale video editors and studios with starting prices and specialties";

  return (
    <section
      id="editors-comparison-table"
      data-section="fort_lauderdale_editors_compared"
      className="scroll-mt-24 my-8"
    >
      <div className="overflow-x-auto">
        <RailTable
          source="fort_lauderdale_editors_compared"
          label={label}
          nameLabel={es ? "Editor o estudio" : "Editor or studio"}
          className="[--rail-table-cell-padding:10px_8px] [&_td]:align-top [&_td]:whitespace-nowrap [&_tbody_th]:align-top [&_thead_th]:whitespace-normal"
          columns={[
            { id: "city", label: es ? "Ciudad" : "City" },
            { id: "specialty", label: es ? "Especialidad" : "Specialty" },
            { id: "startingPrice", label: es ? "Precio inicial publicado" : "Published starting price" },
            { id: "source", label: es ? "Fuente" : "Source" },
            { id: "checkDate", label: es ? "Fecha de consulta" : "Check date" },
          ]}
          rows={FORT_LAUDERDALE_EDITORS_COMPARED.map((row, index) => {
            const isEsteban = row.name === "Esteban Moreno Media";
            return {
              id: `editor-${index}`,
              name: row.name,
              mine: isEsteban,
              cells: {
                city: row.city,
                specialty: <span className="whitespace-normal block max-w-xs text-sm">{row.specialty[locale]}</span>,
                startingPrice: (
                  <span className={row.startingPrice.en === "not published" ? "text-[#5a6066] italic" : "font-medium text-[#101214]"}>
                    {row.startingPrice[locale]}
                  </span>
                ),
                source: (
                  <a
                    href={row.sourceUrl}
                    rel="nofollow noopener"
                    target="_blank"
                    className="font-medium text-[#9f3c27] underline underline-offset-4"
                  >
                    {new URL(row.sourceUrl).hostname.replace("www.", "")}
                  </a>
                ),
                checkDate: <time dateTime={row.checkDate}>{row.checkDate}</time>,
              },
            };
          })}
        />
      </div>
      <p className="mt-3 text-xs text-[#5a6066]">
        <time dateTime={CHECKED_DATE}>
          {es ? `Consultado el 4 de noviembre de 2026.` : `Checked on 4 November 2026.`}
        </time>{" "}
        {es
          ? "Si un precio no está publicado en el sitio de la empresa, la tabla indica «no publicado» sin inventar cifras."
          : "When a price is not published on a provider's website, the table marks it as \"not published\" rather than estimating."}
      </p>
    </section>
  );
}
