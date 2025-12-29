"use client";
import CustomPagination from "@/components/shared/custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

// Session data type interface
interface SessionData {
  _id: string;
  score: number;
  riskLevel: string;
  summaryReview: string;
  createdAt: string;
  aiRaw?: {
    scores?: {
      documentation_quality?: number;
      consistency_score?: number;
      compliance_score?: number;
      risk_level?: string;
    };
  };
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SessionData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
  };
}

const SessionTable = () => {
  const tableHeaderClass = "text-center text-white font-medium";
  const tableRowClass = "h-[50px] text-center opacity-70 font-medium";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const status = session?.status;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["session-data", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/session?page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch sessions");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!token && status === "authenticated",
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getSessionId = (id: string) => {
    return `SES-${id.slice(-6).toUpperCase()}`;
  };

  const truncateSummary = (text: string, maxLength: number = 100) => {
    if (!text) return "No summary available";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const getScore = (session: SessionData) => {
    if (session.aiRaw?.scores?.documentation_quality !== undefined) {
      return session.aiRaw.scores.documentation_quality;
    }
    return session.score;
  };

  const getRiskLevelStyles = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case "high":
        return "px-6 py-2 bg-red-100 text-red-800 font-bold rounded-md";
      case "medium":
        return "px-6 py-2 bg-yellow-100 text-yellow-800 font-bold rounded-md";
      case "low":
        return "px-6 py-2 bg-green-100 text-green-800 font-bold rounded-md";
      default:
        return "px-6 py-2 bg-gray-100 text-gray-800 font-bold rounded-md";
    }
  };

  const formatRiskLevel = (riskLevel: string) => {
    if (!riskLevel) return "Unknown";
    return riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell className={tableRowClass}>
          <Skeleton className="h-6 w-32 mx-auto" />
        </TableCell>
        <TableCell className={tableRowClass}>
          <Skeleton className="h-6 w-28 mx-auto" />
        </TableCell>
        <TableCell className={tableRowClass}>
          <Skeleton className="h-6 w-40 mx-auto" />
        </TableCell>
        <TableCell className={tableRowClass}>
          <Skeleton className="h-6 w-16 mx-auto" />
        </TableCell>
        <TableCell className={tableRowClass}>
          <Skeleton className="h-9 w-24 mx-auto" />
        </TableCell>
        <TableCell className={tableRowClass}>
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages =
    data?.meta?.totalPages ||
    Math.ceil((data?.meta?.total || 0) / itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-primary hover:bg-primary/90 h-[50px]">
            <TableRow>
              <TableHead className={`${tableHeaderClass}`}>
                Session ID
              </TableHead>
              <TableHead className={`${tableHeaderClass}`}>Date</TableHead>
              <TableHead className={`${tableHeaderClass}`}>
                Summary Preview
              </TableHead>
              <TableHead className={`${tableHeaderClass}`}>Score</TableHead>
              <TableHead className={`${tableHeaderClass}`}>
                Risk Level
              </TableHead>
              <TableHead className={`${tableHeaderClass}`}>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || status === "loading" ? (
              renderSkeletonRows()
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="text-red-500 font-medium">
                    Error loading sessions. Please try again.
                  </div>
                </TableCell>
              </TableRow>
            ) : !data?.data || data.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="text-gray-500 font-medium">
                    No sessions found.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((session) => (
                <TableRow key={session._id}>
                  <TableCell
                    className={`${tableRowClass} text-primary font-semibold opacity-100`}
                  >
                    {getSessionId(session._id)}
                  </TableCell>
                  <TableCell className={`${tableRowClass}`}>
                    {formatDate(session.createdAt)}
                  </TableCell>
                  <TableCell className={`${tableRowClass} max-w-[200px] px-4`}>
                    <div className="truncate" title={session.summaryReview}>
                      {truncateSummary(session.summaryReview)}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`${tableRowClass} font-bold opacity-100`}
                  >
                    {getScore(session) || "N/A"}
                  </TableCell>
                  <TableCell className={`${tableRowClass}`}>
                    <button className={getRiskLevelStyles(session.riskLevel)}>
                      {formatRiskLevel(session.riskLevel)}
                    </button>
                  </TableCell>
                  <TableCell
                    className={`${tableRowClass} opacity-100 flex items-center justify-center gap-4`}
                  >
                    <button
                      onClick={() => {
                        console.log("View session:", session._id);
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Eye className="h-6 w-6 text-primary" />
                    </button>
                    <button
                      onClick={() => {
                        console.log("Download session:", session._id);
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Download className="h-5 w-5 text-primary" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && data?.meta && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="opacity-60">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, data.meta.total)} of{" "}
              {data.meta.total} results
            </h1>
          </div>

          <div>
            <CustomPagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionTable;
