import styled from 'styled-components'

const Text = styled.h1`
grid-area: aria2-1;
justify-self: center;

font-family: 'Shadows Into Light', cursive;
font-size: 60px;
color:white;
letter-spacing: -3px;

transform: rotate(-25deg);

.login&{
    position: relative;
    left: 70%;
    top: 10%;
    transform: translate(-50%,-30%) rotate(-25deg);

}
@media (max-width: 1260px){
    font-size: 48px;
}
`
/*
align-self: flex-start;
position: fixed;
top: 2%;
left: 10%;
@media (max-width: 1700px){
left:7%;
}
@media (max-width: 1440px){
left:2%;
font-size:46px;
}
*/

type LogoProps = {
    className?: string;
}
export function Logo(props: LogoProps) {
    return <Text className={props.className}>My Kanban</Text>
}