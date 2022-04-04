import React from "react"
import styled, { keyframes } from "styled-components"

const SpinnerFrames = keyframes`
0%,
88%,
100% {
  opacity: 0;
}
0% {
  transform: translateY(-70px);
}
33% {
  opacity: 1;
}
33%,
88% {
  transform: translateY(50px);
}
`

const Loader = styled.div`
    position: relative;
    background: ${props => props.theme.colors.primary};
    .lines {
        position: absolute;
        height: 48px;
        width: 12px;
        background-color: ${props => props.theme.colors.primary};
        animation: ${SpinnerFrames} 0.6s cubic-bezier(0, 0, 0.03, 0.9) infinite;
        @media (max-width: ${props => props.theme.media.sm}px) {
            height: 35px;
            width: 9px;
        }
    }
    .line-1 {
        left: 0px;
        top: 0px;
    }
    .line-2 {
        left: 26px;
        top: 0px;
        animation-delay: 0.2s;
        @media (max-width: ${props => props.theme.media.sm}px) {
            left: 21px;
        }
    }
`

const LineLoader = () => {
    return (
        <Loader>
            <div className='lines line-1'></div>
            <div className='lines line-2'></div>
        </Loader>
    )
}

export default LineLoader
