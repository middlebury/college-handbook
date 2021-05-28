import React, { useRef } from "react";
import { 
    FaFont, 
    FaPrint, 
    FaForward, 
    FaStepForward, 
    FaBackward, 
    FaStepBackward 
} from "react-icons/fa";
import SearchBar from "./search-bar";
import { navigate } from "gatsby";

const Navbar = (props) => {

    const fontSize = useRef(100);

    const parentObj = [
        {value: 'i-policies-for-all', label: 'I. Middlebury-Wide Policies', className: 'i-policies-for-all'},
        {value: 'ii-ug-college-policies', label: 'II. Policies for the Undergraduate College', className: 'ii-ug-college-policies'},
        {value: 'iii.-policies-for-the-language-schools', label: 'III. Policies for the Language Schools', className: 'iii.-policies-for-the-language-schools'},
        {value: 'iv.-policies-for-the-institute', label: 'IV. Policies for the Institute of International Studies', className: 'iv.-policies-for-the-institute'},
        {value: 'v-handbook_archive', label: 'Previous Handbooks', className: 'v-handbook_archive'}
    ];

    const handleClick = (e, button) => {
        e.preventDefault();
        
        if (props.page.parent) {
            let found = 0;
            let obj = props.page.parent.children || parentObj;
            let value = '';
            
            if (button === 'fast-backward') {
                value = obj[0].value;
            } else if (button === 'fast-forward') {
                value = obj[obj.length-1].value;
            } 
            else if (button === 'backward' || button === 'forward') {
                obj.find((ele, index) => {
                    if (ele.value === props.value)  {
                        found = index;
                    }; 
                });

                if (button === 'backward' && obj[found-1] !== undefined) {
                    value = obj[found-1].value; 
                } else if (button === 'forward' && obj[found+1] !== undefined) {
                    value = obj[found+1].value; 
                }
            } 

            if (value !== '') {
                navigate(`/pages/${value}`);
                props.valueCallback(value); 
            }
        }
    }

    const handlePrint = (e) => {
        e.preventDefault();

        let divText = document.getElementById('print-section').innerHTML;
        let myWindow = window.open('','PRINT','width=200,height=100');
        let doc = myWindow.document;
        doc.open();
        doc.write('<html><head><title>' + document.title  + '</title>');
        doc.write('</head><body >');
        if (props.printResults.length === 0) {
            doc.write(divText);
        } else {
            doc.write(props.printResults);
        }
        doc.write('</body></html>');
        doc.close();
        myWindow.focus(); // necessary for IE >= 10*/
    }

    const handleFont = (e, param) => {
        e.preventDefault();

        if (param === "increase") {
            if (fontSize.current < 160) {
                fontSize.current += 20;
                
            }
        } else if (param === "decrease") {
            if (fontSize.current > 80) {
                fontSize.current -= 20;
            }
        }
        document.getElementById('print-section').style.fontSize = `${fontSize.current}%`;
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__search-content">
                    <SearchBar 
                        localSearchPages={props.localSearchPages}
                        setResults={props.setResults}
                        valueCallback={props.valueCallback}
                    />
                    <h2 style={{color:'black'}} className="navbar__heading">
                        <button style={{cursor:'pointer', backgroundColor: '#fff', color: 'inherit', border: 'none', padding: '0', font: 'inherit'}} onClick={(e)=>{navigate('/'); props.valueCallback('/');}}>Middlebury College Handbook</button>
                    </h2>
                </div>
                <div className="navbar__buttons">
                    <button className="navbar__button" onClick={(e) => {handleFont(e, 'increase')}}>
                        <FaFont />
                        <span style={{margin:'0px', fontSize:'16pt', verticalAlign:'super'}}>+</span>
                    </button>
                    <button className="navbar__button" onClick={(e) => {handleFont(e, 'decrease')}}>
                        <FaFont />
                        <span style={{margin:'0px', fontSize:'16pt', verticalAlign:'super'}}>-</span>
                    </button>
                    <button className="navbar__button" onClick={handlePrint}>
                        <FaPrint />
                    </button>
                    <span style={{fontSize:'30px'}}>|</span>
                    <button className="navbar__button" onClick={(e) => handleClick(e, 'fast-backward')}>
                        <FaStepBackward />
                    </button>
                    <button className="navbar__button" onClick={(e) => handleClick(e, 'backward')}>
                        <FaBackward />
                    </button>
                    <button className="navbar__button" onClick={(e) => handleClick(e, 'forward')}>
                        <FaForward />
                    </button>
                    <button className="navbar__button" onClick={(e) => handleClick(e, 'fast-forward')}>
                        <FaStepForward />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;