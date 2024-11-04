import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {
	ClassicEditor,
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
	Table,
	TableToolbar,
	Undo
} from 'ckeditor5';
import { CKEditor } from "@ckeditor/ckeditor5-react";

// import 'ckeditor5/ckeditor5.css';

export class CustomEditorControl extends Component {
  onChange = (event, editor) => {
    const data = editor.getData();
    this.props.onChange(data);
  }

  render() {
    const editorConfig = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'horizontalLine',
          'insertTable',
          '|',
          'indent',
          'outdent'
        ],
        shouldNotGroupWhenFull: false
      },
      plugins: [
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
  
      placeholder: 'Type or paste your content here.',
      table: {
        contentToolbar: ['tableRow']
      }
    };

    return (
      <div>
        <Helmet>
          <link rel="preload" href="https://cdn.ckeditor.com/ckeditor5/43.3.0/ckeditor5.css" />
          <link rel="preload" href="/admin/cms.css" type="text/css" />
          <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/43.3.0/ckeditor5.css" />
          <link rel="stylesheet" href="/admin/cms.css" type="text/css" />
        </Helmet>
        <CKEditor
          editor={ ClassicEditor }
          config={editorConfig}
          data={this.props.value}
          onChange={this.onChange}
        />
      </div>
    );
  }

}