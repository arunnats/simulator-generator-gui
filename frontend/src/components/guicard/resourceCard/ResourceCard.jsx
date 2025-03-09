"use client";
import React from "react";
import { useFormikContext, FieldArray } from "formik";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ResourceCard({ wordSize }) {
  const { values, setFieldValue } = useFormikContext();

  // Helper function to validate numeric inputs
  const handleNumericInputChange = (fieldName, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setFieldValue(fieldName, numericValue);
  };

  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader>
        <CardTitle>Mode and Resources</CardTitle>
        <CardDescription>
          Configure system mode and hardware resources
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Mode Section */}
        <div className="flex flex-col gap-4">
          <CardTitle>Mode</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Select
                  value={values.mode?.modeOnReset || ""}
                  onValueChange={(value) =>
                    setFieldValue("mode.modeOnReset", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Mode On Reset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mode_for_user">Mode For User</SelectItem>
                    <SelectItem value="mode_for_supervisor">
                      Mode For Supervisor
                    </SelectItem>
                    <SelectItem value="mode_for_hypervisor">
                      Mode For Hypervisor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </HoverCardTrigger>
              <HoverCardContent>
                Select the mode to use on system reset
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* L1 I Cache */}
        <div className="flex flex-col gap-4">
          <CardTitle>L1 I Cache</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Block Size (bytes)"
                  value={values.resources?.L1_I_cache?.blockSizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_I_cache.blockSizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the block size in bytes for L1 instruction cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Associativity"
                  value={values.resources?.L1_I_cache?.associativity || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_I_cache.associativity",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the associativity for L1 instruction cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Size (bytes)"
                  value={values.resources?.L1_I_cache?.sizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_I_cache.sizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the total size in bytes for L1 instruction cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency (cycles)"
                  value={values.resources?.L1_I_cache?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_I_cache.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for L1 instruction cache
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* L1 D Cache */}
        <div className="flex flex-col gap-4">
          <CardTitle>L1 D Cache</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Block Size (bytes)"
                  value={values.resources?.L1_D_cache?.blockSizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_D_cache.blockSizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the block size in bytes for L1 data cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Associativity"
                  value={values.resources?.L1_D_cache?.associativity || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_D_cache.associativity",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the associativity for L1 data cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Size (bytes)"
                  value={values.resources?.L1_D_cache?.sizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_D_cache.sizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the total size in bytes for L1 data cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency (cycles)"
                  value={values.resources?.L1_D_cache?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L1_D_cache.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for L1 data cache
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* L2 Cache */}
        <div className="flex flex-col gap-4">
          <CardTitle>L2 Cache</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Block Size (bytes)"
                  value={values.resources?.L2_cache?.blockSizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L2_cache.blockSizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the block size in bytes for L2 cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Associativity"
                  value={values.resources?.L2_cache?.associativity || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L2_cache.associativity",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the associativity for L2 cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Size (bytes)"
                  value={values.resources?.L2_cache?.sizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L2_cache.sizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the total size in bytes for L2 cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency (cycles)"
                  value={values.resources?.L2_cache?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L2_cache.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for L2 cache
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* L3 Cache */}
        <div className="flex flex-col gap-4">
          <CardTitle>L3 Cache</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Block Size (bytes)"
                  value={values.resources?.L3_cache?.blockSizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L3_cache.blockSizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the block size in bytes for L3 cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Associativity"
                  value={values.resources?.L3_cache?.associativity || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L3_cache.associativity",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the associativity for L3 cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Size (bytes)"
                  value={values.resources?.L3_cache?.sizeInBytes || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L3_cache.sizeInBytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the total size in bytes for L3 cache
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency (cycles)"
                  value={values.resources?.L3_cache?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.L3_cache.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for L3 cache
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Physical Memory */}
        <div className="flex flex-col gap-4">
          <CardTitle>Physical Memory</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency (cycles)"
                  value={
                    values.resources?.physical_memory?.latencyInCycles || ""
                  }
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.physical_memory.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for physical memory access
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* I TLB */}
        <div className="flex flex-col gap-4">
          <CardTitle>I TLB</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="PTEs in Each Block"
                  value={values.resources?.I_TLB?.noOfPTEsInEachBlock || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.I_TLB.noOfPTEsInEachBlock",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the number of PTEs in each block for instruction TLB
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Associativity"
                  value={values.resources?.I_TLB?.associativity || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.I_TLB.associativity",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the associativity for instruction TLB
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Number of Entries"
                  value={values.resources?.I_TLB?.noOfEntries || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.I_TLB.noOfEntries",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the number of entries for instruction TLB
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency (cycles)"
                  value={values.resources?.I_TLB?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.I_TLB.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for instruction TLB
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* D TLB */}
        <div className="flex flex-col gap-4">
          <CardTitle>D TLB</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="PTEs in Each Block"
                  value={values.resources?.D_TLB?.noOfPTEsInEachBlock || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.D_TLB.noOfPTEsInEachBlock",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the number of PTEs in each block for data TLB
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Associativity"
                  value={values.resources?.D_TLB?.associativity || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.D_TLB.associativity",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the associativity for data TLB
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Number of Entries"
                  value={values.resources?.D_TLB?.noOfEntries || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.D_TLB.noOfEntries",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the number of entries for data TLB
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency (cycles)"
                  value={values.resources?.D_TLB?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.D_TLB.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for instruction TLB
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Integer ALU */}
        <div className="flex flex-col gap-4">
          <CardTitle>Integer ALU</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency in Cycles"
                  value={values.resources?.integer_ALU?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.integer_ALU.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for the Integer ALU
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Input Length in Bits"
                  value={values.resources?.integer_ALU?.inputWidthInBits || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.integer_ALU.inputWidthInBits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the input length in bits
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Integer MUL */}
        <div className="flex flex-col gap-4">
          <CardTitle>Integer MUL</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency in Cycles"
                  value={values.resources?.integer_MUL?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.integer_MUL.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for the Integer ALU
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Input Length in Bits"
                  value={values.resources?.integer_MUL?.inputWidthInBits || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.integer_MUL.inputWidthInBits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the input length in bits
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Integer DIV */}
        <div className="flex flex-col gap-4">
          <CardTitle>Integer DIV</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency in Cycles"
                  value={values.resources?.integer_DIV?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.integer_DIV.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for the Integer ALU
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Input Length in Bits"
                  value={values.resources?.integer_DIV?.inputWidthInBits || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.integer_DIV.inputWidthInBits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the input length in bits
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Float ALU */}
        <div className="flex flex-col gap-4">
          <CardTitle>Float ALU</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency in Cycles"
                  value={values.resources?.float_ALU?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.float_ALU.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for the Integer ALU
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Input Length in Bits"
                  value={values.resources?.float_ALU?.inputWidthInBits || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.float_ALU.inputWidthInBits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the input length in bits
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Float MUL */}
        <div className="flex flex-col gap-4">
          <CardTitle>Float MUL</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency in Cycles"
                  value={values.resources?.float_MUL?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.float_MUL.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for the Integer ALU
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Input Length in Bits"
                  value={values.resources?.float_MUL?.inputWidthInBits || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.float_MUL.inputWidthInBits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the input length in bits
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Float DIV */}
        <div className="flex flex-col gap-4">
          <CardTitle>Float DIV</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Latency in Cycles"
                  value={values.resources?.float_DIV?.latencyInCycles || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.float_DIV.latencyInCycles",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the latency in cycles for the Integer ALU
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Input Length in Bits"
                  value={values.resources?.float_DIV?.inputWidthInBits || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "resources.float_DIV.inputWidthInBits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the input length in bits
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
