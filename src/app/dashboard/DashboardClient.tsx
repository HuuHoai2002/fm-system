"use client";

import ApexChart from "@/components/Chart/ApexChart";
import BasicStatistic from "@/components/Chart/BasicStatistic";
import DashboardHeader from "@/components/Dashboard";
import Select from "@/components/Input/Select";
import useAuth from "@/hooks/use-auth";
import { ReportType, getStatistical } from "@/services/statistical.service";
import { Role } from "@/types/all";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import { HiOutlineLibrary } from "react-icons/hi";
import {
  HiClipboardDocument,
  HiClipboardDocumentList,
  HiUserPlus,
} from "react-icons/hi2";

const DashboardClient: React.FC = () => {
  const {} = useAuth({
    roles: [Role.ADMIN, Role.MANAGER],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const [query, setQuery] = React.useState<ReportType | "">("");

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["statistical", query],
    queryFn: () => getStatistical(query as ReportType),
    enabled: !!query,
  });

  return (
    <div>
      <div className="space-y-2 md:space-y-4">
        <DashboardHeader
          title="Báo Cáo Thống Kê"
          rightContent={
            <Select
              placeholder="Theo"
              defaultValue="today"
              onChange={(o) => setQuery(o.value as ReportType)}
              options={[
                { label: "Hôm nay", value: "today" },
                { label: "Tuần này", value: "week" },
                { label: "Tháng", value: "month" },
                { label: "Năm", value: "year" },
              ]}
              small
            />
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {isSuccess && (
            <>
              <BasicStatistic
                title="Phòng ban"
                content={data?.data?.reports?.departments || 0}
                icon={<HiOutlineLibrary size={30} className="text-green-400" />}
              />
              <BasicStatistic
                title="Người dùng"
                content={data?.data?.reports?.users || 0}
                icon={<HiUserPlus size={30} className="text-purple-400" />}
              />
              <BasicStatistic
                title="Mẫu đơn"
                content={data?.data?.reports?.forms || 0}
                icon={
                  <HiClipboardDocumentList size={30} className="text-red-400" />
                }
              />
              <BasicStatistic
                title="Phản hồi mẫu đơn"
                content={data?.data?.reports?.form_responses || 0}
                icon={
                  <HiClipboardDocument size={30} className="text-teal-400" />
                }
              />
            </>
          )}
          {isFetching && (
            <>
              <Skeleton className="h-[92px] w-full rounded-md" />
              <Skeleton className="h-[92px] w-full rounded-md" />
              <Skeleton className="h-[92px] w-full rounded-md" />
              <Skeleton className="h-[92px] w-full rounded-md" />
            </>
          )}
        </div>

        <div>
          <ApexChart
            title="Biểu đồ thống kê"
            description="Biểu đồ thống kê trong 7 ngày gần nhất"
            height={400}
            type="area"
            series={[
              {
                name: "Phòng ban",
                data: [31, 40, 28, 51, 42, 109, 100],
                color: "#4ade80",
              },
              {
                name: "Người dùng",
                data: [11, 32, 45, 32, 34, 52, 41],
                color: "#c084fc",
              },
              {
                name: "Mẫu đơn",
                data: [24, 41, 78, 37, 52, 91, 22],
                color: "#f87171",
              },
              {
                name: "Phản hồi mẫu đơn",
                data: [41, 32, 51, 42, 109, 100, 31],
                color: "#2dd4bf",
              },
            ]}
            options={{
              chart: {
                height: "100%",
                type: "area",
                toolbar: {
                  show: false,
                },
                width: "100%",
                sparkline: {
                  enabled: true,
                },
              },
              stroke: {
                curve: "smooth",
              },
              dataLabels: {
                enabled: false,
              },
              grid: {
                show: true,
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              xaxis: {
                labels: {
                  show: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
