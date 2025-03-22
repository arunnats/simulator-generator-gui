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
import ResourceCard from "@/components/guicard/resourceCard/ResourceCard";
import PipelineCard from "@/components/guicard/pipelineCard/PipelineCard";
import { json2xml } from "xml-js";
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
  mode: Yup.object().shape({
    modeOnReset: Yup.string().required("Mode on reset is required"),
  }),
  resources: Yup.object().shape({
    L1_I_cache: Yup.object().shape({
      blockSizeInBytes: Yup.number()
        .required("Block size is required")
        .positive("Must be positive"),
      associativity: Yup.number()
        .required("Associativity is required")
        .positive("Must be positive"),
      sizeInBytes: Yup.number()
        .required("Size is required")
        .positive("Must be positive"),
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
    }),
    L1_D_cache: Yup.object().shape({
      blockSizeInBytes: Yup.number()
        .required("Block size is required")
        .positive("Must be positive"),
      associativity: Yup.number()
        .required("Associativity is required")
        .positive("Must be positive"),
      sizeInBytes: Yup.number()
        .required("Size is required")
        .positive("Must be positive"),
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
    }),
    L2_cache: Yup.object().shape({
      blockSizeInBytes: Yup.number()
        .required("Block size is required")
        .positive("Must be positive"),
      associativity: Yup.number()
        .required("Associativity is required")
        .positive("Must be positive"),
      sizeInBytes: Yup.number()
        .required("Size is required")
        .positive("Must be positive"),
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
    }),
    L3_cache: Yup.object().shape({
      blockSizeInBytes: Yup.number()
        .required("Block size is required")
        .positive("Must be positive"),
      associativity: Yup.number()
        .required("Associativity is required")
        .positive("Must be positive"),
      sizeInBytes: Yup.number()
        .required("Size is required")
        .positive("Must be positive"),
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
    }),
    physical_memory: Yup.object().shape({
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
    }),
    I_TLB: Yup.object().shape({
      noOfPTEsInEachBlock: Yup.number()
        .required("PTEs count is required")
        .positive("Must be positive"),
      associativity: Yup.number()
        .required("Associativity is required")
        .positive("Must be positive"),
      noOfEntries: Yup.number()
        .required("Entries count is required")
        .positive("Must be positive"),
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
    }),
    D_TLB: Yup.object().shape({
      noOfPTEsInEachBlock: Yup.number()
        .required("PTEs count is required")
        .positive("Must be positive"),
      associativity: Yup.number()
        .required("Associativity is required")
        .positive("Must be positive"),
      noOfEntries: Yup.number()
        .required("Entries count is required")
        .positive("Must be positive"),
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
    }),
    integer_ALU: Yup.object().shape({
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
      inputWidthInBits: Yup.number()
        .required("Input width is required")
        .positive("Must be positive"),
    }),
    integer_MUL: Yup.object().shape({
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
      inputWidthInBits: Yup.number()
        .required("Input width is required")
        .positive("Must be positive"),
    }),
    integer_DIV: Yup.object().shape({
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
      inputWidthInBits: Yup.number()
        .required("Input width is required")
        .positive("Must be positive"),
    }),
    float_ALU: Yup.object().shape({
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
      inputWidthInBits: Yup.number()
        .required("Input width is required")
        .positive("Must be positive"),
    }),
    float_MUL: Yup.object().shape({
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
      inputWidthInBits: Yup.number()
        .required("Input width is required")
        .positive("Must be positive"),
    }),
    float_DIV: Yup.object().shape({
      latencyInCycles: Yup.number()
        .required("Latency is required")
        .positive("Must be positive"),
      inputWidthInBits: Yup.number()
        .required("Input width is required")
        .positive("Must be positive"),
    }),
  }),
  pipeline: Yup.object().shape({
    pipelineLength: Yup.number()
      .required("Pipeline length is required")
      .min(3, "Pipeline must have at least 3 stages")
      .positive("Must be positive")
      .integer("Must be an integer"),
    stageAfterWhichInstructionsAreIssued: Yup.number()
      .required("Stage is required")
      .min(1, "Must be at least 1")
      .test(
        "is-less-than-pipeline-length",
        "Must be less than pipeline length",
        function (value) {
          return (
            !value ||
            !this.parent.pipelineLength ||
            value < this.parent.pipelineLength
          );
        }
      ),
    stageInWhichRegisterFileIsRead: Yup.number()
      .required("Stage is required")
      .min(1, "Must be at least 1")
      .test(
        "is-less-than-pipeline-length",
        "Must be less than or equal to pipeline length",
        function (value) {
          return (
            !value ||
            !this.parent.pipelineLength ||
            value <= this.parent.pipelineLength
          );
        }
      ),
    stageInWhichRegisterFileIsWritten: Yup.number()
      .required("Stage is required")
      .min(1, "Must be at least 1")
      .test(
        "is-less-than-pipeline-length",
        "Must be less than or equal to pipeline length",
        function (value) {
          return (
            !value ||
            !this.parent.pipelineLength ||
            value <= this.parent.pipelineLength
          );
        }
      ),
    stageInWhichMemoryIsWritten: Yup.number()
      .required("Stage is required")
      .min(1, "Must be at least 1")
      .test(
        "is-less-than-pipeline-length",
        "Must be less than or equal to pipeline length",
        function (value) {
          return (
            !value ||
            !this.parent.pipelineLength ||
            value <= this.parent.pipelineLength
          );
        }
      ),
    stageInWhichTakenBranchOrUnconditionalJumpIsDetected: Yup.number()
      .required("Stage is required")
      .min(1, "Must be at least 1")
      .test(
        "is-less-than-pipeline-length",
        "Must be less than or equal to pipeline length",
        function (value) {
          return (
            !value ||
            !this.parent.pipelineLength ||
            value <= this.parent.pipelineLength
          );
        }
      ),
    stages: Yup.array().of(
      Yup.object().shape({
        stageNumber: Yup.number().required("Stage number is required"),
        action: Yup.string(),
        resources: Yup.object().shape({
          load: Yup.string(),
          store: Yup.string(),
          conditional_branch: Yup.string(),
          unconditional_jump: Yup.string(),
          environment_call: Yup.string(),
          trap_return: Yup.string(),
          integer_ALU: Yup.string(),
          integer_MUL: Yup.string(),
          integer_DIV: Yup.string(),
          float_ALU: Yup.string(),
          float_MUL: Yup.string(),
          float_DIV: Yup.string(),
        }),
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

const emptyStage = {
  id: 0,
  stageNumber: "",
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
    mode: {
      modeOnReset: "",
    },
    resources: {
      L1_I_cache: {
        blockSizeInBytes: "",
        associativity: "",
        sizeInBytes: "",
        latencyInCycles: "",
      },
      L1_D_cache: {
        blockSizeInBytes: "",
        associativity: "",
        sizeInBytes: "",
        latencyInCycles: "",
      },
      L2_cache: {
        blockSizeInBytes: "",
        associativity: "",
        sizeInBytes: "",
        latencyInCycles: "",
      },
      L3_cache: {
        blockSizeInBytes: "",
        associativity: "",
        sizeInBytes: "",
        latencyInCycles: "",
      },
      physical_memory: {
        latencyInCycles: "",
      },
      I_TLB: {
        noOfPTEsInEachBlock: "",
        associativity: "",
        noOfEntries: "",
        latencyInCycles: "",
      },
      D_TLB: {
        noOfPTEsInEachBlock: "",
        associativity: "",
        noOfEntries: "",
        latencyInCycles: "",
      },
      integer_ALU: {
        latencyInCycles: "",
        inputWidthInBits: "",
      },
      integer_MUL: {
        latencyInCycles: "",
        inputWidthInBits: "",
      },
      integer_DIV: {
        latencyInCycles: "",
        inputWidthInBits: "",
      },
      float_ALU: {
        latencyInCycles: "",
        inputWidthInBits: "",
      },
      float_MUL: {
        latencyInCycles: "",
        inputWidthInBits: "",
      },
      float_DIV: {
        latencyInCycles: "",
        inputWidthInBits: "",
      },
    },
    pipeline: {
      pipelineLength: "",
      stageAfterWhichInstructionsAreIssued: "",
      stageInWhichRegisterFileIsRead: "",
      stageInWhichRegisterFileIsWritten: "",
      stageInWhichMemoryIsWritten: "",
      stageInWhichTakenBranchOrUnconditionalJumpIsDetected: "",
      stages: [
        {
          ...emptyStage,
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

    const mode = {
      mode_on_reset: values.mode.modeOnReset || "none",
    };

    const resources = {
      L1_I_cache: {
        block_size_in_bytes:
          values.resources.L1_I_cache.blockSizeInBytes || "none",
        associativity: values.resources.L1_I_cache.associativity || "none",
        size_in_bytes: values.resources.L1_I_cache.sizeInBytes || "none",
        latency_in_cycles:
          values.resources.L1_I_cache.latencyInCycles || "none",
      },
      L1_D_cache: {
        block_size_in_bytes:
          values.resources.L1_D_cache.blockSizeInBytes || "none",
        associativity: values.resources.L1_D_cache.associativity || "none",
        size_in_bytes: values.resources.L1_D_cache.sizeInBytes || "none",
        latency_in_cycles:
          values.resources.L1_D_cache.latencyInCycles || "none",
      },
      L2_cache: {
        block_size_in_bytes:
          values.resources.L2_cache.blockSizeInBytes || "none",
        associativity: values.resources.L2_cache.associativity || "none",
        size_in_bytes: values.resources.L2_cache.sizeInBytes || "none",
        latency_in_cycles: values.resources.L2_cache.latencyInCycles || "none",
      },
      L3_cache: {
        block_size_in_bytes:
          values.resources.L3_cache.blockSizeInBytes || "none",
        associativity: values.resources.L3_cache.associativity || "none",
        size_in_bytes: values.resources.L3_cache.sizeInBytes || "none",
        latency_in_cycles: values.resources.L3_cache.latencyInCycles || "none",
      },
      physical_memory: {
        latency_in_cycles:
          values.resources.physical_memory.latencyInCycles || "none",
      },
      I_TLB: {
        no_of_PTEs_in_each_block:
          values.resources.I_TLB.noOfPTEsInEachBlock || "none",
        associativity: values.resources.I_TLB.associativity || "none",
        no_of_entries: values.resources.I_TLB.noOfEntries || "none",
        latency_in_cycles: values.resources.I_TLB.latencyInCycles || "none",
      },
      D_TLB: {
        no_of_PTEs_in_each_block:
          values.resources.D_TLB.noOfPTEsInEachBlock || "none",
        associativity: values.resources.D_TLB.associativity || "none",
        no_of_entries: values.resources.D_TLB.noOfEntries || "none",
        latency_in_cycles: values.resources.D_TLB.latencyInCycles || "none",
      },
      integer_ALU: {
        latency_in_cycles:
          values.resources.integer_ALU.latencyInCycles || "none",
        input_width_in_bits:
          values.resources.integer_ALU.inputWidthInBits || "none",
      },
      integer_MUL: {
        latency_in_cycles:
          values.resources.integer_MUL.latencyInCycles || "none",
        input_width_in_bits:
          values.resources.integer_MUL.inputWidthInBits || "none",
      },
      integer_DIV: {
        latency_in_cycles:
          values.resources.integer_DIV.latencyInCycles || "none",
        input_width_in_bits:
          values.resources.integer_DIV.inputWidthInBits || "none",
      },
      float_ALU: {
        latency_in_cycles: values.resources.float_ALU.latencyInCycles || "none",
        input_width_in_bits:
          values.resources.float_ALU.inputWidthInBits || "none",
      },
      float_MUL: {
        latency_in_cycles: values.resources.float_MUL.latencyInCycles || "none",
        input_width_in_bits:
          values.resources.float_MUL.inputWidthInBits || "none",
      },
      float_DIV: {
        latency_in_cycles: values.resources.float_DIV.latencyInCycles || "none",
        input_width_in_bits:
          values.resources.float_DIV.inputWidthInBits || "none",
      },
    };

    const pipeline = {
      pipeline_length: values.pipeline.pipelineLength || "none",
      stage_after_which_instructions_are_issued:
        values.pipeline.stageAfterWhichInstructionsAreIssued || "none",
      stage_in_which_register_file_is_read:
        values.pipeline.stageInWhichRegisterFileIsRead || "none",
      stage_in_which_register_file_is_written:
        values.pipeline.stageInWhichRegisterFileIsWritten || "none",
      stage_in_which_memory_is_written:
        values.pipeline.stageInWhichMemoryIsWritten || "none",
      stage_in_which_taken_branch_or_unconditional_jump_is_detected:
        values.pipeline.stageInWhichTakenBranchOrUnconditionalJumpIsDetected ||
        "none",
      stage: values.pipeline.stages.map((stage) => ({
        stage_number: stage.stageNumber,
        action: stage.action || "",
        resource: [
          { instruction_type: "load", _text: stage.resources.load || "none" },
          { instruction_type: "store", _text: stage.resources.store || "none" },
          {
            instruction_type: "conditional_branch",
            _text: stage.resources.conditional_branch || "none",
          },
          {
            instruction_type: "unconditional_jump",
            _text: stage.resources.unconditional_jump || "none",
          },
          {
            instruction_type: "environment_call",
            _text: stage.resources.environment_call || "none",
          },
          {
            instruction_type: "trap_return",
            _text: stage.resources.trap_return || "none",
          },
          {
            instruction_type: "integer_ALU",
            _text: stage.resources.integer_ALU || "none",
          },
          {
            instruction_type: "integer_MUL",
            _text: stage.resources.integer_MUL || "none",
          },
          {
            instruction_type: "integer_DIV",
            _text: stage.resources.integer_DIV || "none",
          },
          {
            instruction_type: "float_ALU",
            _text: stage.resources.float_ALU || "none",
          },
          {
            instruction_type: "float_MUL",
            _text: stage.resources.float_MUL || "none",
          },
          {
            instruction_type: "float_DIV",
            _text: stage.resources.float_DIV || "none",
          },
        ],
      })),
    };

    return {
      processor_specifications: {
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
        microarchitecture_specifications: {
          mode,
          resources,
          pipeline,
        },
      },
    };
  };

  const downloadXML = (xmlContent) => {
    const element = document.createElement("a");
    const file = new Blob([xmlContent], { type: "text/xml" });
    element.href = URL.createObjectURL(file);
    element.download = "isa_specifications.xml";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          onSubmit={(values) => {
            const isaJson = generateISAJson(values);
            console.log(JSON.stringify(isaJson, null, 2));
            const xml = json2xml(isaJson, { compact: true, spaces: 4 });
            downloadXML(xml);
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

                  <ResourceCard wordSize={parseInt(values.wordSize)} />

                  <PipelineCard />

                  <Button type="submit" variant="secondary">
                    Generate JSON
                  </Button>

                  <Button type="submit" variant="secondary">
                    Generate and Download XML
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
