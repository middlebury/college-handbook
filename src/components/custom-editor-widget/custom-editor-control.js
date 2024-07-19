import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Ckeditor from "./ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export class CustomEditorControl extends Component {
  onChange = (event, editor) => {
    const data = editor.getData();
    this.props.onChange(data);
  }

  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" href="/admin/cms.css" type="text/css"></link>
        </Helmet>
        <CKEditor
          editor={ Ckeditor }
          config={{
            removePlugins: [ 'BlockQuote', 'EasyImage', 'ImageUpload', 'MediaEmbed' ],
            heading: {
              options: [
                  { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                  { model: 'heading2', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading2' },
                  { model: 'heading3', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading3' },
                  { model: 'heading4', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading4' },
                  { model: 'heading5', view: 'h5', title: 'Heading 4', class: 'ck-heading_heading5' }
              ]
            }
          }}
          data={this.props.value}
          onChange={this.onChange}
        />
      </div>
    );
  }

}