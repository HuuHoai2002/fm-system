"use client";

import { Button } from "@nextui-org/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-3 flex flex-col gap-y-1 items-center justify-center">
      <h2 className="font-bold">
        Đã xảy ra lỗi khi tải trang. Vui lòng thử lại.
      </h2>
      <p>{error.message}</p>
      <Button onPress={() => reset()}>
        <span>Thử lại</span>
      </Button>
    </div>
  );
}
