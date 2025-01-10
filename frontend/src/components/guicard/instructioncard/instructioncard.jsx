"use client";
import React, { useState } from "react";
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

export default function InstructionCard({ instNo, wordSize = 32 }) {
  const [fields, setFields] = useState([
    { id: 1, lower: "", upper: "", value: "", valid: false },
  ]);

  const addField = () => {
    setFields((prevFields) => [
      ...prevFields,
      {
        id: prevFields.length + 1,
        lower: "",
        upper: "",
        value: "",
        valid: false,
      },
    ]);
  };

  const removeField = (id) => {
    setFields((prevFields) =>
      prevFields
        .filter((field) => field.id !== id) // Remove the field
        .map((field, index) => ({
          ...field,
          id: index + 1, // Reassign IDs sequentially
        }))
    );
  };

  const updateField = (id, key, value) => {
    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === id) {
          const updatedField = { ...field, [key]: value };

          // Validation logic for lower, upper, and value
          if (key === "lower" || key === "upper") {
            // Validate lower and upper range
            const lowerValid =
              parseInt(updatedField.lower) >= 0 &&
              parseInt(updatedField.lower) < wordSize;
            const upperValid =
              parseInt(updatedField.upper) > parseInt(updatedField.lower) &&
              parseInt(updatedField.upper) < wordSize;

            // Enable the upper field if lower is valid
            if (lowerValid) {
              updatedField.valid =
                upperValid &&
                /^[01]*$/.test(updatedField.value) &&
                updatedField.value.length ===
                  parseInt(updatedField.upper) -
                    parseInt(updatedField.lower) +
                    1;
            } else {
              updatedField.valid = false;
            }
          }

          if (key === "value") {
            // Validate value only if lower and upper are set correctly
            const lower = parseInt(updatedField.lower);
            const upper = parseInt(updatedField.upper);
            const isValidValue =
              /^[01]*$/.test(updatedField.value) &&
              updatedField.value.length === upper - lower + 1;
            updatedField.valid = isValidValue;
          }

          return updatedField;
        }
        return field;
      })
    );
  };

  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader>
        <CardTitle>Instruction - {instNo}</CardTitle>
        <CardDescription>Hover Over Field For Information.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Instruction Field Value</CardTitle>
            <CardDescription>Description about how this works</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-4">
                  <CardTitle>Instruction Field Range {field.id}</CardTitle>
                  <div className="flex flex-row gap-4">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Input
                          type="number"
                          placeholder={`Bit Index Lower`}
                          value={field.lower}
                          min="0"
                          max={wordSize - 1}
                          onChange={(e) =>
                            updateField(field.id, "lower", e.target.value)
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
                          placeholder={`Bit Index Upper `}
                          value={field.upper}
                          disabled={!field.lower} // Disable if lower is not set
                          min={parseInt(field.lower) + 1 || 0} // Ensure upper > lower
                          max={wordSize - 1}
                          onChange={(e) =>
                            updateField(field.id, "upper", e.target.value)
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
                          placeholder={`Value ${field.id}`}
                          value={field.value}
                          disabled={!field.upper} // Disable if upper is not set
                          onChange={(e) =>
                            updateField(field.id, "value", e.target.value)
                          }
                          pattern="[01]*" // Only allow 0 and 1
                          maxLength={
                            parseInt(field.upper) - parseInt(field.lower) + 1
                          } // Limit length based on range
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>Enter the value</HoverCardContent>
                    </HoverCard>

                    <Button
                      variant="outline"
                      className="flex items-center p-2"
                      onClick={() => removeField(field.id)} // Remove the field
                    >
                      <Cross2Icon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={addField}>
                + New Instruction Field
              </Button>
            </div>
            <CardTitle>Instruction Mapping</CardTitle>
            <BitDisplay fields={fields} wordSize={wordSize} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Instruction Description</CardTitle>
            <CardDescription>Description about how this works</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Input type="email" placeholder="Mnemonic" />
                </HoverCardTrigger>
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Select>
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
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Select>
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
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Target Address Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      <SelectItem value="pc_relative_target_address">
                        PC Relative
                      </SelectItem>
                      <SelectItem value="placeholder">Temp</SelectItem>
                      <SelectItem value="placeholder">Temp</SelectItem>
                    </SelectContent>
                  </Select>
                </HoverCardTrigger>
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <CardTitle>RS1</CardTitle>
              <div className="flex flex-row gap-4">
                {" "}
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <CardTitle>RS2</CardTitle>
              <div className="flex flex-row gap-4">
                {" "}
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <CardTitle>RD</CardTitle>
              <div className="flex flex-row gap-4">
                {" "}
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <CardTitle>Immediate</CardTitle>
              <div className="flex flex-row gap-4">
                {" "}
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Instr Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <Input type="email" placeholder="RS1 Bit Index Higher" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-between mt-2">
              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  {" "}
                  <Switch id="sign-extend" />
                  <Label className="translate-y-[2px]" htmlFor="sign-extend">
                    Sign Extend Immediate
                  </Label>{" "}
                </HoverCardTrigger>
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  {" "}
                  <Switch id="register-read" />
                  <Label className="translate-y-[2px]" htmlFor="register-read">
                    Register Read
                  </Label>{" "}
                </HoverCardTrigger>
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  {" "}
                  <Switch id="register-write" />
                  <Label className="translate-y-[2px]" htmlFor="register-write">
                    Register Write
                  </Label>{" "}
                </HoverCardTrigger>
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>{" "}
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex flex-row w-full justify-center gap-56">
        <Button variant="secondary">Duplicate Instruction</Button>
        <Button variant="outline">Delete Instruction</Button>
      </CardFooter>
    </Card>
  );
}
