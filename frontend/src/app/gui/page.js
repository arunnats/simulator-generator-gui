"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import InstructionCard from "@/components/guicard/instructioncard/instructioncard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";

export default function GUI() {
  const [instructions, setInstructions] = useState([
    {
      id: 1,
      wordSize: 32,
      element: {},
    },
  ]);
  const [wordSize, setWordSize] = useState(null); // For final value
  const [wordSizeInput, setWordSizeInput] = useState(""); // Temporary input state
  const cardRefs = useRef([]);

  const addInstruction = () => {
    setInstructions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        data: {}, // Initialize new instruction's data
      },
    ]);
  };

  const deleteInstruction = (id) => {
    setInstructions((prev) => prev.filter((inst) => inst.id !== id));
  };

  // Function to log JSON for all instructions
  const logAllJSON = async () => {
    // Create an array of promises from createJSON calls
    const createJsonPromises = cardRefs.current.map((cardRef) =>
      cardRef?.createJSON ? cardRef.createJSON() : Promise.resolve()
    );

    try {
      // Wait for all createJSON calls to complete
      await Promise.all(createJsonPromises);
      const ISA = {
        instructionlen_in_bits: wordSize,
        mapping_from_set_of_instruction_field_values_to_set_of_instructions:
          instructions.map((instruction) => instruction.element), // Directly map `element`
      };
      // Log all instructions after all createJSON calls are done
      console.log(JSON.stringify(ISA, null, 2));
    } catch (error) {
      console.error("Error during JSON generation:", error);
    }
  };

  const updateInstructionData = (id, element) => {
    setInstructions((prev) =>
      prev.map((instruction) =>
        instruction.id === id
          ? {
              ...instruction,
              element: {
                element,
              },
            }
          : instruction
      )
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="flex flex-col w-[800px]">
          <CardHeader>
            <CardTitle>Word Size</CardTitle>
            <CardDescription>Description about how this works</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row gap-4">
            <Input
              type="number"
              placeholder={`Word Size`}
              className="w-full"
              value={wordSizeInput > 0 ? wordSizeInput : null} // Use the temporary state for the input
              onChange={(e) => setWordSizeInput(e.target.value)} // Update the temporary state dynamically
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setWordSize(wordSizeInput)} // Set wordSize only when the button is pressed
            >
              Set Word Size
            </Button>
          </CardContent>
          {/* Button to set wordSize */}
        </Card>
        {/* Display instructions only if wordSize is set */}
        {wordSize ? (
          <>
            {instructions.map((instruction) => (
              <InstructionCard
                ref={(el) => (cardRefs.current[instruction.id] = el)} // Store reference to each card
                wordSize={wordSize} // Use the wordSize state here
                key={instruction.id}
                instruction={instruction}
                onDelete={() => deleteInstruction(instruction.id)}
                updateInstructionData={updateInstructionData} // Pass the updater function
              />
            ))}
            <Button variant="outline" onClick={addInstruction}>
              Add New Instruction +
            </Button>
            <Button variant="secondary" onClick={logAllJSON}>
              Log All JSON
            </Button>
          </>
        ) : (
          <></> // No instructions to display if wordSize is not set
        )}
      </main>
    </div>
  );
}
