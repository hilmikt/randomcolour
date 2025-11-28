// hooks/useContract.ts
"use client";

import { useState, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { contractABI, contractAddress } from "@/lib/contract";

export interface ContractData {
  colorsCount: number;
  lastColor: string | null;
}

export interface ContractState {
  isLoading: boolean;
  error: Error | null;
}

export interface ContractActions {
  getRandomColor: () => Promise<void>;
}

export const useWillContract = () => {
  const { address } = useAccount();
  const [lastColor, setLastColor] = useState<string | null>(null);

  const {
    data: colorsCountData,
    isLoading: isLoadingCount,
    error: colorsError,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getColorsCount",
    query: {
      enabled: !!address,
    },
  });

  const {
    refetch: refetchRandomColor,
    isLoading: isLoadingColor,
    error: randomColorError,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getRandomColor",
    query: {
      enabled: false,
    },
  });

  const getRandomColor = async () => {
    try {
      const result = await refetchRandomColor();
      if (result.data) {
        setLastColor(result.data as string);
      }
    } catch (err) {
      console.error("Error fetching random color:", err);
      throw err;
    }
  };

  const data: ContractData = {
    colorsCount: colorsCountData ? Number(colorsCountData as bigint) : 0,
    lastColor,
  };

  const actions: ContractActions = {
    getRandomColor,
  };

  const state: ContractState = useMemo(
    () => ({
      isLoading: isLoadingCount || isLoadingColor,
      error: (colorsError || randomColorError) as Error | null,
    }),
    [isLoadingCount, isLoadingColor, colorsError, randomColorError],
  );

  return {
    data,
    actions,
    state,
  };
};
