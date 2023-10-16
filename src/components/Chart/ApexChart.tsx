"use client";

import dynamic from "next/dynamic";
import { Props } from "react-apexcharts";

const Apex = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ApexChartProps extends Props {
  description?: string;
}

const ApexChart: React.FC<ApexChartProps> = ({
  title,
  description,
  ...props
}) => {
  return (
    <div className="w-full bg-white rounded-md overflow-hidden">
      <div className="flex flex-col gap-y-2 p-2 md:p-4">
        <span className="font-medium text-sm md:text-xl">{title}</span>
        <p>
          <span className="text-gray-500 text-sm md:text-base">
            {description}
          </span>
        </p>
      </div>
      <Apex {...props}></Apex>
    </div>
  );
};

export default ApexChart;
