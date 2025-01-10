import Image from "next/image";
import { Button } from "@/components/ui/button";
import InstructionCard from "@/components/guicard/instructioncard/instructioncard";

export default function GUI() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <InstructionCard instNo={1} />
        <Button variant="outline">Add New Instruction +</Button>
      </main>
    </div>
  );
}
