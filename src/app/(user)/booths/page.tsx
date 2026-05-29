"use client";

import React, { Suspense } from "react";
import BoothsPageContent from "./_components/BoothsPageContent";
import { Loader2 } from "lucide-react";

export default function BoothsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full mt-10 px-8">
          <Loader2 className="h-8 w-8 animate-spin text-custom-blue" />
        </div>
      }
    >
      <BoothsPageContent />
    </Suspense>
  );
}
