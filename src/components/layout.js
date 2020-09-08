import React from "react"
import { createGlobalStyle } from "styled-components"
import { reboot } from "styled-reboot"
import { BaseCSS, Container, Col } from "styled-bootstrap-grid"

import * as S from "./styled"
import Header from "./header"

const rebootCss = reboot({
  fontFamilyBase: "Raleway, sans-serif",
  fontSizeBase: "20px",
  lineHeightBase: "1.6em",
  bodyColor: "#000",
  bodyBg: "#fff",
  linkColor: "#141d26",
  linkHoverColor: "#141d26",
})

const GlobalStyle = createGlobalStyle`
  ${rebootCss}

  #gatsby-focus-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: "Playfair Display", serif;
  }

  img{
    max-width: 100%
  }
`

class Layout extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <BaseCSS />
        <Container>
          <Header />
          <S.Wave />
          <S.Content>
            <Col>
              <S.Main>{this.props.children}</S.Main>
            </Col>
          </S.Content>
        </Container>
      </>
    )
  }
}

export default Layout
