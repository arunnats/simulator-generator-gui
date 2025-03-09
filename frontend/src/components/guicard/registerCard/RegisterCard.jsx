"use client";
import React from "react";
import { useFormikContext } from "formik";
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

export default function RegisterCard({ wordSize }) {
  const { values, setFieldValue } = useFormikContext();

  // Helper function to validate and handle numeric inputs
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
        <CardTitle>Registers</CardTitle>
        <CardDescription>Hover Over Field For Information.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Unprivileged Register File Section */}
        <div className="flex flex-col gap-4">
          <CardTitle>Unprivileged Register File</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register File Name"
                  value={
                    values.registers?.unprivilegedRegisterFile
                      ?.registerFileName || ""
                  }
                  onChange={(e) =>
                    setFieldValue(
                      "registers.unprivilegedRegisterFile.registerFileName",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the name of the unprivileged register file
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register Length"
                  value={
                    values.registers?.unprivilegedRegisterFile?.registerlen ||
                    ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.unprivilegedRegisterFile.registerlen",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the length of each register in bits
              </HoverCardContent>
            </HoverCard>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register Count"
                  value={
                    values.registers?.unprivilegedRegisterFile?.registerCount ||
                    ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.unprivilegedRegisterFile.registerCount",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the number of registers in this file
              </HoverCardContent>
            </HoverCard>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Data On Reset"
                  value={
                    values.registers?.unprivilegedRegisterFile?.dataOnReset ||
                    ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.unprivilegedRegisterFile.dataOnReset",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the value to set on reset
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Unprivileged Register Section */}
        <div className="flex flex-col gap-4">
          <CardTitle>Unprivileged Register</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard className="flex-1 w-full">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register Name"
                  value={
                    values.registers?.unprivilegedRegister?.registerName || ""
                  }
                  onChange={(e) =>
                    setFieldValue(
                      "registers.unprivilegedRegister.registerName",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the name of the unprivileged register
              </HoverCardContent>
            </HoverCard>
            <HoverCard className="flex-1 w-full">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register Length"
                  value={
                    values.registers?.unprivilegedRegister?.registerlen || ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.unprivilegedRegister.registerlen",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the length of the register in bits
              </HoverCardContent>
            </HoverCard>
            <HoverCard className="flex-1 w-full">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Data On Reset"
                  value={
                    values.registers?.unprivilegedRegister?.dataOnReset || ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.unprivilegedRegister.dataOnReset",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the value to set on reset
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Privileged Register File Section */}
        <div className="flex flex-col gap-4">
          <CardTitle>Privileged Register File</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register File Name"
                  value={
                    values.registers?.privilegedRegisterFile
                      ?.registerFileName || ""
                  }
                  onChange={(e) =>
                    setFieldValue(
                      "registers.privilegedRegisterFile.registerFileName",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the name of the privileged register file
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register Length"
                  value={
                    values.registers?.privilegedRegisterFile?.registerlen || ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.privilegedRegisterFile.registerlen",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the length of each register in bits
              </HoverCardContent>
            </HoverCard>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Register Count"
                  value={
                    values.registers?.privilegedRegisterFile?.registerCount ||
                    ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.privilegedRegisterFile.registerCount",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the number of registers in this file
              </HoverCardContent>
            </HoverCard>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Data On Reset"
                  value={
                    values.registers?.privilegedRegisterFile?.dataOnReset || ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "registers.privilegedRegisterFile.dataOnReset",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the value to set on reset
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
