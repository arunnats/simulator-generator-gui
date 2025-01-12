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
import { toast } from "sonner";

export default function InstructionCard({ instNo, wordSize = 32 }) {
  const [fields, setFields] = useState([
    { id: 1, lower: "", upper: "", value: "", valid: false, maxLength: null },
  ]);
  const [mnemonic, setMnemonic] = useState("");
  const [instructionType, setInstructionType] = useState("null");
  const [branchCondition, setBranchCondition] = useState("null");
  const [targetAddressType, setTargetAddressType] = useState("null");
  const [signExtendImmediate, setSignExtendImmediate] = useState(false);
  const [registerRead, setRegisterRead] = useState(false);
  const [registerWrite, setRegisterWrite] = useState(false);
  const [rs1, setRs1] = useState([
    { instr_lower: "", instr_upper: "", rs1_lower: "", rs1_upper: "" },
  ]);
  const [rs2, setRs2] = useState([
    { instr_lower: "", instr_upper: "", rs2_lower: "", rs2_upper: "" },
  ]);
  const [rd, setRd] = useState([
    { instr_lower: "", instr_upper: "", rd_lower: "", rd_upper: "" },
  ]);
  const [immediate, setImmediate] = useState([
    { instr_lower: "", instr_upper: "", imm_lower: "", imm_upper: "" },
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

  const handleFieldChange = (id, e, type) => {
    const inputValue = e.target.value;

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === id) {
          const lower = parseInt(field.lower);
          const upper = parseInt(field.upper);

          if (type === "lower") {
            // Handle lower change
            if (inputValue === "" || /^[0-9]*$/.test(inputValue)) {
              if (inputValue === "" || parseInt(inputValue) < wordSize) {
                field.lower = inputValue;
              }

              if (inputValue === "" || parseInt(inputValue) >= wordSize) {
                field.upper = "";
                field.value = "";
                field.valid = false;
                field.maxLength = null;
              }
            }
          } else if (type === "upper") {
            // Handle upper change
            if (inputValue === "" || /^[0-9]*$/.test(inputValue)) {
              if (inputValue === "" || parseInt(inputValue) < wordSize) {
                field.upper = inputValue;
                field.maxLength = field.upper - field.lower + 1;
                // console.log(field.maxLength);
              }

              if (inputValue === "" || parseInt(inputValue) <= lower) {
                field.value = "";
                field.valid = false;
                field.maxLength = null;
              }
            }
          } else if (type === "value") {
            // Handle value change
            const maxLength = upper - lower + 1;
            if (
              /^[01]*$/.test(inputValue) && // Ensure input only contains 0s and 1s
              inputValue.length <= maxLength
            ) {
              console.log(field);

              field.value = inputValue;
              field.valid = inputValue.length === maxLength; // Value is valid if length matches ma xLength
            }
          }

          return { ...field };
        }
        return field;
      })
    );
  };

  const handleInputChange = (setState, field, index, value) => {
    // Ensure only numeric values and within the valid range
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (
      numericValue === "" ||
      (parseInt(numericValue) >= 0 && parseInt(numericValue) < wordSize)
    ) {
      setState((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, [field]: numericValue } : item
        )
      );
    }
  };

  const ValidatedInput = ({ value, onChange, placeholder }) => (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );

  const logJSON = () => {
    const element = {
      instruction_field_value: fields.map((field) => ({
        instruction_bits: {
          bit_index_lower: field.lower,
          bit_index_higher: field.upper,
          value: field.value,
        },
      })),
      instruction: {
        mnemonic: mnemonic,
        rs1: rs1.map((field) => ({
          instruction_bits: {
            instruction_bit_index_lower: field.instr_lower
              ? field.instr_lower
              : "none",
            instruction_bit_index_higher: field.instr_upper
              ? field.instr_upper
              : "none",
            rs1_bit_index_lower: field.rs1_lower ? field.rs1_lower : "none",
            rs1_bit_index_higher: field.rs1_upper ? field.rs1_upper : "none",
          },
        })),
        rs2: rs2.map((field) => ({
          instruction_bits: {
            instruction_bit_index_lower: field.instr_lower
              ? field.instr_lower
              : "none",
            instruction_bit_index_higher: field.instr_upper
              ? field.instr_upper
              : "none",
            rs2_bit_index_lower: field.rs2_lower ? field.rs2_lower : "none",
            rs2_bit_index_higher: field.rs2_upper ? field.rs2_upper : "none",
          },
        })),
        rd: rd.map((field) => ({
          instruction_bits: {
            instruction_bit_index_lower: field.instr_lower
              ? field.instr_lower
              : "none",
            instruction_bit_index_higher: field.instr_upper
              ? field.instr_upper
              : "none",
            rd_bit_index_lower: field.rd_lower ? field.rd_lower : "none",
            rd_bit_index_higher: field.rd_upper ? field.rd_upper : "none",
          },
        })),
        immediate: immediate.map((field) => ({
          instruction_bits: {
            instruction_bit_index_lower: field.instr_lower
              ? field.instr_lower
              : "none",
            instruction_bit_index_higher: field.instr_upper
              ? field.instr_upper
              : "none",
            immediate_bit_index_lower: field.imm_lower
              ? field.imm_lower
              : "none",
            immediate_bit_index_higher: field.imm_upper
              ? field.imm_upper
              : "none",
          },
        })),
        sign_extend_immediate: signExtendImmediate ? 1 : 0,
        instruction_type: instructionType,
        branch_condition: branchCondition,
        target_address_type: targetAddressType,
        register_read: registerRead ? 1 : 0,
        register_write: registerWrite ? 1 : 0,
      },
    };

    console.log(JSON.stringify(element, null, 2)); // Logs the JSON with pretty formatting
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
                  <div className="flex flex-row gap-4 justify-between">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Input
                          type="number"
                          placeholder={`Bit Index Lower`}
                          value={field.lower}
                          min="0"
                          max={wordSize - 1}
                          onChange={(e) =>
                            handleFieldChange(field.id, e, "lower")
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
                          placeholder={`Bit Index Upper`}
                          value={field.upper}
                          disabled={!field.lower}
                          min={parseInt(field.lower) + 1 || 0}
                          max={wordSize - 1}
                          onChange={(e) =>
                            handleFieldChange(field.id, e, "upper")
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
                          type="number"
                          placeholder={`Value ${field.id}`}
                          value={field.value}
                          disabled={!field.upper}
                          onChange={(e) =>
                            handleFieldChange(field.id, e, "value")
                          }
                          className="w-[200px]"
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        Enter the value (0 and 1 only)
                      </HoverCardContent>
                    </HoverCard>

                    <Button
                      variant="destructive"
                      className="flex items-center p-2"
                      onClick={() => removeField(field.id)}
                    >
                      <Cross2Icon />
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
                  <Input
                    type="text"
                    placeholder="Mnemonic"
                    value={mnemonic}
                    onChange={(e) => setMnemonic(e.target.value)}
                  />
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
                    <ValidatedInput
                      value={rs1[0].instr_lower}
                      onChange={(value) =>
                        handleInputChange(setRs1, "instr_lower", 0, value)
                      }
                      placeholder="Instr Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <ValidatedInput
                      value={rs1[0].instr_upper}
                      onChange={(value) =>
                        handleInputChange(setRs1, "instr_upper", 0, value)
                      }
                      placeholder="Instr Bit Index Higher"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={rs1[0].rs1_lower}
                      onChange={(value) =>
                        handleInputChange(setRs1, "rs1_lower", 0, value)
                      }
                      placeholder="RS1 Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={rs1[0].rs1_upper}
                      onChange={(value) =>
                        handleInputChange(setRs1, "rs1_upper", 0, value)
                      }
                      placeholder="RS1 Bit Index Higher"
                    />{" "}
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
                    <ValidatedInput
                      value={rs2[0].instr_lower}
                      onChange={(value) =>
                        handleInputChange(setRs2, "instr_lower", 0, value)
                      }
                      placeholder="Instr Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <ValidatedInput
                      value={rs2[0].instr_upper}
                      onChange={(value) =>
                        handleInputChange(setRs2, "instr_upper", 0, value)
                      }
                      placeholder="Instr Bit Index Upper"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={rs2[0].rs2_lower}
                      onChange={(value) =>
                        handleInputChange(setRs2, "rs2_lower", 0, value)
                      }
                      placeholder="RS2 Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={rs2[0].rs2_upper}
                      onChange={(value) =>
                        handleInputChange(setRs2, "rs2_upper", 0, value)
                      }
                      placeholder="RS2 Bit Index Upper"
                    />{" "}
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
                    <ValidatedInput
                      value={rd[0].instr_lower}
                      onChange={(value) =>
                        handleInputChange(setRd, "instr_lower", 0, value)
                      }
                      placeholder="Instr Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <ValidatedInput
                      value={rd[0].instr_upper}
                      onChange={(value) =>
                        handleInputChange(setRd, "instr_upper", 0, value)
                      }
                      placeholder="Instr Bit Index Higher"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={rd[0].rd_lower}
                      onChange={(value) =>
                        handleInputChange(setRd, "rd_lower", 0, value)
                      }
                      placeholder="RD Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={rd[0].rd_upper}
                      onChange={(value) =>
                        handleInputChange(setRd, "rd_upper", 0, value)
                      }
                      placeholder="RD Bit Index Higher"
                    />{" "}
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
                    <ValidatedInput
                      value={immediate[0].instr_lower}
                      onChange={(value) =>
                        handleInputChange(setImmediate, "instr_lower", 0, value)
                      }
                      placeholder="Instr Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={immediate[0].instr_upper}
                      onChange={(value) =>
                        handleInputChange(setImmediate, "instr_upper", 0, value)
                      }
                      placeholder="Instr Bit Index Higher"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={immediate[0].imm_lower}
                      onChange={(value) =>
                        handleInputChange(setImmediate, "imm_lower", 0, value)
                      }
                      placeholder="Imm Bit Index Lower"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard className="flex-1">
                  <HoverCardTrigger>
                    <ValidatedInput
                      value={immediate[0].imm_upper}
                      onChange={(value) =>
                        handleInputChange(setImmediate, "imm_upper", 0, value)
                      }
                      placeholder="Imm Bit Index Higher"
                    />{" "}
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-between mt-2">
              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  {" "}
                  <Switch
                    id="sign-extend"
                    checked={signExtendImmediate}
                    onCheckedChange={(checked) =>
                      setSignExtendImmediate(checked)
                    }
                  />
                  <Label className="translate-y-[2px]" htmlFor="sign-extend">
                    Sign Extend Immediate
                  </Label>{" "}
                </HoverCardTrigger>
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  {" "}
                  <Switch
                    id="register-read"
                    checked={registerRead}
                    onCheckedChange={(checked) => setRegisterRead(checked)}
                  />
                  <Label className="translate-y-[2px]" htmlFor="register-read">
                    Register Read
                  </Label>{" "}
                </HoverCardTrigger>
                <HoverCardContent>Add Desc</HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger className="flex flex-row justify-centers items-center gap-2">
                  {" "}
                  <Switch
                    id="register-write"
                    checked={registerWrite}
                    onCheckedChange={(checked) => setRegisterWrite(checked)}
                  />
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
        <Button variant="secondary" onClick={logJSON}>
          Log JSON
        </Button>
      </CardFooter>
    </Card>
  );
}
