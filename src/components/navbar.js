import React, { useRef } from "react";
import {
  FaFont,
  FaPrint,
  FaForward,
  FaStepForward,
  FaBackward,
  FaStepBackward,
  FaInfoCircle,
  FaRegCheckSquare
} from "react-icons/fa";
import { SearchBar, SearchBarPresentation } from "./search-bar";
import { navigate } from "gatsby";

const Navbar = (props) => {
  const fontSize = useRef(100);

  const parentObj = [
    {
      value: "i-policies-for-all",
      label: "I. Middlebury-Wide Policies",
      className: "i-policies-for-all",
    },
    {
      value: "ii-ug-college-policies",
      label: "II. Policies for the Undergraduate College",
      className: "ii-ug-college-policies",
    },
    {
      value: "iii-policies-for-the-language-schools",
      label: "III. Policies for the Language Schools",
      className: "iii-policies-for-the-language-schools",
    },
    {
      value: "iv-policies-for-the-institute",
      label: "IV. Policies for the Institute of International Studies",
      className: "iv-policies-for-the-institute",
    },
    {
      value: "v-handbook-archive",
      label: "Previous Handbooks",
      className: "v-handbook-archive",
    },
  ];

  const handleClick = (e, button) => {
    e.preventDefault();

    if (props.page.parent) {
      let found = 0;
      let obj = props.page.parent.children || parentObj;
      let value = "";

      if (button === "fast-backward") {
        value = obj[0].value;
      } else if (button === "fast-forward") {
        value = obj[obj.length - 1].value;
      } else if (button === "backward" || button === "forward") {
        obj.find((ele, index) => {
          if (ele.value === props.value) {
            found = index;
          }
        });

        if (button === "backward" && obj[found - 1] !== undefined) {
          value = obj[found - 1].value;
        } else if (button === "forward" && obj[found + 1] !== undefined) {
          value = obj[found + 1].value;
        }
      }

      if (value !== "") {
        navigate(`/pages/${value}`);
        props.valueCallback(value);
      }
    }
  };

  const handlePrint = (e) => {
    e.preventDefault();

    let divText = document.getElementById("print-section").innerHTML;
    let myWindow = window.open("", "PRINT", "width=200,height=100");
    let doc = myWindow.document;
    doc.open();
    doc.write("<html><head><title>" + document.title + "</title>");
    doc.write("</head><body >");
    if (props.printResults.length === 0) {
      doc.write(divText);
    } else {
      doc.write(props.printResults);
    }
    doc.write("</body></html>");
    doc.close();
    myWindow.focus(); // necessary for IE >= 10*/
    myWindow.print();
  };

  const handleFontSize = (e, param) => {
    e.preventDefault();

    if (param === "increase") {
      if (fontSize.current < 160) {
        fontSize.current += 20;
      }
    } else if (param === "decrease") {
      if (fontSize.current > 60) {
        fontSize.current -= 20;
      }
    }
    
    const element = document.getElementById("print-section");
    if (fontSize.current === 100) {
        element.classList.add("print-section__font-size");
    } else {
        element.classList.remove("print-section__font-size");
    }
    element.style.fontSize = `${fontSize.current}%`;
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__search-content">
          {props.index !== "" ? (
            <SearchBar
              index={props.index}
              store={props.store}
              setResults={props.setResults}
              valueCallback={props.valueCallback}
              handleSubmitToggle={props.handleSubmitToggle}
              setHandleSubmitToggle={props.setHandleSubmitToggle}
            />
          ) : (
            <SearchBarPresentation />
          )}
        </div>
        <div className="navbar__buttons">
          <button
            aria-label="Skip to first page"
            className="navbar__button"
            onClick={(e) => handleClick(e, "fast-backward")}
            title="First"
          >
            <FaStepBackward />
          </button>
          <button
            aria-label="Previous Page"
            className="navbar__button"
            onClick={(e) => handleClick(e, "backward")}
            title="Previous"
          >
            <FaBackward />
          </button>
          <button
            aria-label="Next Page"
            className="navbar__button"
            onClick={(e) => handleClick(e, "forward")}
            title="Next"
          >
            <FaForward />
          </button>
          <button
            aria-label="Skip to last page"
            className="navbar__button"
            onClick={(e) => handleClick(e, "fast-forward")}
            title="Last"
          >
            <FaStepForward />
          </button>
          <span style={{ fontSize: "28px" }}>|</span>
          <button
            aria-label="Text Zoom In"
            className="navbar__button"
            onClick={(e) => {
              handleFontSize(e, "increase");
            }}
            title="Increase Font Size"
          >
            <FaFont />
            <span
              style={{
                margin: "0px",
                fontSize: "12pt",
                verticalAlign: "super",
              }}
            >
              +
            </span>
          </button>
          <button
            aria-label="Text Zoom Out"
            className="navbar__button"
            onClick={(e) => {
              handleFontSize(e, "decrease");
            }}
            title="Decrease Font Size"
          >
            <FaFont />
            <span
              style={{
                margin: "0px",
                fontSize: "16pt",
                verticalAlign: "super",
              }}
            >
              -
            </span>
          </button>
          <button
            aria-label="Print Page"
            className="navbar__button"
            onClick={handlePrint}
            title="Print"
          >
            <FaPrint />
            <span
              className="tooltip"
              style={{
                margin: "0px",
                fontSize: "9pt",
                verticalAlign: "super",
                paddingLeft: "5px"
              }}
            >
              <FaInfoCircle />
              <span class="tooltiptext">
                <ul class="tooltiptext__list">
                  <li>To print the current page, click the print &nbsp;<FaPrint />&nbsp; icon.</li>
                  <li>To print multiple pages, select the checkboxes &nbsp;<FaRegCheckSquare />&nbsp; in the left pane (or in the page menu below on mobile) for the pages you want to print and click the print &nbsp;<FaPrint />&nbsp; icon.</li>
                </ul>
              </span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
