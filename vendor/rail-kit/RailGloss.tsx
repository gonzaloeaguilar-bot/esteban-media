export type RailGlossProps = {
  /**
   * The term in its own script: 一期一会, Жол, Sobremesa, Ubuntu. Required —
   * without it this is a subtitle, and the kit already has three of those.
   */
  term: string;
  /** How it sounds to someone who cannot read the script: "Ichigo ichie". */
  roman?: string;
  /** What it means, in four or five words. "One time, one meeting". */
  meaning: string;
  /** Where it is from, when that is the point: "[pagoda / ascent — English]". */
  origin?: string;
  /** The language of `term`, so a screen reader changes voice for it. */
  lang?: string;
  source: string;
  className?: string;
};

/**
 * A term in its own language, said again in the reader's — the line that gives
 * a section a thesis before the headline gives it a claim.
 *
 * THIS IS NOT AN EYEBROW. An eyebrow labels the section it sits above
 * ("OUR WORK", "STEP 2"); it is navigation set small. A gloss makes a claim of
 * its own, and it earns its place by being the only line on the page the
 * reader does not already know. Set as an eyebrow it reads as chrome and gets
 * skipped, which is why the term stays at reading size and the translation is
 * the part that shrinks.
 *
 * THE ROMANISATION IS NOT DECORATION. A term nobody can pronounce is a term
 * nobody repeats, and repeating it is the entire reason to spend a line on it.
 * `lang` is separate from the script because the two disagree more often than
 * not: a Japanese term quoted in an English page is `lang="ja"` on that span
 * and nowhere else, and without it a screen reader reads kana as English.
 *
 * IT IS A DESCRIPTION LIST, NOT A PARAGRAPH. A term and what it means is the
 * one thing `<dl>` was added to HTML for, and the markup is not a formality:
 * it is what lets a screen reader say "term, one of one" and pair the two
 * halves. Set as a `<p>` the translation is just more prose after a word
 * nobody recognised.
 *
 * IT DEGRADES TO ONE LINE. With no `roman` and no `origin` this is term and
 * meaning, which is the honest minimum — a brand with a term of art and no
 * foreign script gets the same component, not a worse one.
 */
export default function RailGloss({
  term,
  roman,
  meaning,
  origin,
  lang,
  source,
  className,
}: RailGlossProps) {
  return (
    <dl
      className={["rail-gloss", className].filter(Boolean).join(" ")}
      data-rail-gloss={source}
    >
      <dt className="rail-gloss__term" lang={lang}>
        {term}
        {roman ? <span className="rail-gloss__roman">({roman})</span> : null}
      </dt>
      <dd className="rail-gloss__meaning">{meaning}</dd>
      {origin ? <dd className="rail-gloss__origin">{origin}</dd> : null}
    </dl>
  );
}
