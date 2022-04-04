import styled from "styled-components"

export default function Heading({ size, weight, children, style = {} }) {
    return (
        <Text style={style} defaultSize={size || "30px"} weight={weight}>
            {children}
        </Text>
    )
}

const Text = styled.h1`
    margin: 0;
    font-size: ${p => p.defaultSize};
    font-weight: ${p => p.weight || p.theme.font.weight.bold};
`
