import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { Row, Col } from "styled-bootstrap-grid"

import * as S from "./styled"

const Header = () => {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "avatar.png" }) {
        childImageSharp {
          fixed(width: 130) {
            base64
            width
            height
            src
            srcSet
          }
        }
      }
    }
  `)
  const [isOpen, setOpen] = useState(false)
  return (
    <Row>
      <Col>
        <S.Header className={isOpen ? "isOpen" : ""}>
          <S.NavBar>
            <S.NavBarLogo to="/">
              <Img
                fixed={data.file.childImageSharp.fixed}
                alt="bouthouri's logo"
              />
            </S.NavBarLogo>

            <S.NavMenu>
              <S.NavItem>
                <Link to="/">Home</Link>
              </S.NavItem>
              <S.NavItem>
                <Link to="/articles">Articles</Link>
              </S.NavItem>
              <S.NavItem>
                <Link to="/tutorials">Tutorial</Link>
              </S.NavItem>
              <S.NavItem>
                <Link to="/roadmap">Roadmap</Link>
              </S.NavItem>
              <S.NavItem>
                <a href="/cv/" target="_blank" rel="noopener noreferrer">
                  CV
                </a>
              </S.NavItem>
              <S.NavItem>
                <a href="mailto:oussama@bouthouri.com?subject=Contact from website">
                  Contact
                </a>
              </S.NavItem>
            </S.NavMenu>

            <S.NavControl onClick={() => setOpen(!isOpen)} />
          </S.NavBar>
        </S.Header>
      </Col>
    </Row>
  )
}

export default Header
