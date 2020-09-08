const path = require(`path`)

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `ArticlesJson`) {
//     console.log(node)
//   }
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      articles: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/pages/articles/.*/" } }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      tutorials: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/pages/tutorials/.*/" } }
      ) {
        nodes {
          frontmatter {
            videoId
          }
        }
      }
    }
  `)

  result.data.articles.nodes.forEach(node => {
    createPage({
      path: `/articles/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/article-post.js`),
      context: { slug: node.frontmatter.slug },
    })
  })

  result.data.tutorials.nodes.forEach(node => {
    createPage({
      path: `/tutorials/${node.frontmatter.videoId}`,
      component: path.resolve(`./src/templates/tutorial-post.js`),
      context: { videoId: node.frontmatter.videoId },
    })
  })
}
