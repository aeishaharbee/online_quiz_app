"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
