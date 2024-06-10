"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode } from "react";

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
