import React from "react";

export default function BitDisplay({
  value = "11000000101010101000110101000101",
  numBits = 4,
}) {
  const binaryString = value;

  const blocks = [];
  for (let i = 0; i < binaryString.length; i += 16) {
    blocks.push(binaryString.slice(i, i + 16));
  }

  return (
    <div className="flex flex-col items-end">
      {blocks.reverse().map((block, blockIndex) => (
        <div key={blockIndex} className="flex border-2 border-black shadow-md">
          {[...block].map((bit, bitIndex) => {
            const position =
              (blocks.length - 1 - blockIndex) * 16 +
              (block.length - 1 - bitIndex);

            return (
              <div
                key={bitIndex}
                className="relative flex items-center justify-center w-11 h-11 border bg-white border-x-2 border-black"
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
