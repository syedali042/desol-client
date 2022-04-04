import styled from "styled-components"

import BarSpinner from "./BarSpinner"

export default function FullScreenLoader() {
    return (
        <Wrapper>
            <BarSpinner />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${p => p.theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;

    & > div {
        transform: translateY(-60px);
    }
`
