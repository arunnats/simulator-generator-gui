"use client";
import React from "react";
import { useFormikContext } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StageCard({ stage, index, stageIndex }) {
  const { values, setFieldValue } = useFormikContext();

  // List of all instruction types
  const instructionTypes = [
    { key: "load", display: "Load" },
    { key: "store", display: "Store" },
    { key: "conditional_branch", display: "Conditional Branch" },
    { key: "unconditional_jump", display: "Unconditional Jump" },
    { key: "environment_call", display: "Environment Call" },
    { key: "trap_return", display: "Trap Return" },
    { key: "integer_ALU", display: "Integer ALU" },
    { key: "integer_MUL", display: "Integer MUL" },
    { key: "integer_DIV", display: "Integer DIV" },
    { key: "float_ALU", display: "Float ALU" },
    { key: "float_MUL", display: "Float MUL" },
    { key: "float_DIV", display: "Float DIV" },
  ];

  // List of all possible resources
  const resourceOptions = [
    "none",
    "integer_ALU",
    "integer_MUL",
    "integer_DIV",
    "float_ALU",
    "float_MUL",
    "float_DIV",
  ];

  return (
    <Card className="border-2 border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle>Stage {stage.stageNumber}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Action Code */}
        <div className="flex flex-col gap-2">
          <div className="font-medium">Action Code</div>
          <HoverCard>
            <HoverCardTrigger>
              <Textarea
                placeholder="Enter action code for this stage"
                value={stage.action}
                onChange={(e) =>
                  setFieldValue(
                    `pipeline.stages[${stageIndex}].action`,
                    e.target.value
                  )
                }
                className="min-h-[100px]"
              />
            </HoverCardTrigger>
            <HoverCardContent>
              Enter the action code that defines what happens in this pipeline
              stage
            </HoverCardContent>
          </HoverCard>
        </div>

        {/* Resource Mappings */}
        <div className="flex flex-col gap-2">
          <div className="font-medium">Resource Mappings</div>
          <div className="grid grid-cols-2 gap-4">
            {instructionTypes.map((instType) => (
              <div
                key={instType.key}
                className="flex flex-row items-center gap-2"
              >
                <div className="w-1/2 text-sm">{instType.display}</div>
                <div className="w-1/2">
                  <Select
                    value={stage.resources[instType.key] || "none"}
                    onValueChange={(value) =>
                      setFieldValue(
                        `pipeline.stages[${stageIndex}].resources.${instType.key}`,
                        value
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Resource" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceOptions.map((resource) => (
                        <SelectItem key={resource} value={resource}>
                          {resource}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
