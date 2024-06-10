// import type { Metadata } from "next";
import Navbar from "../component/Navbar";
// import "../../globals.css";

// export const metadata: Metadata = {
//   title: APP_NAME,
//   description: APP_DESCRIPTION,
// };

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}
