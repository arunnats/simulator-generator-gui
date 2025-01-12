import React from "react";

export default function BitDisplay({ wordSize = 32, fields }) {
  // Initialize the binary string with "X"
  let binaryString = Array(wordSize).fill("X");

  // Process each field to update the binary string
  fields.forEach(({ lower, upper, value }) => {
    let valueIndex = 0;
    for (let i = lower; i <= upper; i++) {
      if (valueIndex < value.length) {
        binaryString[i] = value[valueIndex];
        valueIndex++;
      } else {
        binaryString[i] = "X"; // Fill with "X" if value is shorter
      }
    }
  });

  // Convert the binary array back to a string
  const binaryStringResult = binaryString.join("");

  // Split the binary string into 16-bit blocks
  const blocks = [];
  for (let i = 0; i < binaryStringResult.length; i += 16) {
    blocks.push(binaryStringResult.slice(i, i + 16));
  }

  // Ensure there are enough blocks for the wordSize
  const totalBlocks = Math.ceil(wordSize / 16);
  while (blocks.length < totalBlocks) {
    blocks.push("X".repeat(16));
  }

  return (
    <div className="flex flex-col items-end">
      {blocks.map((block, blockIndex) => (
        <div key={blockIndex} className="flex border-2 border-black shadow-md">
          {[...block].map((bit, bitIndex) => {
            // Calculate the position (right-to-left indexing)
            const position = blockIndex * 16 + bitIndex;

            return (
              <div
                key={bitIndex}
                className={`relative flex items-center justify-center w-11 h-11 border ${
                  bit === "X" ? "bg-gray-200" : "bg-white"
                } border-x-2 border-black`}
              >
                <span className="text-lg font-bold">{bit}</span>
                <span className="absolute bottom-0 left-1 text-xs text-gray-500">
                  {position}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
