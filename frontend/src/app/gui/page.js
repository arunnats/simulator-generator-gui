"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import InstructionCard from "@/components/guicard/instructioncard/instructioncard";

export default function GUI() {
  const [instructions, setInstructions] = useState([
    {
      id: 1,
      wordSize: 32,
      data: {
        fields: [
          {
            id: 1,
            lower: "",
            upper: "",
            value: "",
            valid: false,
            maxLength: null,
          },
        ],
        mnemonic: "",
        instructionType: "none",
        branchCondition: "none",
        targetAddressType: "none",
        signExtendImmediate: false,
        registerRead: false,
        registerWrite: false,
        rs1: [
          { instr_lower: "", instr_upper: "", rs1_lower: "", rs1_upper: "" },
        ],
        rs2: [
          { instr_lower: "", instr_upper: "", rs2_lower: "", rs2_upper: "" },
        ],
        rd: [{ instr_lower: "", instr_upper: "", rd_lower: "", rd_upper: "" }],
        immediate: [
          { instr_lower: "", instr_upper: "", imm_lower: "", imm_upper: "" },
        ],
      },
    },
  ]);

  const addInstruction = () => {
    setInstructions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        wordSize: 32,
        data: {}, // Initialize new instruction's data
      },
    ]);
  };

  const deleteInstruction = (id) => {
    setInstructions((prev) => prev.filter((inst) => inst.id !== id));
  };

  // Function to log JSON for all instructions
  const logAllJSON = () => {
    instructions.forEach((instruction, index) => {
      console.log(`Instruction ${index + 1}:`, instruction.data);
    });
  };

  const updateInstructionData = (id, key, value) => {
    setInstructions((prev) =>
      prev.map((instruction) =>
        instruction.id === id
          ? { ...instruction, data: { ...instruction.data, [key]: value } }
          : instruction
      )
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {instructions.map((instruction) => (
          <InstructionCard
            key={instruction.id}
            instruction={instruction}
            onDelete={() => deleteInstruction(instruction.id)}
            updateInstructionData={updateInstructionData}
          />
        ))}
        <Button variant="outline" onClick={addInstruction}>
          Add New Instruction +
        </Button>
        <Button variant="secondary" onClick={logAllJSON}>
          Log All JSON
        </Button>
      </main>
    </div>
  );
}
