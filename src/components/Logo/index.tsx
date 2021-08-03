import styled from 'styled-components'

const Text = styled.h1`
font-family: 'Shadows Into Light', cursive;
font-size: 60px;
color:white;
letter-spacing: -3px;
margin-top: 24px;
transform: rotate(-25deg);
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

.login&{
    position: relative;
    left: 70%;
    top: 10%;
    transform: translate(-50%,-30%) rotate(-25deg);

}

`
type LogoProps = {
    className?: string;
}
export function Logo(props: LogoProps) {
    return <Text className={props.className}>My Kanban</Text>
}