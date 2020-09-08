import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../components/layout"
import * as S from "../../components/styled"

const TutorialsPage = ({ data }) => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="A list of all the tutorials talking about web development"
      />
      <meta name="author" content="Oussama Bouthouri" />
      <title>Bouthouri - Tutorials page</title>
      <link rel="canonical" href="https://www.bouthouri.com/tutorial" />
    </Helmet>
    <S.Title>Tutorials</S.Title>
    <S.List>
      {data.allMarkdownRemark.nodes.map((node, key) => {
        return (
          <li key={key}>
            <Link to={`tutorials/${node.frontmatter.videoId}`}>
              {node.frontmatter.title}
            </Link>
          </li>
        )
      })}
    </S.List>
  </Layout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/pages/tutorials/.*/" } }
    ) {
      nodes {
        frontmatter {
          title
          thumbnailUrl
          videoId
        }
        html
      }
    }
  }
`

export default TutorialsPage
