import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import * as S from "../components/styled"

const IndexPage = () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content="The home page of Bouthouri website" />
      <meta name="author" content="Oussama Bouthouri" />
      <title>Bouthouri - Home page</title>
      <link rel="canonical" href="https://www.bouthouri.com/" />
    </Helmet>

    <S.Title>Home</S.Title>
    <div>
      I think that my work is guided by a strong belief in IT as a
      problem-solving tool, as a way of recognizing and forming relationships
      between ideas and reality, and as a method for improving the connections
      between people and the products they use. As an expert of ageless
      curiosity, I like to stress the process, stretch the concepts up to
      corrupting rules and misuse of tools.
    </div>
    <br />
    <div>
      I lead teams to positive outcomes combining my skills in agile management,
      app architecture, user experience and product design. I like to be
      involved in every part of the job from architecture to deployment and day
      to day hustle. part-time manager, part-time developer I never get tired of
      building things and solving problems.
    </div>
    <br />
    <div>
      When not in front of my computer, you can find me sharing knowledge with
      the community, reading books or getting my ass kicked in jiu-jitsu. And
      yes, bad code formatting does keep me up at night.
    </div>
    <br />
  </Layout>
)

export default IndexPage
