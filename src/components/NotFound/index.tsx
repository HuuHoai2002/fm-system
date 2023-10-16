"use client";

import { appLinks } from "@/config/app.config";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">
            404
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Không tìm thấy trang
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Trang bạn đang tìm kiếm không tồn tại.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Quay lại</span>
            </button>

            <button
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              onClick={() => router.push(appLinks.home)}
            >
              <span>Trang chủ</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
