import type { Metadata } from "next";
import THIPClient from "./THIPClient";

export const metadata: Metadata = {
  title: "The Human Intelligence Project",
};

export default function THIPPage() {
  return <THIPClient />;
}
