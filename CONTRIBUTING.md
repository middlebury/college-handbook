# How to contribute

## Directory structure

- The two main folders of this repo consist of `src` ("source") and `content` directories.
- `src` contains all the assets to build the frontend as well as the CMS and the `content` folder contains all the content of the college handbook pages in several markdown files.

  ### 1. Structure of the `src` folder
  Folder|Description
  ---|---
  cms | cms.js which contains the config to register a preview template for the markdown files in the CMS and register custom CKEditor 5 widget
  components | .js files which contain code to build the different componens for the handbook written in React, custom-editor-widget sub folder contains code for custom CKEditor 5 used in the CMS
  data | .js files which contain data about the different sections of the handbook and their subpages/subsections used to build the left hand menu of the handbook 
  static/admin | contains the config file for decamp CMS
  static/assets | PDF/Word documents linked in the handbook 


  ### 2. Structure of the `data` folder
  The files in this folder have semantic names according to their section name in the handbook. They contain an array of JSON objects describing the pages under that section and their hierarchy. 
  File|Section it pertains to
  ---|---
  i-policies-for-all.js | I. Middlebury-Wide Policies
  ii-ug-college-policies.js | II. Policies for the Undergraduate College
  iii-policies-for-the-language-schools.js | III. Policies for the Language Schools
  iv-policies-for-the-institute.js | IV. Policies for the Institute of International Studies
  v-policies-for-schools-abroad.js | V. Policies for Schools Abroad
  vi-policies-for-middlebury-institute-online.js | VI. Policies for Middlebury Institute Online
  vii-handbook-archive.js | Previous Handbooks

  This data is used by [`react-checkbox-tree`](https://github.com/jakezatecky/react-checkbox-tree?tab=readme-ov-file#node-properties) to build left hand menu.

  Each page or `node` has several properties that can be set as described here https://github.com/jakezatecky/react-checkbox-tree?tab=readme-ov-file#node-properties. 
  The four properties we are mainly concerned are desribed below with an example:
  ```js
  [
    {
      value: "i-policies-for-all", // the node's value, should contain path to the node
      label: "I. Middlebury-Wide Policies", // name displayed for the node in the menu
      className: "i-policies-for-all", // classname added to the button in the menu to allow adding css for button hover and focus states
      children: [ // children of the node if it has them, optional attributt
        {
          value: "i-policies-for-all/genl-principles/respectful-behavior",
          label: "A.1. Respectful Behavior",
          className: "respectful-behavior",
          // children: [], If sub nodes have further sub nodes add the children attribute here
        },
        // array of child nodes
      ]
    }
  ]
  ```

  ### 3. Structure of the `content` folder
  The `content` folder contains individual markdown (`.md`) files for each page in the college handbook except for the homepage. The names of `.md` files should be the same as the `value` set for the page in `data/`.

## Adding a new page to the handbook

1. Create a new branch `git branch <branch_name>` and then checkout the new branch with `git checkout <branch_name>`.
2. In `src/data`, go to the `.js` file of the appropriate section.
3. Find the place you need to add the new page data and add it as described in the [above section](#2-structure-of-the-data-folder). Make sure the classname is unique.
4. Then we need to add `.md` files for each new page. Follow the instructions according the type of page:

   There are two types of pages in the handbook: (i) pages with subpages, and (ii) pages without subpages.

   #### (i) For pages without subpages like [A.1. Respectful Behavior](https://handbook.middlebury.edu/pages/i-policies-for-all/genl-principles/respectful-behavior/): 
    * Create a `.md` file under the appropriate subfolder in the `content` folder. The path of the file will be the same as that specified as its `value` in `src/data/`.
    * In this case, the `value` is in `src/data/policies-for-all.js` on line 13: `value: "i-policies-for-all/genl-principles/respectful-behavior"`. The path of this file will then be `content/i-policies-for-all/genl-principles/respectful-behavior.md`.
    * The name of `.md` file will be `respectful-behavior`.
  
   #### (ii) For pages with subpages like [I. Middlebury-Wide Policies](https://handbook.middlebury.edu/pages/i-policies-for-all/):
    * In the `content` folder, make a subfolder with the name same as its `value` in `src/data/`.
    * In this case, you can find it in `src/data/policies-for-all.js` on line 3: `value: "i-policies-for-all"`.
    * Create the folder `content/i-policies-for-all`. 
    * The `.md` file for this page goes inside this folder with the same name. For this pages it will be `i-policies-for-all.md`.
    * The `.md` files for its subpages go inside this folder.

## Adding content in `.md` files
All the files need to have some required meta data as follows:
```md
---
slug: /pages/i-policies-for-all [path of the file which is its value appended with /pages/]
date: 2021-05-01 [date page is being added]
title: I. Middlebury-Wide Policies [Title of the page]
---
```
Add the page content under this section. 

## Testing the change
1. In the terminal, run `npm start`. This should build the pages and start the project.
2. You can view the test site at `localhost:8000`.
3. Check to see that the page you added is in the left hand menu. Clicking on it should highlight the button and load the page with the content you added for it.
4. Test the print and navigation buttons for the page.
5. For testing if the page appears correctly in the CMS, you need to commit the changes to github. Netlify hook should build a deploy preview for your commit, and you can test the changes in the CMS on Netlify.

## Submitting Changes

* Push all your changes to your branch.
* Submit a pull request to the repository.
