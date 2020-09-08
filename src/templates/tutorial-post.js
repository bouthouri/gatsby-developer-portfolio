import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import * as S from "../components/styled"

const TutorialPage = ({ data }) => (
  <Layout>
    <S.Title>{data.markdownRemark.frontmatter.title}</S.Title>
    <iframe
      title={data.markdownRemark.frontmatter.title}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${data.markdownRemark.frontmatter.videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <p>{data.markdownRemark.html}</p>
  </Layout>
)

export const query = graphql`
  query($videoId: String!) {
    markdownRemark(frontmatter: { videoId: { eq: $videoId } }) {
      frontmatter {
        title
        thumbnailUrl
        videoId
      }
      html
    }
  }
`
export default TutorialPage
