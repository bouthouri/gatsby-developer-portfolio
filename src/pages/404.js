import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="The page you are looking for is unavailable"
      />
      <meta name="author" content="Oussama Bouthouri" />
      <title>Bouthouri - 404 page</title>
      <link rel="canonical" href="https://www.bouthouri.com/404" />
    </Helmet>
    <p>404</p>
  </Layout>
)

export default NotFoundPage
