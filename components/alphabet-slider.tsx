"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const letters = [
  "#",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

export default function AlphabetSlider() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Browse A-Z</h2>
        <span className="text-gray-400 text-sm">Quick navigation</span>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-4">
          {letters.map((letter) => (
            <Button
              key={letter}
              variant="outline"
              size="sm"
              asChild
              className="min-w-[44px] h-11 bg-gray-800 border-gray-700 text-gray-300 hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 font-semibold"
            >
              <Link href={`/alphabet/${letter.toLowerCase()}`}>{letter}</Link>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-gray-800" />
      </ScrollArea>
    </div>
  )
}
