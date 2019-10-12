import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { TwentyFourtyEightGame } from "../components/twentyFourtyEight/twentyFourtyEight"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TwentyFourtyEightGame/>
  </Layout>
)

export default IndexPage
