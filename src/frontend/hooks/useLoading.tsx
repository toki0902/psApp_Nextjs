"use client";
import { useState } from "react";

const STATUS = {
  visible: "visible",
  hiding: "hiding",
  hidden: "hidden",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

const useLoading = ({
  initialStatus,
}: {
  initialStatus: "visible" | "hidden";
}) => {
  const [Status, setStatus] = useState<Status>(initialStatus);

  const changeStatus = () => {
    if (Status === STATUS.hidden) {
      setStatus(STATUS.visible);
      return;
    }
    if (Status === STATUS.visible) {
      setStatus(STATUS.hiding);
    }
  };

  const toVisible = () => {
    setStatus(STATUS.visible);
  };

  const toHiding = () => {
    setStatus(STATUS.hiding);
  };

  const hideLoading = () => {
    if (Status === STATUS.hiding) {
      setStatus(STATUS.hidden);
    }
  };

  return {
    status: Status,
    hideLoading,
    changeStatus,
    toVisible,
    toHiding,
  };
};

export default useLoading;
