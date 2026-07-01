import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/misc/ReactQueryProvider";
import AuthSyncProvider from "@/components/misc/AuthSyncProvider";
import { AuthModalRenderer } from "@/components/TopBar/AuthModal";
import DodoProvider from "@/components/misc/DodoProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteToGo",
	description: "Capture, organize, and sync your notes seamlessly across devices with NoteToGo.",

	icons: {
		icon: "/icon.ico",
		apple: "/icon.ico",
	},

	openGraph: {
		title: "NoteToGo",
		description: "Capture, organize, and sync your notes seamlessly across devices with NoteToGo.",
		url: "https://notetogo.vercel.app",
		siteName: "NoteToGo",
		images: [
			{
				url: "/icon.png",
				width: 512,
				height: 512,
				alt: "NoteToGo",
			},
		],
		type: "website",
	},

	twitter: {
		card: "summary_large_image",
		title: "NoteToGo",
		description: "Capture, organize, and sync your notes seamlessly across devices with NoteToGo.",
		images: ["/icon.png"],
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden custom-scrollbar-2">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-sm:max-w-dvw`}
      >
				{/* <NavBar /> */}
				{/* <ReactQueryProvider> */}
					<AuthSyncProvider />
					{/* AuthModalRenderer uses useSearchParams(), which is only available on the client.
					Wrapping it in Suspense allows the rest of the layout to be prerendered while
					deferring the modal until the browser has access to the current URL. */}
					<Suspense fallback={null}>
						<AuthModalRenderer />
					</Suspense>
					<DodoProvider />
					{children}
				{/* </ReactQueryProvider> */}
      </body>
    </html>
  );
}
