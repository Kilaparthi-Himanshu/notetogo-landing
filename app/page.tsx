import Customization from "@/components/Customization";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import Info from "@/components/Info";
import Opening from "@/components/Opening";
import { Pricing } from "@/components/Pricing";
import RichTextShowcase from "@/components/RichTextShowcase";
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

				<RichTextShowcase />

				<Customization />

				<Pricing />

				<Footer />
      </SmoothScroll>
    </>
  );
}