import { Features } from "@/components/Features";
import Info from "@/components/Info";
import Opening from "@/components/Opening";
import SmoothScroll from "@/components/SmoothScroll";
import SyncShowcase from "@/components/SyncShowcase";
import TopBar from "@/components/TopBar";

export default function Home() {

  return (
    <>
      <SmoothScroll>
				<TopBar />

				<Opening />

				<Info />

				<Features />

				<SyncShowcase />
      </SmoothScroll>
    </>
  );
}