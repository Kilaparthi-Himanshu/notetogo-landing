import { LightNote } from "./LightNote";

export default function SyncShowcase() {
	return (
		<section className='bg-change min-h-[100vh] max-md:min-h-max bg-neutral-900 flex max-md:flex-col p-2 py-14'>
			<LightNote width={400} height={300}>
				<div 
					className="absolute top-[35px] w-full h-[calc(100%-35px)] px-4 py-2 text-black text-wrap break-words text-lg"
				>
					<textarea defaultValue={"Hello"} className="overflow-auto w-full min-h-full outline-0 resize-none" data-lenis-prevent />
				</div>
			</LightNote>
		</section>
	);
}