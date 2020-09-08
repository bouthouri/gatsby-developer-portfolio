import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import * as S from "../components/styled"

import resume from "../assets/pdf/resume.pdf"

const CV = () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="The Curriculum Vitae of Bouthouri website"
      />
      <meta name="author" content="Oussama Bouthouri" />
      <title>Bouthouri - Curriculum Vitae page</title>
      <link rel="canonical" href="https://www.bouthouri.com/cv" />
    </Helmet>

    <S.Title>Curriculum Vitae</S.Title>
    <embed src={resume} alt="oussama's resume" width="100%" height="1000" />
  </Layout>
)

export default CV
