import { Link } from "gatsby"
import styled from "styled-components"
import { media } from "styled-bootstrap-grid"

import closeMenuIcon from "../../assets/images/close-menu.png"
import openMenuIcon from "../../assets/images/open-menu.png"

const NavBar = styled.nav`
  flex-direction: column;
  align-content: center;
  display: flex;
  font-size: 1.2em;
  font-family: "Playfair Display", serif;
  width: 100%;
  height: 100%;

  ${media.tablet`
    font-size: 1em;
    flex-direction: row;
    align-content: flex-start
  `}

  ${media.desktop`
    font-size: 1.2em;
  `}
`

const NavMenu = styled.ul`
  display: none;
  padding: 0;
  margin: 0;
  list-style: none;
  flex-direction: column;
  align-items: center;

  ${media.tablet`
    display: flex;
    padding-top: 20px;
    align-items: flex-start;
    flex-direction: row;
  `}
`

const NavBarLogo = styled(Link)`
  width: 130px;
  margin: 10px;
  z-index: 2;
  ${media.desktop`
    margin-right: 50px;
  `}
`

const NavItem = styled.li`
  margin-top: 20px;
  a {
    padding: 10px;
    color: #000;
  }

  ${media.desktop`
    margin-top: 0px;
    margin-right: 10px;
  `}
`

const NavControl = styled.div`
  background: url(${openMenuIcon});
  background-size: contain;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 30px;
  right: 30px;

  ${media.tablet`
    display: none;
  `}
`

const Header = styled.header`
  &.isOpen {
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 1;

    ${NavMenu} {
      display: flex;
    }

    ${NavBarLogo} {
      margin: 10px auto;
    }

    ${NavControl} {
      background: url(${closeMenuIcon});
      background-size: contain;
    }
  }

  ${media.tablet`
      position: static;
      min-height: 100px;
      padding: 20px 0;
      background: transparent;
      &.isOpen{
        position: static;
        min-height: 100px;
        padding: 20px 0;
        background: transparent;

        ${NavBarLogo} {
          margin: 0;
        }
      }
  `}
`

export { Header, NavBar, NavMenu, NavItem, NavBarLogo, NavControl }
