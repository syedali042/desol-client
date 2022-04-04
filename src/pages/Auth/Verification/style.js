import styled from "styled-components"

export const VerificationWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const InnerWrapper = styled.div`
    max-width: 400px;
    width: 90%;
    text-align: center;
    padding: 50px 20px;
`

export const Heading = styled.h1`
    font-size: 25px;
    margin-bottom: 10px;
`

export const Email = styled.p`
    color: ${props => props.theme.colors.gray7};
    font-size: 16px;
    margin-bottom: 25px;
    line-height: 25px;
`
export const Paragraph = styled.p`
    color: ${props => props.theme.colors.gray7};
    font-size: 15px;
    line-height: 25px;
`

export const Img = styled.div`
    background: ${props => props.theme.colors.white};
    width: 80px;
    margin: -14px auto 18px auto;
    img {
        width: 100%;
    }
`
export const CodeInputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 10px;
    .code-input {
        input {
            font-family: inherit;
            color: ${props => props.theme.colors.black};
            font-weight: ${props => props.theme.font.weight.semiBold};

            &:first-child {
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
            }
            &:last-child {
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
            }

            &:focus {
                border-color: ${props => props.theme.colors.primary};
            }
        }
    }
`
