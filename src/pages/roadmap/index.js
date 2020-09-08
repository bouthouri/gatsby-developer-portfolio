import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Helmet } from "react-helmet"
import { VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"

import Layout from "../../components/layout"
import * as S from "../../components/styled"

const RoadMapPage = ({ data }) => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="A roadmpa for the content in the website"
      />
      <meta name="author" content="Oussama Bouthouri" />
      <title>Bouthouri - Roadmap page</title>
      <link rel="canonical" href="https://www.bouthouri.com/roadmap" />
    </Helmet>
    <S.Title>RoadMap</S.Title>
    <S.TimeLine animate={false}>
      {data.allMarkdownRemark.nodes.map((node, key) => {
        return (
          <VerticalTimelineElement
            key={key}
            contentStyle={{ background: "#a2d9ff", color: "#fff" }}
            contentArrowStyle={{
              borderRight: "7px solid  #a2d9ff",
            }}
            date={node.frontmatter.accomplished_at}
            iconStyle={{ background: "#a2d9ff", color: "#fff" }}
            icon={
              node.frontmatter.publicURL &&
              node.frontmatter.publicURL.childImageSharp && (
                <Img
                  fixed={node.frontmatter.publicURL.childImageSharp.fixed}
                  alt="roadmap icon"
                />
              )
            }
          >
            <h3 className="vertical-timeline-element-title">
              {node.frontmatter.title}
            </h3>
          </VerticalTimelineElement>
        )
      })}
    </S.TimeLine>
  </Layout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/pages/roadmap/.*/" } }
    ) {
      nodes {
        frontmatter {
          title
          isDone
          accomplished_at
          publicURL {
            childImageSharp {
              fixed(width: 60, height: 60) {
                base64
                width
                height
                src
                srcSet
              }
            }
          }
        }
      }
    }
  }
`

export default RoadMapPage
