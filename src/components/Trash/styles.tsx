import styled from "styled-components";

export const Can = styled.img`
position:absolute;
top:50px;
left:18px;
@media (max-height:760px){
    width:calc(100% * 5 / 6);
    height:calc(100% * 5 / 6);
    top:80px;
    left: 5px;
}
`
export const Lid = styled.img`
position:absolute;
z-index: 10;
transition: transform 0.3s ease-in;
@media (max-height:760px){
    width:calc(100% * 8 / 9);
    height:calc(100% * 8 / 9);
}

`
export const Container = styled.div`
grid-area: trash;

position: relative;
width:229px;
height: 282px;
position: fixed;
bottom:2%;
right:10%;
&:hover ${Lid}{
    transform: translate(60px,-20px) rotate(45deg);
}
@media (max-width:1440px){
left:3%;
}
@media (max-height:760px){
    width:calc(229px * 2 / 3);
    height:calc(282px * 2 / 3);
    bottom: 70px;
}
`