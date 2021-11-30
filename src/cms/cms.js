import CMS from "netlify-cms-app";
import marked from "marked";
import { CustomEditorControl, CustomEditorPreview } from "../components/custom-editor-widget";
import "../components/custom-editor-widget/ckeditor.css"; 

CMS.registerEditorComponent({
  // Internal id of the component
  id: "table",
  // Visible label
  label: "Table",
  // Fields the user need to fill out when adding an instance of the component
  widget: 'object',
  fields: [
    {
      label: "Outline", 
      name: "outline", 
      widget: "boolean", 
      default: false
    },
    {
      label: 'Rows',
      name: 'row',
      widget: 'list',
      summary: 'Row Data',
      fields: [
        {
          label: 'Row Cells',
          name: 'row_cell',
          widget: 'list',
          fields: [
            {
              label: 'Cell',
              name: 'cell',
              widget: 'markdown',
              editor_components: [],
              modes:['rich_text'],
              minimal: true,
              buttons: ['bold', 'italic', 'link', 'bulleted-list', 'numbered-list'],
            }
          ]
        }
      ]
    }
  ],

  // Regex pattern used to search for instances of this block in the markdown document.
  // Patterns are run in a multline environment (against the entire markdown document),
  // and so generally should make use of the multiline flag (`m`). If you need to capture
  // newlines in your capturing groups, you can either use something like
  // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
  // which will cause `(.*)` to match newlines as well.
  //
  // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
  // `(.*?)` vs `(.*)`), especially if matching against newline characters.
  pattern: /^<table.*?(?:border=\"(.*?)\")?>$\n\n(.*?)\n\n^<\/table>$/ms,
  // Given a RegExp Match object
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
  // return an object with one property for each field defined in `fields`.
  //
  // This is used to populate the custom widget in the markdown editor in the CMS.
  fromBlock: function(match) {
    var table = {
      outline: match[1] ? (match[1] === "0" ? false : true) : false,
      row: []
    }
    var row = {
      row_cell: []
    }
    let rows = match[0].match(/<tr.*?>\n\n(.*?)\n\n<\/tr>/mgs);
    rows?.forEach((ele) => {
      let data = ele.match(/<td.*?>\n\n(.*?)\n\n<\/td>/mgs);
      data?.forEach((ele) => {
        row.row_cell.push({cell: `${ele.match(/<td.*?>\n\n(.*?)\n\n<\/td>/ms)[1]}`});
      });
      table.row.push(row);
      row = {
        row_cell: []
      }
    });
    return table;
  },
  // Given an object with one property for each field defined in `fields`,
  // return the string you wish to be inserted into your markdown.
  //
  // This is used to serialize the data from the custom widget to the
  // markdown document
  toBlock: function(data) {
    let table_cell='';
    let table_row='';
    let table = '';
    data.row?.forEach((ele) => {
      ele?.row_cell?.forEach(({ cell }) => {
        table_cell = data.outline ? `<td style="border:1px solid #000000">\n\n${cell}\n\n</td>\n` : `<td>\n\n${cell}\n\n</td>\n`;
        table_row = table_row + table_cell; 
      });
      table = table + `<tr>\n\n${table_row}\n\n</tr>\n`;
      table_row='';
    })
    return`${data.outline ? '<table border="2">': '<table>'}

<tbody>

${table}

</tbody>

</table>`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(data) {
    let table_cell='';
    let table_row='';
    let table = '';
    data.row?.forEach((ele) => {
      ele?.row_cell?.forEach(({ cell }) => {
        table_cell = cell ? (data.outline ? `<td style="border:1px solid #000000">\n\n${cell}\n\n</td>\n` : `<td>\n\n${marked(cell)}\n\n</td>\n`) : `<td></td>\n`;
        table_row = table_row + table_cell; 
      });
      table = table + `<tr>\n\n${marked(table_row)}\n\n</tr>\n`;
      table_row='';
    })
    return`${data.outline ? '<table border="2">': '<table>'}

<tbody>

${table}

</tbody>

</table>`;
  }
});

CMS.registerWidget('myWidget', CustomEditorControl, CustomEditorPreview);

// window.onscroll = function() {console.log('hi')};

console.log(CMS);

document.addEventListener('scroll', function(e) {
  console.log(e);
});

// var CategoriesControl = createClass({
//   handleChange: function(e) {
//     const separator = this.props.field.get('separator', ', ')
//     this.props.onChange(e.target.value.split(separator).map((e) => e.trim()));
//   },

//   render: function() {
//     const separator = this.props.field.get('separator', ', ');
//     var value = this.props.value;
//     return h('input', {
//       id: this.props.forID,
//       className: this.props.classNameWrapper,
//       type: 'text',
//       value: value ? value.join(separator) : '',
//       onChange: this.handleChange,
//     });
//   },
// });

// var CategoriesPreview = createClass({
//   render: function() {
//     return h('ul', {},
//       this.props.value.map(function(val, index) {
//         return h('li', {key: index}, val);
//       })
//     );
//   }
// });

// var schema = {
//   properties: {
//     separator: { type: 'string' },
//   },
// }

// CMS.registerWidget('categories', CategoriesControl, CategoriesPreview, schema);