"use client";
import React, { useEffect } from "react";
import { useFormikContext, FieldArray } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import StageCard from "./StageCard";

export default function PipelineCard({ wordSize }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  // Helper function to validate numeric inputs
  const handleNumericInputChange = (fieldName, e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setFieldValue(fieldName, numericValue);
  };

  const handleTextInputChange = (fieldName, e) => {
    setFieldValue(fieldName, e.target.value);
  };

  // Update stages when pipeline length changes
  useEffect(() => {
    if (
      values.pipeline.pipelineLength &&
      parseInt(values.pipeline.pipelineLength) >= 3
    ) {
      const pipelineLength = parseInt(values.pipeline.pipelineLength);
      const currentStages = values.pipeline.stages || [];

      // Create an array of stage numbers we need (starting from 3)
      const neededStages = Array.from(
        { length: pipelineLength - 2 },
        (_, i) => i + 3
      );

      // Filter existing stages to keep only those we need
      const filteredStages = currentStages.filter(
        (stage) =>
          stage.stageNumber && parseInt(stage.stageNumber) <= pipelineLength
      );

      // Find which stage numbers we're missing
      const existingStageNumbers = filteredStages.map((s) =>
        parseInt(s.stageNumber)
      );
      const missingStageNumbers = neededStages.filter(
        (num) => !existingStageNumbers.includes(num)
      );

      // Create new stages for missing numbers
      const newStages = missingStageNumbers.map((stageNumber) => ({
        id: Math.max(0, ...currentStages.map((s) => s.id || 0)) + 1,
        stageNumber: stageNumber.toString(),
        action: "",
        resources: {
          load: "none",
          store: "none",
          conditional_branch: "none",
          unconditional_jump: "none",
          environment_call: "none",
          trap_return: "none",
          integer_ALU: "none",
          integer_MUL: "none",
          integer_DIV: "none",
          float_ALU: "none",
          float_MUL: "none",
          float_DIV: "none",
        },
      }));

      // Set the updated stages array
      setFieldValue(
        "pipeline.stages",
        [...filteredStages, ...newStages].sort(
          (a, b) => parseInt(a.stageNumber) - parseInt(b.stageNumber)
        )
      );
    }
  }, [values.pipeline.pipelineLength]);

  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader>
        <CardTitle>Pipeline Configuration</CardTitle>
        <CardDescription>
          Configure processor pipeline stages and behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Pipeline Length */}
        <div className="flex flex-col gap-2">
          <div className="font-medium">Pipeline Length</div>
          <HoverCard>
            <HoverCardTrigger>
              <Input
                type="number"
                placeholder="Pipeline Length (min 3)"
                value={values.pipeline.pipelineLength}
                onChange={(e) =>
                  handleNumericInputChange("pipeline.pipelineLength", e)
                }
                min="3"
                className="w-full"
              />
            </HoverCardTrigger>
            <HoverCardContent>
              Enter the total number of pipeline stages (minimum 3)
            </HoverCardContent>
          </HoverCard>
          {errors.pipeline?.pipelineLength &&
            touched.pipeline?.pipelineLength && (
              <div className="text-red-500 text-sm">
                {errors.pipeline.pipelineLength}
              </div>
            )}
        </div>

        {/* Key Pipeline Stage Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-medium">
              Stage After Which Instructions Are Issued
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="number"
                  placeholder="Stage Number"
                  value={values.pipeline.stageAfterWhichInstructionsAreIssued}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "pipeline.stageAfterWhichInstructionsAreIssued",
                      e.target.value
                    )
                  }
                  min="1"
                  className="w-full"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the stage after which instructions are issued
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-medium">
              Stage In Which Register File Is Read
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="number"
                  placeholder="Stage Number"
                  value={values.pipeline.stageInWhichRegisterFileIsRead}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "pipeline.stageInWhichRegisterFileIsRead",
                      e.target.value
                    )
                  }
                  min="1"
                  className="w-full"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the stage in which register file is read
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-medium">
              Stage In Which Register File Is Written
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="number"
                  placeholder="Stage Number"
                  value={values.pipeline.stageInWhichRegisterFileIsWritten}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "pipeline.stageInWhichRegisterFileIsWritten",
                      e.target.value
                    )
                  }
                  min="1"
                  className="w-full"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the stage in which register file is written
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-medium">Stage In Which Memory Is Written</div>
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="number"
                  placeholder="Stage Number"
                  value={values.pipeline.stageInWhichMemoryIsWritten}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "pipeline.stageInWhichMemoryIsWritten",
                      e.target.value
                    )
                  }
                  min="1"
                  className="w-full"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the stage in which memory is written
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <div className="font-medium">
              Stage In Which Taken Branch Or Unconditional Jump Is Detected
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="number"
                  placeholder="Stage Number"
                  value={
                    values.pipeline
                      .stageInWhichTakenBranchOrUnconditionalJumpIsDetected
                  }
                  onChange={(e) =>
                    handleNumericInputChange(
                      "pipeline.stageInWhichTakenBranchOrUnconditionalJumpIsDetected",
                      e.target.value
                    )
                  }
                  min="1"
                  className="w-full"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the stage in which taken branch or unconditional jump is
                detected
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Stage Cards */}
        {values.pipeline.pipelineLength &&
          parseInt(values.pipeline.pipelineLength) >= 3 && (
            <div className="flex flex-col gap-4 mt-4">
              <div className="font-medium text-lg">Pipeline Stages</div>
              <FieldArray name="pipeline.stages">
                {({ remove }) => (
                  <div className="flex flex-col gap-6">
                    {values.pipeline.stages
                      .filter((stage) => parseInt(stage.stageNumber) >= 3)
                      .sort(
                        (a, b) =>
                          parseInt(a.stageNumber) - parseInt(b.stageNumber)
                      )
                      .map((stage, index) => (
                        <StageCard
                          key={`stage-${stage.stageNumber}`}
                          stage={stage}
                          index={index}
                          stageIndex={values.pipeline.stages.findIndex(
                            (s) => s.id === stage.id
                          )}
                        />
                      ))}
                  </div>
                )}
              </FieldArray>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
