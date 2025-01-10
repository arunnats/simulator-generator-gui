import React from "react";

export default function BitDisplay({ wordSize = 32, fields }) {
  // Ensure the binary string always has the length of wordSize, initialized with "X"
  let binaryString = Array(wordSize).fill("X").join("");

  // Populate the binary string based on the fields
  fields.forEach(({ lower, upper, value }) => {
    let valueIndex = 0;
    for (let i = lower; i <= upper; i++) {
      if (valueIndex < value.length) {
        binaryString =
          binaryString.substring(0, i) +
          value[valueIndex] +
          binaryString.substring(i + 1);
        valueIndex++;
      } else {
        // If value is shorter than the range, fill with "X"
        binaryString =
          binaryString.substring(0, i) + "X" + binaryString.substring(i + 1);
      }
    }
  });

  // Ensure the binary string length matches the wordSize (padding if necessary)
  binaryString = binaryString.substring(0, wordSize).padEnd(wordSize, "X");

  // Split the binary string into blocks of 16
  const blocks = [];
  for (let i = 0; i < binaryString.length; i += 16) {
    blocks.push(binaryString.slice(i, i + 16));
  }

  // Ensure that we have enough blocks for the wordSize (pad with empty blocks if necessary)
  const totalBlocks = wordSize / 16;
  while (blocks.length < totalBlocks) {
    blocks.push("X".repeat(16)); // Add empty blocks if the binaryString is shorter than the wordSize
  }

  return (
    <div className="flex flex-col items-end">
      {blocks.map((block, blockIndex) => (
        <div key={blockIndex} className="flex border-2 border-black shadow-md">
          {[...block].map((bit, bitIndex) => {
            // Calculate position
            const position = (totalBlocks - 1 - blockIndex) * 16 + bitIndex;

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
