import React from "react";
import marked from "marked";

export const CustomEditorPreview = (props) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: marked(props.value) }} />
  );
}