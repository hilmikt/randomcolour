// components/sample.tsx
"use client";

import { useAccount } from "wagmi";
import { useWillContract } from "@/hooks/useContract";

const SampleIntregation = () => {
  const { isConnected } = useAccount();
  const { data, actions, state } = useWillContract();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Random Color Generator
          </h2>
          <p className="text-muted-foreground">
            Please connect your wallet to interact with the contract on Coston2.
          </p>
        </div>
      </div>
    );
  }

  const handleGenerateColor = async () => {
    try {
      await actions.getRandomColor();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const currentColorName = data.lastColor || "No color generated yet";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-foreground">
            Random Color Generator
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Simple on-chain color picker powered by a Solidity smart contract on
            Flare&apos;s Coston2 testnet.
          </p>
        </header>

        {/* Contract Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">
              Available Colors
            </p>
            <p className="text-2xl font-semibold text-foreground">
              {state.isLoading ? "Loading..." : data.colorsCount}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">
              Contract Network
            </p>
            <p className="text-sm font-medium text-foreground">
              Flare Coston2 Testnet
            </p>
          </div>
        </section>

        {/* Random Color Display */}
        <section className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Current Random Color
              </p>
              <p className="text-xl font-semibold text-foreground mt-1">
                {currentColorName}
              </p>
            </div>

            {/* Visual color preview if the string is a valid CSS color */}
            <div
              className="w-16 h-16 rounded-lg border border-border"
              style={{
                background:
                  data.lastColor && data.lastColor !== ""
                    ? data.lastColor
                    : "transparent",
              }}
            />
          </div>

          <button
            onClick={handleGenerateColor}
            disabled={state.isLoading}
            className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {state.isLoading ? "Generating..." : "Generate Random Color"}
          </button>
        </section>

        {/* Status / Errors */}
        {state.error && (
          <div className="mt-2 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">
              Error: {state.error.message}
            </p>
          </div>
        )}

        <section className="mt-4 text-xs text-muted-foreground">
          <p>
            Contract:{` `}
            <a
              href="https://coston2-explorer.flare.network/address/0x6bc4Af07B2aDbA143427B7E78Dbcc1d3E131c6EC"
              target="_blank"
              rel="noreferrer"
              className="underline break-all"
            >
              0x6bc4Af07B2aDbA143427B7E78Dbcc1d3E131c6EC
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default SampleIntregation;
