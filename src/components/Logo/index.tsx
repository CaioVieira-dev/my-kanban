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
.login&{
    position: relative;
    left: 70%;
    top: 10%;
    transform: translate(-50%,-30%) rotate(-25deg);
    
    font-size:60px;
}
@media (max-width:1260px){
    font-size: 60px;
}

`
type LogoProps = {
    className?: string;
}
export function Logo(props: LogoProps) {
    return <Text className={props.className}>My Kanban</Text>
}