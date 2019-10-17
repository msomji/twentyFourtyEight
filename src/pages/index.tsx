import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { TwentyFourtyEightGame } from '../components/twentyFourtyEight/twentyFourtyEight'
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TwentyFourtyEightGame/>
  </Layout>
)

export default IndexPage
