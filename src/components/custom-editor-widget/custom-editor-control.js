import React, { Component } from "react";
import { Helmet } from "react-helmet";
import ClassicEditor from "ckeditor5-custom-build";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export class CustomEditorControl extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  onChange = (event, editor) => {
    const data = editor.getData();
    console.log(this.props);
    this.props.onChange(data);
  }

  // componentDidMount() {
  //   let config = {};

  //   ClassicEditor
  //     .create( document.querySelector( '#editor' ), {
  //     } )
  //     .then( editor => {
  //       console.log( 'Editor was initialized', editor );
  //     } )
  //     .catch( err => {
  //       console.error( err.stack );
  //     } );
  // } 
  
  componentDidMount() {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

    // Get the header
    // var header = document.getElementsByClassName('ck-sticky-panel');
    var header = this.myRef.current.domContainer;
    // Get the offset position of the navbar
    var sticky = header.current.offsetTop;
    console.log(header);

    // console.log(this.myRef.current.domContainer);
    
    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      console.log(header.current.classList);
      if (window.pageYOffset > sticky) {
        header.current.classList.add("sticky");
      } else {
        header.current.classList.remove("sticky");
      }
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" href="/admin/cms.css" type="text/css"></link>
        </Helmet>
        <CKEditor
          editor={ ClassicEditor }
          config={{
            removePlugins: [ 'BlockQuote', 'EasyImage', 'ImageUpload', 'MediaEmbed' ],
          }}
          data={this.props.value}
          onChange={this.onChange} 
          ref={this.myRef}
        />
      </div>
      // <div id="editor">
      //   {console.log('hi')}
      // </div>
    );
  }

}

// export default CustomEditorControl;