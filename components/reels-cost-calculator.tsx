"use client";

import { useId, useState } from "react";

import {
  COST_ROWS,
  VIDEOS_PER_WEEK_OPTIONS,
  costFor,
  reelsCostCalculatorCopy,
  resultSentence,
  type CalcLocale,
} from "@/lib/reels-cost-calculator";
import { usd } from "@/lib/pricing";

/**
 * The interactive part of the Reels cost calculator.
 *
 * Progressive enhancement: the server HTML already carries the answer for the
 * default (1 video a week) AND the full table for 1-5 videos a week, so a
 * crawler or a reader without JavaScript gets every number. JavaScript only
 * lets the visitor pick their own row and highlights it.
 *
 * Analytics: the select carries `data-filter`, so the shared layer
 * (public/track.js) emits the contract's `filter_apply` with
 * filter_name=videos_per_week and the chosen value; the section's
 * `data-section` gives every click here its cta_position. No custom event.
 */
export function ReelsCostCalculator({ locale }: { locale: CalcLocale }) {
  const c = reelsCostCalculatorCopy[locale];
  const selectId = useId();
  const [videosPerWeek, setVideosPerWeek] = useState<number>(1);
  const row = costFor(videosPerWeek);

  return (
    <div
      data-section="reels_cost_calculator"
      className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-8"
    >
      <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{c.toolHeading}</h2>
      <form className="mt-6" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={selectId} className="block text-sm font-medium text-[#252a2d]">
          {c.inputLabel}
        </label>
        <select
          id={selectId}
          name="videos_per_week"
          data-filter="videos_per_week"
          value={videosPerWeek}
          onChange={(event) => setVideosPerWeek(Number(event.target.value))}
          className="mt-2 min-h-12 w-full max-w-xs rounded-lg border border-[#c9bfb2] bg-white px-3 text-base text-[#101214]"
        >
          {VIDEOS_PER_WEEK_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {c.optionLabel(n)}
            </option>
          ))}
        </select>
      </form>

      <output
        htmlFor={selectId}
        aria-live="polite"
        className="mt-6 block rounded-xl border border-[#d6ccc0] bg-white p-5 text-base leading-7 text-[#101214]"
        data-calc-result
      >
        <span className="block font-serif text-2xl leading-tight sm:text-3xl">
          {row.planPerPeriod !== null
            ? `${usd(row.planPerPeriod)} ${c.overPeriod}`
            : `${usd(row.singlePerPeriod)} ${c.overPeriod}`}
        </span>
        <span className="mt-2 block text-[#3f4548]">{resultSentence(row, locale)}</span>
      </output>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          <caption className="mb-3 text-left text-sm text-[#5a6066]">{c.tableCaption}</caption>
          <thead>
            <tr className="border-b border-[#d6ccc0]">
              <th scope="col" className="py-2 pr-2 align-top sm:pr-3 font-semibold">{c.colVideos}</th>
              <th scope="col" className="py-2 pr-2 align-top sm:pr-3 font-semibold">{c.colSingle}</th>
              <th scope="col" className="py-2 pr-2 align-top sm:pr-3 font-semibold">{c.colPlan}</th>
              <th scope="col" className="py-2 font-semibold">{c.colDifference}</th>
            </tr>
          </thead>
          <tbody>
            {COST_ROWS.map((r) => (
              <tr
                key={r.videosPerWeek}
                aria-current={r.videosPerWeek === videosPerWeek ? "true" : undefined}
                className={`border-b border-[#e3dace] ${r.videosPerWeek === videosPerWeek ? "bg-[#f1e6d8]" : ""}`}
              >
                <th scope="row" className="py-2 pr-2 align-top sm:pr-3 font-medium">{r.videosPerWeek}</th>
                <td className="py-2 pr-2 align-top sm:pr-3">
                  {usd(r.singlePerPeriod)}{" "}
                  <span className="block text-xs text-[#5a6066] sm:inline sm:text-sm">({usd(r.singlePerWeek)} {c.perWeek})</span>
                </td>
                <td className="py-2 pr-2 align-top sm:pr-3">
                  {r.planPerPeriod !== null ? (
                    <>
                      {usd(r.planPerPeriod)}{" "}
                      <span className="block text-xs text-[#5a6066] sm:inline sm:text-sm">({usd(r.planPerWeek!)} {c.perWeek})</span>
                    </>
                  ) : (
                    c.noPlan
                  )}
                </td>
                <td className="py-2">{r.savingPerPeriod !== null ? `−${usd(r.savingPerPeriod)}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
