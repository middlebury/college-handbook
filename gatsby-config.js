module.exports = {
  siteMetadata: {
    title: `Middlebury College Handbook`,
    description: `This 2019-2020 Handbook supersedes previous editions of the College, Institute, and Language Schools Handbooks as of its online publication date.  Section I applies to all students, faculty and staff of Middlebury programs, while other sections may apply only to specific populations, such as students in a particular program.`,
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    "gatsby-plugin-mdx",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "i-policies-for-all",
        path: `${__dirname}/content/i-policies-for-all`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "ii-ug-college-policies",
        path: `${__dirname}/content/ii-ug-college-policies`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "iii.-policies-for-the-language-schools",
        path: `${__dirname}/content/iii.-policies-for-the-language-schools`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "iv.-policies-for-the-institute",
        path: `${__dirname}/content/iv.-policies-for-the-institute`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "v-handbook_archive",
        path: `${__dirname}/content/v-handbook_archive`,
      }
    },
  ],
};
