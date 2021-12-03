import CMS from "netlify-cms-app";
import {
  CustomEditorControl,
  CustomEditorPreview,
} from "../components/custom-editor-widget";
import "../components/custom-editor-widget/ckeditor.css";
import React from "react";
import marked from "marked";

const collections = ["middlebury-wide", "undergraduate-college", "language-schools", "miis-policies", "previous-handbooks"];

CMS.registerWidget("CKEditor", CustomEditorControl, CustomEditorPreview);

collections.forEach((name) => {
  CMS.registerPreviewTemplate(name, ({ entry }) => {
    const { data } = entry.toJS();
    return (
      <div>
        <h2>{data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: marked(data.body) }} />
      </div>
    );
  })
});