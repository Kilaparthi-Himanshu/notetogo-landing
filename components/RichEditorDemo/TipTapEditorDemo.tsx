import { EditorContent, useEditor, useEditorState } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';

import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';

import { TextStyle, Color } from "@tiptap/extension-text-style";
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import FontSize from "@tiptap/extension-font-size";

import TextAlign from '@tiptap/extension-text-align';

import Image from '@tiptap/extension-image';

import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import { Markdown } from 'tiptap-markdown';

import { common, createLowlight } from 'lowlight';
import MenuBar from './MenuBar';
import { rgbToHex } from '@/app/utils/colorFormatChange';

const ListItemWithStyle = ListItem.extend({
	addAttributes() {
		return {
			color: {
				default: null,
				parseHTML: element => element.style.color || null,
				renderHTML: attrs => {
					return attrs.color ? { style: `color: ${attrs.color}` } : {};
				},
			},

			fontSize: {
				default: null,
				parseHTML: element => {
					const size = element.style.fontSize;
					return size ? parseInt(size) : null;
				},
				renderHTML: attrs => {
					return attrs.fontSize
						? { style: `font-size: ${attrs.fontSize}px` } : {};
				},
			},
		};
	},
});

const lowlight = createLowlight(common);

export default function TipTapEditorDemo() {

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bold: false,
				italic: false,
				strike: false,
				bulletList: false,
				orderedList: false,
				undoRedo: false,
				listItem: false,
				codeBlock: false,
			}),
			TextStyle,
			FontSize.configure({
					types: ["textStyle"], // applies to textStyle mark
			}),
			BulletList.configure({
					HTMLAttributes: {
							class: `list-disc ml-4 ProseMirror`, // Tailwind: disc bullets + margin
					},
					keepMarks: true,
					keepAttributes: true,
			}),
			OrderedList.configure({
					HTMLAttributes: {
							class: `list-decimal ml-4 [&>ol]:ml-4 ProseMirror`, // Tailwind: numbered list + margin
					},
					keepMarks: true,
					keepAttributes: true,
			}), 
			ListItemWithStyle,
			Bold,
			Italic,
			Strike,
			Image.configure({
				resize: {
					directions: [
						'top-left',
						'top-right',
						'bottom-left',
						'bottom-right',
					],
					enabled: true,
					alwaysPreserveAspectRatio: true,
				},
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			FontFamily,
			Color.configure({
					types: ['textStyle'],
			}),
			Highlight,
			CodeBlockLowlight.configure({
				lowlight,
				enableTabIndentation: true,
				tabSize: 2,
				HTMLAttributes: {
					class: "hljs"
				}
			}),
		],
		content: `
			<h1 style="font-size:20px; color:white;">
				<u>✨ Meeting Notes</u>
			</h1>

			<p style="font-size:15px; color:white;">
				This is a <strong>powerful rich text editor</strong>
				with <mark>highlighting</mark>,
				custom styling,
				and formatting support.
			</p>

			<ul style="font-size:15px; color:white;">
				<li>Organized lists</li>
				<li>Code blocks</li>
				<li>Text alignment</li>
				<li>Font customization</li>
			</ul>

			<pre><code class="language-ts">const note = "Beautiful notes";
console.log(note);</code></pre>
			<br />
			<br />
		`,
		autofocus: false,
	});

	const editorState = useEditorState({
		editor,
		selector: ctx => {
	if (!ctx.editor) {
		return {
			fontSize: 16,
			fontFamily: "Inter",
			color: "#ffffff",
			canUndo: false,
			canRedo: false,
		};
	}

	const attrs = ctx.editor.getAttributes("textStyle");

	return {
		fontSize:
			typeof attrs.fontSize === "string"
				? parseInt(attrs.fontSize)
				: typeof attrs.fontSize === "number"
				? attrs.fontSize
				: 16,

		fontFamily: attrs.fontFamily ?? "Inter",

		color: attrs.color
			? rgbToHex(attrs.color)
			: "#ffffff",

		canUndo:
			ctx.editor.can().chain().focus().undo?.().run?.() ?? false,

		canRedo:
			ctx.editor.can().chain().focus().redo?.().run?.() ?? false,
	};
}
	});

	if (!editor) return null;

	return (
		<>
			<style>
				{`
					.hljs {
						// background: transparent !important;
					}

					pre.hljs {
						// background: transparent !important;
						padding: 14px 16px;
						border: 1px solid rgba(255,255,255,0.25);
						border-radius: 12px;
						margin: 8px 0;
						overflow-x: auto;
					}
				`}
			</style>

			<EditorContent 
				editor={editor}
				className={`size-full border-0 outline-0 relative`}
				data-lenis-prevent
				style={{
					minHeight: "100%",
					minWidth: "100%",
					overflowY: "auto",
				}}
			/>

			<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
				<MenuBar editor={editor} editorState={editorState} theme={"dark"} />
			</div>
		</>
	);
}