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

export default function ProtectionTableCard({ wordSize }) {
  const { values, setFieldValue } = useFormikContext();

  // Helper function to validate numeric inputs
  const handleNumericInputChange = (fieldName, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setFieldValue(fieldName, numericValue);
  };

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
        <CardTitle>Protection Table</CardTitle>
        <CardDescription>
          Specify protection table configuration and encoding ranges
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Protection Table Configuration */}
        <div className="flex flex-col gap-4">
          <CardTitle>Protection Table Configuration</CardTitle>
          <div className="flex flex-row gap-4">
            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Protection Table Name"
                  value={values.protectionTable?.tableName || ""}
                  onChange={(e) =>
                    setFieldValue("protectionTable.tableName", e.target.value)
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the name of the protection table
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Encoding Length in Bits"
                  value={values.protectionTable?.encodingLengthInBits || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "protectionTable.encodingLengthInBits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the length of protection encoding in bits
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Encoding Count"
                  value={values.protectionTable?.encodingCount || ""}
                  onChange={(e) =>
                    handleNumericInputChange(
                      "protectionTable.encodingCount",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the count of protection encodings
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Protection Encoding Ranges */}
        <div className="flex flex-col gap-4">
          <CardTitle>Protection Encoding Ranges</CardTitle>
          <FieldArray name="protectionTable.encodings">
            {({ remove, push }) => (
              <div className="flex flex-col gap-4">
                {values.protectionTable?.encodings?.map((encoding, index) => (
                  <div
                    key={encoding.id}
                    className="flex flex-row gap-4 items-center"
                  >
                    <HoverCard>
                      <HoverCardTrigger>
                        <Input
                          type="text"
                          placeholder="From"
                          value={encoding.from}
                          onChange={(e) =>
                            handleNumericInputChange(
                              `protectionTable.encodings[${index}].from`,
                              e.target.value
                            )
                          }
                          className="w-[120px]"
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        Enter the starting index of the range
                      </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                      <HoverCardTrigger>
                        <Input
                          type="text"
                          placeholder="To"
                          value={encoding.to}
                          onChange={(e) =>
                            handleNumericInputChange(
                              `protectionTable.encodings[${index}].to`,
                              e.target.value
                            )
                          }
                          className="w-[120px]"
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        Enter the ending index of the range
                      </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex items-center">
                          <span className="mr-2">0b</span>
                          <Input
                            type="text"
                            placeholder="Value"
                            value={encoding.value}
                            onChange={(e) =>
                              handleBinaryValueChange(
                                `protectionTable.encodings[${index}].value`,
                                e.target.value
                              )
                            }
                            className="w-[120px]"
                          />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        Enter the binary value for protection encoding (0s and
                        1s only)
                      </HoverCardContent>
                    </HoverCard>

                    <Button
                      type="button"
                      variant="destructive"
                      className="flex items-center p-2"
                      onClick={() => remove(index)}
                      disabled={values.protectionTable.encodings.length <= 1}
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
                      id: values.protectionTable.encodings.length + 1,
                      from: "",
                      to: "",
                      value: "",
                    })
                  }
                >
                  + Add Protection Encoding Range
                </Button>
              </div>
            )}
          </FieldArray>
        </div>
      </CardContent>
    </Card>
  );
}
