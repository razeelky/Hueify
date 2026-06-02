import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const topics = [
  {
    title: "What is Hex Code?",
    content: "Hex codes are six-digit color codes used in web design. Example: #FF5733 (a shade of red-orange).",
    example: "#FF5733",
  },
  {
    title: "What is RGB?",
    content: "RGB defines colors using Red, Green, and Blue light. Example: rgb(255, 87, 51).",
    example: "rgb(255, 87, 51)",
  },
  {
    title: "What is HSL?",
    content: "HSL represents colors using Hue, Saturation, and Lightness. Example: hsl(12, 100%, 60%).",
    example: "hsl(12, 100%, 60%)",
  },
  {
    title: "What is Luminance?",
    content: "Luminance measures brightness. A value of 0 is black, and 1 is white.",
    example: "Luminance: 0.75",
  },
  {
    title: "Best Contrast for Readability",
    content: "For readability, maintain a contrast ratio of 4.5:1 for normal text and 3:1 for large text.",
    example: "Black (#000000) on White (#FFFFFF)", // Force background color for this
  },
];



export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">Help & Support</h1>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-sm transition-shadow duration-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-4 text-left text-base font-semibold text-slate-900 dark:text-slate-100 sm:p-6 sm:text-lg"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{topic.title}</span>
                {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {openIndex === index && (
                <div className="border-t border-slate-200/80 bg-slate-50 px-4 py-5 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
                  <p className="text-slate-700 dark:text-slate-200 mb-4">{topic.content}</p>
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <strong>Example:</strong> {topic.example}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
