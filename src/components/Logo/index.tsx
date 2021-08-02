import styled from 'styled-components'

const Text = styled.h1`
font-family: 'Shadows Into Light', cursive;
font-size: 79px;
color:white;
letter-spacing: -3px;
margin-top: 24px;
transform: rotate(-25deg);
align-self: flex-start;
position: fixed;
top: 2%;
left: 2%;
@media (max-width:1260px){
    font-size: 60px;
}

`
export function Logo() {
    return <Text>My Kanban</Text>
}