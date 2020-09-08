import styled from "styled-components"
import { Row } from "styled-bootstrap-grid"
import { VerticalTimeline } from "react-vertical-timeline-component"

import topWaveImg from "../../assets/images/top-wave-day.svg"

const Content = styled(Row)`
  flex: 1 1 auto;
`

const Main = styled.main`
  padding-top: 20px;
`

const Wave = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  background: url(${topWaveImg}) no-repeat white;
  background-size: 100% auto;
`

const Title = styled.h1`
  font-size: 50px;
  line-height: 1.4em;
`

const SubTitle = styled.h2`
  font-size: 40px;
  line-height: 1.4em;
`

const TimeLine = styled(VerticalTimeline)`
  &::before {
    background: #a2d9ff !important;
  }

  .vertical-timeline-element-content {
    padding: 0.5em !important;
    line-height: 1.5em;
  }

  .vertical-timeline-element-icon img {
    width: 100%;
  }
`

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  line-height: 2em;

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

export { Content, Main, Wave, Title, SubTitle, TimeLine, List }
