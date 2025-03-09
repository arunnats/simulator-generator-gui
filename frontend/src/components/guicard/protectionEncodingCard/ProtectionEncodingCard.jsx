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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function ProtectionEncodingCard({ wordSize }) {
  const { values, setFieldValue } = useFormikContext();

  // Helper function to validate binary input
  const handleBinaryValueChange = (fieldName, value) => {
    // Only allow 0s and 1s
    if (/^[01]*$/.test(value)) {
      setFieldValue(fieldName, value);
    }
  };

  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader>
        <CardTitle>Protection Encodings</CardTitle>
        <CardDescription>
          Specify protection encodings for which memory access is not allowed
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldArray name="protectionEncodings">
          {({ remove, push }) => (
            <div className="flex flex-col gap-4">
              {values.protectionEncodings.map((encoding, index) => (
                <div
                  key={encoding.id}
                  className="flex flex-row gap-4 items-center"
                >
                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="flex items-center">
                        <span className="mr-2">Value:</span>
                        <Input
                          type="text"
                          placeholder="Protection Encoding Value"
                          value={values.protectionEncodings[index].value}
                          onChange={(e) =>
                            handleBinaryValueChange(
                              `protectionEncodings[${index}].value`,
                              e.target.value
                            )
                          }
                          className="w-[200px]"
                        />
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      Enter the binary value for protection encoding (0s and 1s
                      only)
                    </HoverCardContent>
                  </HoverCard>

                  <Button
                    type="button"
                    variant="destructive"
                    className="flex items-center p-2"
                    onClick={() => remove(index)}
                    disabled={values.protectionEncodings.length <= 1}
                  >
                    <Cross2Icon />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  push({
                    id: values.protectionEncodings.length + 1,
                    value: "",
                  })
                }
              >
                + Add Protection Encoding
              </Button>
            </div>
          )}
        </FieldArray>
      </CardContent>
    </Card>
  );
}
