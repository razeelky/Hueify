import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import Layout from "@/components/Layout"; // Assuming Layout has Header & Footer


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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-[calc(100vh-8rem)] w-full px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-6 text-center">🎨 Help & Support</h1>

        <div className="w-full max-w-4xl space-y-4">
          {topics.map((topic, index) => (
            <Card key={index} className="bg-gray-800 rounded-lg shadow-md w-full">
              <div
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h2 className="text-lg font-semibold">{topic.title}</h2>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openIndex === index && (
                <CardContent className="p-4 border-t border-gray-700">
                  {/* Orange Background for Answer */}
                  <div className="bg-orange-500 text-white p-3 rounded-md">
                    <p>{topic.content}</p>
                  </div>

                  {/* Example Box with Background Color Support */}
                  {topic.example && (
                    <div
                      className="mt-2 p-2 text-center rounded-md w-full text-white"
                      style={{
                        // backgroundColor:
                        //   topic.example.includes("#") ||
                        //   topic.example.includes("rgb") ||
                        //   topic.example.includes("hsl") ||
                        //   topic.example.includes("#000000") 
                        //     ? topic.example
                        //     : "#FF5733", // Force orange for non-color values
                      }}
                    >
                      <strong>Example:</strong> {topic.example}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}