import Info from "@/components/Info";
import Opening from "@/components/Opening";
import SmoothScroll from "@/components/SmoothScroll";
import TopBar from "@/components/TopBar";

export default function Home() {

  return (
    <>
      <SmoothScroll>
				<TopBar />

				<Opening />

				<Info />

				<div className="h-dvh bg-neutral-900">

				</div>
      </SmoothScroll>
    </>
  );
}