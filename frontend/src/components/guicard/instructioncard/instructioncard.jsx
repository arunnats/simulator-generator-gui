"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InstructionCard({ instNo, wordSize }) {
  const [isOpen, setIsOpen] = useState(false);

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
              {" "}
              <CardTitle>Instruction Field Range 1</CardTitle>
              <div className="flex flex-row gap-4">
                {" "}
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Bit Index Upper" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Value" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <CardTitle>Instruction Field Range 2</CardTitle>
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Bit Index Upper" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Value" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <CardTitle>Instruction Field Range 3</CardTitle>
              <div className="flex flex-row gap-4">
                {" "}
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Bit Index Lower" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Bit Index Upper" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Input type="email" placeholder="Value" />
                  </HoverCardTrigger>
                  <HoverCardContent>Add Desc</HoverCardContent>
                </HoverCard>
              </div>
            </div>
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

            {/* <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-[350px] mb-2"
            >
              <div className="flex items-center space-x-4 ">
                <CardTitle>RS1</CardTitle>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isOpen ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}{" "}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  @stitches/react
                </div>
              </CollapsibleContent>
            </Collapsible> */}
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
