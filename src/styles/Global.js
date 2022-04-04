import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`

    html, body {
        min-height: 100vh;
    }

    body {
        background: ${p => p.theme.colors.background};
        font-family: Poppins, sans-serif;
    }

    #root {
        height: 100%;
    }

    .recharts-legend-wrapper{
        bottom: -5px !important;
    }
`
export default Global
