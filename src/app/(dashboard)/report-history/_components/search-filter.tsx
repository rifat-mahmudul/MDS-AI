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

const SearchFilter = () => {
  const { searchTerm, setSearchTerm } = useSearchFilter();

  return (
    <div className="flex items-center justify-between">
      <SearchInput
        className="w-[400px] h-[50px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none bg-[#eaeaea]"
        placeholder="Search by Session ID or Date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex items-center gap-5">
        <Select>
          <SelectTrigger className="w-[180px] bg-[#eaeaea] focus:ring-0 h-[50px]">
            <SelectValue placeholder="All Reports" />
          </SelectTrigger>
          <SelectContent className="bg-[#eaeaea]">
            <SelectGroup>
              <SelectItem value="all-reports" className="cursor-pointer">
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

        <Select>
          <SelectTrigger className="w-[180px] bg-[#eaeaea] focus:ring-0 h-[50px]">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent className="bg-[#eaeaea]">
            <SelectGroup>
              <SelectItem value="today" className="cursor-pointer">
                Today
              </SelectItem>
              <SelectItem value="3-days" className="cursor-pointer">
                Last 3 days
              </SelectItem>
              <SelectItem value="7-day" className="cursor-pointer">
                7 days
              </SelectItem>
              <SelectItem value="2-weeks" className="cursor-pointer">
                2 weeks
              </SelectItem>
              <SelectItem value="1-month" className="cursor-pointer">
                1 month
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;
