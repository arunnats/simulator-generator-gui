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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross2Icon } from "@radix-ui/react-icons";
import BitDisplay from "./BitDisplay";

export default function InstructionCard({
  index,
  wordSize,
  onDelete,
  onDuplicate,
}) {
  const { values, setFieldValue, handleChange } = useFormikContext();
  const instruction = values.instructions[index];

  // Helper function to validate and handle bit index inputs
  const handleBitIndexChange = (fieldName, value) => {
    // Ensure value is numeric and within range
    const numericValue = value.replace(/[^0-9]/g, "");
    if (
      numericValue === "" ||
      (parseInt(numericValue) >= 0 && parseInt(numericValue) < wordSize)
    ) {
      setFieldValue(fieldName, numericValue);
    }
  };

  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader>
        <CardTitle>Instruction {index + 1}</CardTitle>
        <CardDescription>Hover Over Field For Information.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Instruction Field Value</CardTitle>
            <CardDescription>Description about how this works</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FieldArray name={`instructions[${index}].instructionFieldValues`}>
              {({ remove: removeField, push: pushField }) => (
                <div className="flex flex-col gap-4">
                  {instruction.instructionFieldValues.map(
                    (field, fieldIndex) => (
                      <div key={fieldIndex} className="flex flex-col gap-4">
                        <CardTitle>
                          Instruction Field Range {fieldIndex + 1}
                        </CardTitle>
                        <div className="flex flex-row gap-4 justify-between">
                          <HoverCard>
                            <HoverCardTrigger>
                              <Input
                                type="number"
                                placeholder="Bit Index Lower"
                                value={field.bitIndexLower}
                                min="0"
                                max={wordSize - 1}
                                onChange={(e) =>
                                  handleBitIndexChange(
                                    `instructions[${index}].instructionFieldValues[${fieldIndex}].bitIndexLower`,
                                    e.target.value
                                  )
                                }
                                className="w-[200px]"
                              />
                            </HoverCardTrigger>
                            <HoverCardContent>
                              Enter the lower bit index
                            </HoverCardContent>
                          </HoverCard>

                          <HoverCard>
                            <HoverCardTrigger>
                              <Input
                                type="number"
                                placeholder="Bit Index Upper"
                                value={field.bitIndexUpper}
                                disabled={!field.bitIndexLower}
                                min={parseInt(field.bitIndexLower) + 1 || 0}
                                max={wordSize - 1}
                                onChange={(e) =>
                                  handleBitIndexChange(
                                    `instructions[${index}].instructionFieldValues[${fieldIndex}].bitIndexUpper`,
                                    e.target.value
                                  )
                                }
                                className="w-[200px]"
                              />
                            </HoverCardTrigger>
                            <HoverCardContent>
                              Enter the upper bit index
                            </HoverCardContent>
                          </HoverCard>

                          <HoverCard>
                            <HoverCardTrigger>
                              <Input
                                type="text"
                                placeholder="Value"
                                value={field.value}
                                disabled={!field.bitIndexUpper}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const maxLength =
                                    parseInt(field.bitIndexUpper) -
                                    parseInt(field.bitIndexLower) +
                                    1;

                                  if (
                                    /^[01]*$/.test(inputValue) &&
                                    inputValue.length <= maxLength
                                  ) {
                                    setFieldValue(
                                      `instructions[${index}].instructionFieldValues[${fieldIndex}].value`,
                                      inputValue
                                    );
                                  }
                                }}
                                className="w-[200px]"
                              />
                            </HoverCardTrigger>
                            <HoverCardContent>
                              Enter the value (0 and 1 only)
                            </HoverCardContent>
                          </HoverCard>

                          <Button
                            type="button"
                            variant="destructive"
                            className="flex items-center p-2"
                            onClick={() => removeField(fieldIndex)}
                          >
                            <Cross2Icon />
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      pushField({
                        bitIndexLower: "",
                        bitIndexUpper: "",
                        value: "",
                      })
                    }
                  >
                    + New Instruction Field
                  </Button>
                </div>
              )}
            </FieldArray>

            <CardTitle>Instruction Mapping</CardTitle>
            <BitDisplay
              fields={instruction.instructionFieldValues.map((field) => ({
                lower: field.bitIndexLower,
                upper: field.bitIndexUpper,
                value: field.value,
              }))}
              wordSize={wordSize}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instruction Description</CardTitle>
            <CardDescription>Description about how this works</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Mnemonic and instruction type selectors */}
            <div className="flex flex-row gap-4">
              <HoverCard>
                <HoverCardTrigger>
                  <Input
                    type="text"
                    name={`instructions[${index}].mnemonic`}
                    placeholder="Mnemonic"
                    value={instruction.mnemonic}
                    onChange={handleChange}
                  />
                </HoverCardTrigger>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger>
                  <Select
                    onValueChange={(value) =>
                      setFieldValue(
                        `instructions[${index}].instructionType`,
                        value
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Instruction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      <SelectItem value="integer_ALU">Integer ALU</SelectItem>
                      <SelectItem value="placeholder">Temp</SelectItem>
                    </SelectContent>
                  </Select>
                </HoverCardTrigger>
              </HoverCard>

              {/* Branch condition and target address type selectors */}
              <HoverCard>
                <HoverCardTrigger>
                  <Select
                    onValueChange={(value) =>
                      setFieldValue(
                        `instructions[${index}].branchCondition`,
                        value
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Branch Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      <SelectItem value="is_not_equal(rs1_data,rs2_data)">
                        RS1 != RS2
                      </SelectItem>
                      <SelectItem value="placeholder">Temp</SelectItem>
                    </SelectContent>
                  </Select>
                </HoverCardTrigger>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger>
                  <Select
                    onValueChange={(value) =>
                      setFieldValue(
                        `instructions[${index}].targetAddressType`,
                        value
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Target Address Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      <SelectItem value="pc_relative_target_address">
                        PC Relative
                      </SelectItem>
                      <SelectItem value="placeholder">Temp</SelectItem>
                    </SelectContent>
                  </Select>
                </HoverCardTrigger>
              </HoverCard>
            </div>

            {/* RS1 fields */}
            <div className="flex flex-col gap-4">
              <CardTitle>RS1</CardTitle>
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Lower"
                      value={instruction.rs1.instrLower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs1.instrLower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Higher"
                      value={instruction.rs1.instrUpper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs1.instrUpper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="RS1 Bit Index Lower"
                      value={instruction.rs1.rs1Lower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs1.rs1Lower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="RS1 Bit Index Higher"
                      value={instruction.rs1.rs1Upper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs1.rs1Upper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            </div>

            {/* RS2 fields */}
            <div className="flex flex-col gap-4">
              <CardTitle>RS2</CardTitle>
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Lower"
                      value={instruction.rs2.instrLower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs2.instrLower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Higher"
                      value={instruction.rs2.instrUpper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs2.instrUpper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="RS2 Bit Index Lower"
                      value={instruction.rs2.rs2Lower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs2.rs2Lower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="RS2 Bit Index Higher"
                      value={instruction.rs2.rs2Upper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rs2.rs2Upper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            </div>

            {/* RD fields */}
            <div className="flex flex-col gap-4">
              <CardTitle>RD</CardTitle>
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Lower"
                      value={instruction.rd.instrLower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rd.instrLower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Higher"
                      value={instruction.rd.instrUpper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rd.instrUpper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="RD Bit Index Lower"
                      value={instruction.rd.rdLower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rd.rdLower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="RD Bit Index Higher"
                      value={instruction.rd.rdUpper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].rd.rdUpper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            </div>

            {/* Immediate fields */}
            <div className="flex flex-col gap-4">
              <CardTitle>Immediate</CardTitle>
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Lower"
                      value={instruction.immediate.instrLower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].immediate.instrLower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Instr Bit Index Higher"
                      value={instruction.immediate.instrUpper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].immediate.instrUpper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Immediate Bit Index Lower"
                      value={instruction.immediate.rs2Lower}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].immediate.immLower`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>

                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input
                      type="text"
                      placeholder="Immediate Bit Index Higher"
                      value={instruction.immediate.rs2Upper}
                      onChange={(e) =>
                        handleBitIndexChange(
                          `instructions[${index}].immediate.immUpper`,
                          e.target.value
                        )
                      }
                    />
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            </div>

            {/* Add this after the Immediate section in your InstructionCardFormik component */}
            <div className="flex flex-row gap-4 justify-between mt-2">
              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  <Switch
                    id={`sign-extend-${index}`}
                    checked={instruction.signExtendImmediate}
                    onCheckedChange={(checked) =>
                      setFieldValue(
                        `instructions[${index}].signExtendImmediate`,
                        checked
                      )
                    }
                  />
                  <Label
                    className="translate-y-[2px]"
                    htmlFor={`sign-extend-${index}`}
                  >
                    Sign Extend Immediate
                  </Label>
                </HoverCardTrigger>
                <HoverCardContent>
                  Enable sign extension for immediate values
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  <Switch
                    id={`register-read-${index}`}
                    checked={instruction.registerRead}
                    onCheckedChange={(checked) =>
                      setFieldValue(
                        `instructions[${index}].registerRead`,
                        checked
                      )
                    }
                  />
                  <Label
                    className="translate-y-[2px]"
                    htmlFor={`register-read-${index}`}
                  >
                    Register Read
                  </Label>
                </HoverCardTrigger>
                <HoverCardContent>
                  Enable register read for this instruction
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  <Switch
                    id={`register-write-${index}`}
                    checked={instruction.registerWrite}
                    onCheckedChange={(checked) =>
                      setFieldValue(
                        `instructions[${index}].registerWrite`,
                        checked
                      )
                    }
                  />
                  <Label
                    className="translate-y-[2px]"
                    htmlFor={`register-write-${index}`}
                  >
                    Register Write
                  </Label>
                </HoverCardTrigger>
                <HoverCardContent>
                  Enable register write for this instruction
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex flex-row w-full justify-center gap-56">
        <Button type="button" variant="outline" onClick={onDelete}>
          Delete Instruction
        </Button>
        <Button type="button" variant="outline" onClick={onDuplicate}>
          Duplicate Instruction
        </Button>
      </CardFooter>
    </Card>
  );
}
