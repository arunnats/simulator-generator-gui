"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form, FieldArray } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InstructionCard from "@/components/guicard/instructioncard/InstructionCard";
import RegisterCard from "@/components/guicard/registerCard/RegisterCard";
import AddressTranslationCard from "@/components/guicard/addressTranslationCard/AddressTranslationCard";
import ProtectionEncodingCard from "@/components/guicard/protectionEncodingCard/ProtectionEncodingCard";
import ProtectionTableCard from "@/components/guicard/protectionTable/ProtectionTable";

import * as Yup from "yup";

// Validation schema for the entire form
const GUISchema = Yup.object().shape({
  wordSize: Yup.number()
    .required("Word size is required")
    .positive("Word size must be positive")
    .integer("Word size must be an integer"),
  instructions: Yup.array().of(
    Yup.object().shape({
      mnemonic: Yup.string().required("Mnemonic is required"),
      instructionFieldValues: Yup.array().of(
        Yup.object().shape({
          bitIndexLower: Yup.number()
            .required("Lower bit index is required")
            .min(0, "Must be non-negative"),
          bitIndexUpper: Yup.number()
            .required("Upper bit index is required")
            .test(
              "is-greater-than-lower",
              "Must be greater than lower bit index",
              function (value) {
                const { bitIndexLower } = this.parent;
                return !bitIndexLower || !value || value > bitIndexLower;
              }
            ),
          value: Yup.string().matches(/^[01]+$/, "Only binary values allowed"),
        })
      ),
    })
  ),
  registers: Yup.object().shape({
    unprivilegedRegisterFile: Yup.object().shape({
      registerFileName: Yup.string().required("Register file name is required"),
      registerlen: Yup.number()
        .required("Register length is required")
        .positive("Must be positive"),
      registerCount: Yup.number()
        .required("Register count is required")
        .positive("Must be positive"),
      dataOnReset: Yup.string().required("Data on reset is required"),
    }),
    unprivilegedRegister: Yup.object().shape({
      registerName: Yup.string().required("Register name is required"),
      registerlen: Yup.number()
        .required("Register length is required")
        .positive("Must be positive"),
      dataOnReset: Yup.string().required("Data on reset is required"),
    }),
    privilegedRegisterFile: Yup.object().shape({
      registerFileName: Yup.string().required("Register file name is required"),
      registerlen: Yup.number()
        .required("Register length is required")
        .positive("Must be positive"),
      registerCount: Yup.number()
        .required("Register count is required")
        .positive("Must be positive"),
      dataOnReset: Yup.string().required("Data on reset is required"),
    }),
  }),
  address_translation: Yup.object().shape({
    VA: Yup.object().shape({
      length_in_bits: Yup.number()
        .required("VA length is required")
        .positive("Must be positive"),
    }),
    guest_PA: Yup.object().shape({
      length_in_bits: Yup.number()
        .required("Guest PA length is required")
        .positive("Must be positive"),
    }),
    PA: Yup.object().shape({
      length_in_bits: Yup.number()
        .required("PA length is required")
        .positive("Must be positive"),
    }),
    page: Yup.object().shape({
      size_in_bytes: Yup.number()
        .required("Page size is required")
        .positive("Must be positive"),
    }),
    PTE: Yup.object().shape({
      size_in_bytes: Yup.number()
        .required("PTE size is required")
        .positive("Must be positive"),
    }),
    position_of_guest_PPN_in_PTE: Yup.object().shape({
      bit_index_lower: Yup.number()
        .required("Guest PPN position is required")
        .min(0, "Must be non-negative"),
    }),
    position_of_PPN_in_PTE: Yup.object().shape({
      bit_index_lower: Yup.number()
        .required("PPN position is required")
        .min(0, "Must be non-negative"),
    }),
  }),
  protectionEncodings: Yup.array().of(
    Yup.object().shape({
      value: Yup.string()
        .required("Protection encoding value is required")
        .matches(/^[01]+$/, "Only binary values allowed"),
    })
  ),
  protectionTable: Yup.object().shape({
    tableName: Yup.string().required("Protection table name is required"),
    encodingLengthInBits: Yup.number()
      .required("Encoding length is required")
      .positive("Must be positive"),
    encodingCount: Yup.number()
      .required("Encoding count is required")
      .positive("Must be positive"),
    encodings: Yup.array().of(
      Yup.object().shape({
        from: Yup.number()
          .required("From value is required")
          .min(0, "Must be non-negative"),
        to: Yup.number()
          .required("To value is required")
          .test(
            "is-greater-than-from",
            "Must be greater than or equal to From value",
            function (value) {
              const { from } = this.parent;
              return !from || !value || parseInt(value) >= parseInt(from);
            }
          ),
        value: Yup.string()
          .required("Protection encoding value is required")
          .matches(/^[01]+$/, "Only binary values allowed"),
      })
    ),
  }),
});

// Initial empty instruction template
const emptyInstruction = {
  instructionFieldValues: [
    {
      bitIndexLower: "",
      bitIndexUpper: "",
      value: "",
    },
  ],
  mnemonic: "",
  instructionType: "none",
  branchCondition: "none",
  targetAddressType: "none",
  signExtendImmediate: false,
  registerRead: false,
  registerWrite: false,
  rs1: { instrLower: "", instrUpper: "", rs1Lower: "", rs1Upper: "" },
  rs2: { instrLower: "", instrUpper: "", rs2Lower: "", rs2Upper: "" },
  rd: { instrLower: "", instrUpper: "", rdLower: "", rdUpper: "" },
  immediate: { instrLower: "", instrUpper: "", immLower: "", immUpper: "" },
};

const protectionEncoding = {
  id: 0,
  value: "",
};

const protectionTableEncoding = {
  id: 0,
  from: "",
  to: "",
  value: "",
};

export default function GUI() {
  // Initial form values
  const initialValues = {
    wordSize: "",
    instructions: [
      {
        ...emptyInstruction,
        id: 1,
      },
    ],
    registers: {
      unprivilegedRegisterFile: {
        registerFileName: "",
        registerlen: "",
        registerCount: "",
        dataOnReset: "",
      },
      unprivilegedRegister: {
        registerName: "",
        registerlen: "",
        dataOnReset: "",
      },
      privilegedRegisterFile: {
        registerFileName: "",
        registerlen: "",
        registerCount: "",
        dataOnReset: "",
      },
    },
    address_translation: {
      VA: {
        length_in_bits: "",
      },
      guest_PA: {
        length_in_bits: "",
      },
      PA: {
        length_in_bits: "",
      },
      page: {
        size_in_bytes: "",
      },
      PTE: {
        size_in_bytes: "",
      },
      position_of_guest_PPN_in_PTE: {
        bit_index_lower: "",
      },
      position_of_PPN_in_PTE: {
        bit_index_lower: "",
      },
    },
    protectionEncodings: [
      {
        ...protectionEncoding,
        id: 1,
      },
    ],
    protectionTable: {
      tableName: "",
      encodingLengthInBits: "",
      encodingCount: "",
      encodings: [
        {
          ...protectionTableEncoding,
          id: 1,
        },
      ],
    },
  };

  // Function to generate the final JSON output
  const generateISAJson = (values) => {
    const instructionMappings = values.instructions.map((instruction) => ({
      instruction_field_value: instruction.instructionFieldValues.map(
        (field) => ({
          instruction_bits: {
            bit_index_lower: field.bitIndexLower,
            bit_index_higher: field.bitIndexUpper,
            value: field.value ? `0b${field.value}` : "",
          },
        })
      ),
      instruction: {
        mnemonic: instruction.mnemonic,
        rs1: {
          instruction_bit_index_lower: instruction.rs1.instrLower || "none",
          instruction_bit_index_higher: instruction.rs1.instrUpper || "none",
          rs1_bit_index_lower: instruction.rs1.rs1Lower || "none",
          rs1_bit_index_higher: instruction.rs1.rs1Upper || "none",
        },
        rs2: {
          instruction_bit_index_lower: instruction.rs2.instrLower || "none",
          instruction_bit_index_higher: instruction.rs2.instrUpper || "none",
          rs2_bit_index_lower: instruction.rs2.rs2Lower || "none",
          rs2_bit_index_higher: instruction.rs2.rs2Upper || "none",
        },
        rd: {
          instruction_bit_index_lower: instruction.rd.instrLower || "none",
          instruction_bit_index_higher: instruction.rd.instrUpper || "none",
          rd_bit_index_lower: instruction.rd.rdLower || "none",
          rd_bit_index_higher: instruction.rd.rdUpper || "none",
        },
        immediate: {
          instruction_bit_index_lower:
            instruction.immediate.instrLower || "none",
          instruction_bit_index_higher:
            instruction.immediate.instrUpper || "none",
          immediate_bit_index_lower: instruction.immediate.immLower || "none",
          immediate_bit_index_higher: instruction.immediate.immUpper || "none",
        },
        sign_extend_immediate: instruction.signExtendImmediate ? 1 : 0,
        instruction_type: instruction.instructionType,
        branch_condition: instruction.branchCondition,
        target_address_type: instruction.targetAddressType,
        register_read: instruction.registerRead ? 1 : 0,
        register_write: instruction.registerWrite ? 1 : 0,
      },
    }));

    const registers = {
      unprivileged_register_file: {
        register_file_name:
          values.registers.unprivilegedRegisterFile.registerFileName || "none",
        registerlen:
          values.registers.unprivilegedRegisterFile.registerlen || "none",
        register_count:
          values.registers.unprivilegedRegisterFile.registerCount || "none",
        data_on_reset:
          values.registers.unprivilegedRegisterFile.dataOnReset || "none",
      },
      unprivileged_register: {
        register_name:
          values.registers.unprivilegedRegister.registerName || "none",
        registerlen:
          values.registers.unprivilegedRegister.registerlen || "none",
        data_on_reset:
          values.registers.unprivilegedRegister.dataOnReset || "none",
      },
      privileged_register_file: {
        register_file_name:
          values.registers.privilegedRegisterFile.registerFileName || "none",
        registerlen:
          values.registers.privilegedRegisterFile.registerlen || "none",
        register_count:
          values.registers.privilegedRegisterFile.registerCount || "none",
        data_on_reset:
          values.registers.privilegedRegisterFile.dataOnReset || "none",
      },
    };

    const address_translation = {
      VA: {
        length_in_bits: values.address_translation.VA.length_in_bits || "none",
      },
      guest_PA: {
        length_in_bits:
          values.address_translation.guest_PA.length_in_bits || "none",
      },
      PA: {
        length_in_bits: values.address_translation.PA.length_in_bits || "none",
      },
      page: {
        size_in_bytes: values.address_translation.page.size_in_bytes || "none",
      },
      PTE: {
        size_in_bytes: values.address_translation.PTE.size_in_bytes || "none",
      },
      position_of_guest_PPN_in_PTE: {
        bit_index_lower:
          values.address_translation.position_of_guest_PPN_in_PTE
            .bit_index_lower || "none",
      },
      position_of_PPN_in_PTE: {
        bit_index_lower:
          values.address_translation.position_of_PPN_in_PTE.bit_index_lower ||
          "none",
      },
    };

    const protection_encodings_for_which_memory_access_is_not_allowed = {
      protection_encoding: values.protectionEncodings.map((encoding) => ({
        value: encoding.value ? `0b${encoding.value}` : "none",
      })),
    };

    const protection_table = {
      protection_table_name: values.protectionTable.tableName || "none",
      protection_encoding_length_in_bits:
        values.protectionTable.encodingLengthInBits || "none",
      protection_encoding_count: values.protectionTable.encodingCount || "none",
      protection_encoding: values.protectionTable.encodings.map((encoding) => ({
        from: encoding.from || "0",
        to: encoding.to || "0",
        value: encoding.value ? `0b${encoding.value}` : "none",
      })),
    };

    return {
      architecture_specifications: {
        ISA: {
          instructionlen_in_bits: values.wordSize,
          mapping_from_set_of_instruction_field_values_to_set_of_instructions:
            instructionMappings,
        },
        registers,
        address_translation,
        protection_encodings_for_which_memory_access_is_not_allowed,
        protection_table,
      },
      microarchitecture_specifications: {},
    };
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Formik
          initialValues={initialValues}
          validationSchema={GUISchema}
          onSubmit={(values) => {
            const isaJson = generateISAJson(values);
            console.log(JSON.stringify(isaJson, null, 2));
          }}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Card className="flex flex-col w-[800px]">
                <CardHeader>
                  <CardTitle>Word Size</CardTitle>
                  <CardDescription>
                    Description about how this works
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row gap-4">
                  <Input
                    type="number"
                    name="wordSize"
                    placeholder="Word Size"
                    className="w-full"
                    value={values.wordSize}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>

              {values.wordSize && (
                <>
                  <FieldArray name="instructions">
                    {({ remove, push, insert }) => (
                      <div className="flex flex-col gap-4">
                        {values.instructions.map((instruction, index) => (
                          <InstructionCard
                            key={instruction.id}
                            index={index}
                            wordSize={parseInt(values.wordSize)}
                            values={values.instructions[index]}
                            onDelete={() => remove(index)}
                            onDuplicate={() => {
                              // Create a deep copy of the current instruction
                              const duplicatedInstruction = JSON.parse(
                                JSON.stringify(instruction)
                              );
                              // Assign a new unique ID
                              duplicatedInstruction.id =
                                values.instructions.length + 1;
                              // Insert the duplicated instruction after the current one
                              insert(index + 1, duplicatedInstruction);
                            }}
                          />
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            push({
                              ...emptyInstruction,
                              id: values.instructions.length + 1,
                            })
                          }
                        >
                          Add New Instruction +
                        </Button>
                      </div>
                    )}
                  </FieldArray>

                  <RegisterCard wordSize={parseInt(values.wordSize)} />

                  <AddressTranslationCard
                    wordSize={parseInt(values.wordSize)}
                  />

                  <ProtectionEncodingCard
                    wordSize={parseInt(values.wordSize)}
                  />

                  <ProtectionTableCard wordSize={parseInt(values.wordSize)} />

                  <Button type="submit" variant="secondary">
                    Generate JSON
                  </Button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
