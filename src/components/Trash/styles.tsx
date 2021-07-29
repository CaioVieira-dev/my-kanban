import styled from "styled-components";



export const Can = styled.img`
position:absolute;
top:50px;
left:18px;
`
export const Lid = styled.img`
position:absolute;
z-index: 10;
transition: transform 0.3s ease-in;

`
export const Container = styled.div`
position: relative;
width:229px;
height: 282px;

&:hover ${Lid}{
    transform: translate(-60px,-20px) rotate(-45deg);
}
`