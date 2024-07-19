import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	Autosave,
	Bold,
	Essentials,
	Heading,
	HorizontalLine,
	Indent,
	Italic,
	Link,
	List,
	Markdown,
	Paragraph,
	SelectAll,
	Table,
	TableToolbar,
	Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './ckeditor.css';

export default function Ckeditor() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'selectAll',
				'|',
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'horizontalLine',
				'link',
				'insertTable',
				'|',
				'bulletedList',
				'numberedList',
				'indent',
				'outdent',
				'|',
				'accessibilityHelp'
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			Autosave,
			Bold,
			Essentials,
			Heading,
			HorizontalLine,
			Indent,
			Italic,
			Link,
			List,
			Markdown,
			Paragraph,
			SelectAll,
			Table,
			TableToolbar,
			Undo
		],
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},

		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		placeholder: 'Type or paste your content here!',
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
		}
	};

	return (
		<div>
			<div className="main-container">
				<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
					<div className="editor-container__editor">
						<div ref={editorRef}>{isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
