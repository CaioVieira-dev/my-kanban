import styled from 'styled-components'

const Text = styled.h1`
font-family: 'Shadows Into Light', cursive;
font-size: 79px;
color:white;
letter-spacing: -3px;
margin-top: 24px;
transform: rotate(-25deg);
align-self: flex-start;
`
export function Logo() {
    return <Text>My Kanban</Text>
}