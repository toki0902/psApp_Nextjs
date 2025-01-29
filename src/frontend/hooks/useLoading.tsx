"use client";
import { useState } from "react";

import Loading from "../components/Loading";

const STATUS = {
  visible: "visible",
  hiding: "hiding",
  hidden: "hidden",
} as const;

type LoadingStatus = (typeof STATUS)[keyof typeof STATUS];

const useLoading = ({
  initialStatus,
}: {
  initialStatus: "visible" | "hidden";
}) => {
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatus>(initialStatus);

  const changeStatus = () => {
    if (loadingStatus === STATUS.hidden) {
      setLoadingStatus(STATUS.visible);
      return;
    }
    if (loadingStatus === STATUS.visible) {
      setLoadingStatus(STATUS.hiding);
    }
  };

  const toVisible = () => {
    setLoadingStatus(STATUS.visible);
  };

  const toHiding = () => {
    setLoadingStatus(STATUS.hiding);
  };

  const hideLoading = () => {
    if (loadingStatus === STATUS.hiding) {
      setLoadingStatus(STATUS.hidden);
    }
  };

  return {
    status: loadingStatus,
    hideLoading,
    changeStatus,
    toVisible,
    toHiding,
  };
};

export default useLoading;
