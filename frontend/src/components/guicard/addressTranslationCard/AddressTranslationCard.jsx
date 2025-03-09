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

export default function AddressTranslationCard({ wordSize }) {
  const { values, setFieldValue } = useFormikContext();

  // Helper function to validate and handle numeric inputs
  const handleBitIndexChange = (fieldName, value) => {
    // Ensure value is numeric and within range
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue === "" || parseInt(numericValue) >= 0) {
      setFieldValue(fieldName, numericValue);
    }
  };

  return (
    <Card className="flex flex-col w-[800px]">
      <CardHeader>
        <CardTitle>Address Translation</CardTitle>
        <CardDescription>Hover Over Field For Information.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {/* VA Section */}
          <div className="flex flex-col gap-4">
            <CardTitle>VA</CardTitle>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Length in Bits"
                  value={values.address_translation?.VA?.length_in_bits || ""}
                  onChange={(e) =>
                    handleBitIndexChange(
                      "address_translation.VA.length_in_bits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the length of Virtual Address in bits
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Guest PA Section */}
          <div className="flex flex-col gap-4">
            <CardTitle>Guest PA</CardTitle>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Length in Bits"
                  value={
                    values.address_translation?.guest_PA?.length_in_bits || ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "address_translation.guest_PA.length_in_bits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the length of Guest Physical Address in bits
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* PA Section */}
          <div className="flex flex-col gap-4">
            <CardTitle>PA</CardTitle>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Length in Bits"
                  value={values.address_translation?.PA?.length_in_bits || ""}
                  onChange={(e) =>
                    handleBitIndexChange(
                      "address_translation.PA.length_in_bits",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the length of Physical Address in bits
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          {/* Page Section */}
          <div className="flex flex-col gap-4">
            <CardTitle>Page</CardTitle>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Size in Bytes"
                  value={values.address_translation?.page?.size_in_bytes || ""}
                  onChange={(e) =>
                    handleBitIndexChange(
                      "address_translation.page.size_in_bytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>Enter the page size in bytes</HoverCardContent>
            </HoverCard>
          </div>

          {/* PTE Section */}
          <div className="flex flex-col gap-4">
            <CardTitle>PTE</CardTitle>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Size in Bytes"
                  value={values.address_translation?.PTE?.size_in_bytes || ""}
                  onChange={(e) =>
                    handleBitIndexChange(
                      "address_translation.PTE.size_in_bytes",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the Page Table Entry size in bytes
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          {/* Position of Guest PPN in PTE Section */}
          <div className="flex flex-col gap-4">
            <CardTitle>Position of Guest PPN in PTE</CardTitle>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Bit Index Lower"
                  value={
                    values.address_translation?.position_of_guest_PPN_in_PTE
                      ?.bit_index_lower || ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "address_translation.position_of_guest_PPN_in_PTE.bit_index_lower",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the lower bit index of the guest PPN in the PTE
              </HoverCardContent>
            </HoverCard>
          </div>
          {/* Position of PPN in PTE Section */}
          <div className="flex flex-col gap-4">
            <CardTitle>Position of PPN in PTE</CardTitle>
            <HoverCard className="flex-1">
              <HoverCardTrigger>
                <Input
                  type="text"
                  placeholder="Bit Index Lower"
                  value={
                    values.address_translation?.position_of_PPN_in_PTE
                      ?.bit_index_lower || ""
                  }
                  onChange={(e) =>
                    handleBitIndexChange(
                      "address_translation.position_of_PPN_in_PTE.bit_index_lower",
                      e.target.value
                    )
                  }
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter the lower bit index of the PPN in the PTE
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
