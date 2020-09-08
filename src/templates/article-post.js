import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import * as S from "../components/styled"

const ArticlePage = ({ data }) => (
  <Layout>
    <S.Title>{data.markdownRemark.frontmatter.title}</S.Title>
    <S.SubTitle>{data.markdownRemark.frontmatter.published_at}</S.SubTitle>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        published_at
      }
      html
    }
  }
`
export default ArticlePage
