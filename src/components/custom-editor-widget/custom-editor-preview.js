import React from "react";
import marked from "marked";

export const CustomEditorPreview = (props) => {
  console.log(props);
  return (
    <div dangerouslySetInnerHTML={{ __html: marked(props.value) }} />
  );
}

// export default CustomEditorPreview;