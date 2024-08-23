module.exports = {
  pathPrefix: "",
  siteMetadata: {
    title: "Middlebury Handbook",
    description: "Middlebury Handbook",
  },
  
  plugins: [
    "gatsby-plugin-remove-fingerprints",
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              enableCustomId: true,
              icon: `<svg aria-hidden="true" height="0.75em" viewBox="0 0 16 16" version="1.1" width="0.75em" data-view-component="true" class="octicon octicon-link flex-shrink-0 mr-2"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>`,
              className: "anchor-link",
              isIconAfterHeader: true
            }
          },
          {
            resolve: 'gatsby-remark-find-replace',
            options: {
              // remove static from the start of links 
              replacements: {
                'static/': '/'
              },
              prefix: false,
            },
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "i-policies-for-all",
        path: `${__dirname}/content/i-policies-for-all`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "ii-ug-college-policies",
        path: `${__dirname}/content/ii-ug-college-policies`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "iii-policies-for-the-language-schools",
        path: `${__dirname}/content/iii-policies-for-the-language-schools`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "iv-policies-for-the-institute",
        path: `${__dirname}/content/iv-policies-for-the-institute`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "v-policies-for-schools-abroad",
        path: `${__dirname}/content/v-policies-for-schools-abroad`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "vi-policies-for-middlebury-institute-online",
        path: `${__dirname}/content/vi-policies-for-middlebury-institute-online`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "vi-handbook-archive",
        path: `${__dirname}/content/vi-handbook-archive`,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: {
          encode: "icase",
          async: false,
        },
        query: `
        {
          allMarkdownRemark {
            nodes {
              id
              frontmatter {
                slug
                title
              }
              excerpt
              rawMarkdownBody
              html
            }
          }
        }
        `,
        ref: "id",
        index: ["title", "body"],
        store: ["id", "slug", "title", "body", "excerpt", "html"],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: node.frontmatter.slug,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            excerpt: node.excerpt,
            html: node.html,
          })),
      },
    },
  ],
};
