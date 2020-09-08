import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../components/layout"
import * as S from "../../components/styled"

const ArticlesPage = ({ data }) => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="A list of all the articles talking about web development"
      />
      <meta name="author" content="Oussama Bouthouri" />
      <title>Bouthouri - Articles page</title>
      <link rel="canonical" href="https://www.bouthouri.com/articles" />
    </Helmet>
    <S.Title>Articles</S.Title>
    <S.List>
      {data.allMarkdownRemark.nodes.map(node => {
        return (
          <li key={node.frontmatter.slug}>
            <Link to={`/articles/${node.frontmatter.slug}`}>
              {node.frontmatter.published_at} - {node.frontmatter.title}
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
      filter: { fileAbsolutePath: { regex: "/src/pages/articles/.*/" } }
    ) {
      nodes {
        frontmatter {
          title
          published_at
          slug
        }
      }
    }
  }
`

export default ArticlesPage
