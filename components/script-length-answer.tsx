import { Container } from "@/components/ui/container";
import {
  SCRIPT_LENGTHS,
  SCRIPT_PACES,
  scriptLengthAnswerFor,
  wordsFor,
} from "@/lib/script-length-answers";

/**
 * The words-per-length answer under the script tools: one question-shaped
 * section in the server-rendered HTML, the full table in a native <details>.
 * Renders nothing for a path without an entry.
 */
export function ScriptLengthAnswer({ path }: { path: string }) {
  const entry = scriptLengthAnswerFor(path);
  if (!entry) return null;
  const es = entry.locale === "es";

  return (
    <section className="py-10 sm:py-14" data-section="script_length_answer" aria-labelledby={entry.id}>
      <Container size="xl">
        <article className="mx-auto max-w-4xl space-y-4">
          <h2 id={entry.id} className="font-serif text-3xl sm:text-4xl text-[#101214]">
            {entry.heading}
          </h2>
          <p className="text-base leading-8 text-[#252a2d]">{entry.paragraph}</p>
          <details className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5">
            <summary className="min-h-11 cursor-pointer font-medium text-[#9f3c27]">{entry.tableLabel}</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm text-[#252a2d]">
                <thead>
                  <tr>
                    <th className="py-2 pr-4">{es ? "Duración" : "Length"}</th>
                    {SCRIPT_PACES.map((pace) => (
                      <th key={pace} className="py-2 pr-4">
                        {pace} {es ? "PPM" : "WPM"}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCRIPT_LENGTHS.map((seconds) => (
                    <tr key={seconds} className="border-t border-[#e2d9cd]">
                      <td className="py-2 pr-4">{seconds} s</td>
                      {SCRIPT_PACES.map((pace) => (
                        <td key={pace} className="py-2 pr-4">
                          {wordsFor(seconds, pace)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </article>
      </Container>
    </section>
  );
}
