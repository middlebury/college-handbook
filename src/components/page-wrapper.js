import React, { useEffect, useState, useRef } from "react";
import Layout from "./layout";
import Header from "./header";
import Navbar from "./navbar";
import SplitPane, {
    Divider,
    SplitPaneLeft,
    SplitPaneRight,
} from "./split-pane";
import CheckboxTree from 'react-checkbox-tree';
import { nodes } from '../data/handbook';
import { navigate } from 'gatsby';

const PageWrapper = (props) => {
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [page, setPage] = useState({});
    const [value, setValue] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const prevClass = useRef();
    let allNodes = Object.values(nodes);

    useEffect (() => {
        let url = window.location.href.split('/');
        let currentPageClass = url[url.length-1];
        let currentExpanded = url.slice(url.indexOf('pages')+1, (url.length === 5 ? url.length : url.length-1));
        let arr = [];
        let len = currentExpanded.length;
        let currentPage = {};

        if (url.length === 5) {
            currentPage.parent = {};
            currentPage.value = url.slice(url.indexOf('pages')+1, url.length).join('/');

            if( document.getElementsByClassName(currentPageClass)[0] !== undefined) {
                document.getElementsByClassName(currentPageClass)[0].children[0].children[2].classList.add("active");
            }

            setPage(currentPage);
            
        } else if (url.indexOf('pages') !== -1) {
            
            // Build array of expanded nodes
            for (var i = 0; i < len; i++) {
                arr.splice(0, 0, currentExpanded.join('/'));
                currentExpanded = currentExpanded.slice(0, currentExpanded.length-1);
            }
            
            // Find the selected page's parent in the nodes object
            for (var j = 0; j < len-1; j++) {
                allNodes = allNodes.find(element => element.value === arr[j]).children;
            }
            
            currentPage.parent = allNodes.find(element => element.value === arr[len-1]);
            currentPage.value = url.slice(url.indexOf('pages')+1, url.length).join('/');

            setPage(currentPage);

            if(arr) {
                setExpanded(arr);
            }
        }

        if(currentPageClass) {
            setCurrentClass(currentPageClass);
        }
    
    }, [])

    
    useEffect (() => {
        prevClass.current = currentClass;
    }, [currentClass])

    useEffect (() => {
        if(page.parent && expanded.includes(page.parent.value)) {
            let element = document.getElementsByClassName(currentClass)[0];
            if(element !== undefined) {
                element.children[0].children[2].classList.add("active");
            }
        }
    }, [expanded])

    useEffect (() => {
        if (value !== '') {
            handleClick(value);
        } else if (value === '/') {
            handleHighlight(value);
        } 
    }, [value])

    const handleHighlight = (className) => {
        if (prevClass.current !== "" && prevClass.current !== undefined && document.getElementsByClassName(prevClass.current)[0] !== undefined) {
            document.getElementsByClassName(prevClass.current)[0].children[0].children[2].classList.remove("active");
        }
        if( document.getElementsByClassName(className)[0] !== undefined) {
            document.getElementsByClassName(className)[0].children[0].children[2].classList.add("active");
        }

        if(className === "/") {
            setCurrentClass('');
            setPage({});
        } else {
            setCurrentClass(className);
        }
    }

    const handleClick = (value) => {
        let names = value.split('/');
        let className = names[names.length-1];
        handleHighlight(className);
    }

    return (
        <Layout title={props.path === '/' ? 'Middlebury\'s Mission Statement' : props.data.markdownRemark.frontmatter.title}>
            <div className="App">
                <Header />
                <Navbar 
                    page={page} 
                    value={value === '' ? page.value : value}
                    valueCallback={(value) => {setValue(value)}}
                />
                <SplitPane className="split-pane-row">
                    <SplitPaneLeft>
                        <CheckboxTree
                            nodes={nodes}
                            checked={checked}
                            expanded={expanded}
                            showNodeIcon={false}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            onClick={targetNode => {
                                navigate(`/pages/${targetNode.value}`);
                                setPage(targetNode);
                                setValue('');
                                handleClick(targetNode.value);
                            }}
                        />
                    </SplitPaneLeft>
                    <Divider className="separator-col" />
                    <SplitPaneRight>
                        {props.children}
                    </SplitPaneRight>
                </SplitPane>
            </div>
        </Layout>
  );
}

export default PageWrapper;