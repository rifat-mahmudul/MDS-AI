"use client";
import { SearchInput } from "@/components/ui/search-input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchFilter } from "./zustand/useSearchFilter";

const dateRangeOptions = [
  { value: "today", label: "Today" },
  { value: "3-days", label: "Last 3 days" },
  { value: "7-days", label: "Last 7 days" },
  { value: "2-weeks", label: "Last 2 weeks" },
  { value: "1-month", label: "Last 1 month" },
  { value: "3-months", label: "Last 3 months" },
  { value: "all", label: "All Time" },
];

const SearchFilter = () => {
  const {
    searchTerm,
    riskLevel,
    setSearchTerm,
    setRiskLevel,
    dateRange,
    setDateRange,
  } = useSearchFilter();

  return (
    <div className="flex items-center justify-between">
      <SearchInput
        className="w-[400px] h-[50px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none bg-[#eaeaea]"
        placeholder="Search by Session ID or Date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex items-center gap-5">
        <Select
          value={riskLevel || "all"}
          onValueChange={(value) => setRiskLevel(value === "all" ? "" : value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px] bg-[#eaeaea] focus:ring-0 h-[50px]">
            <SelectValue placeholder="All Reports" />
          </SelectTrigger>
          <SelectContent className="bg-[#eaeaea]">
            <SelectGroup>
              <SelectItem value="all" className="cursor-pointer">
                All Reports
              </SelectItem>
              <SelectItem value="low" className="cursor-pointer">
                Low
              </SelectItem>
              <SelectItem value="medium" className="cursor-pointer">
                Medium
              </SelectItem>
              <SelectItem value="high" className="cursor-pointer">
                High
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={dateRange}
          onValueChange={setDateRange}
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px] bg-[#eaeaea] focus:ring-0 h-[50px]">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent className="bg-[#eaeaea]">
            <SelectGroup>
              {dateRangeOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;
