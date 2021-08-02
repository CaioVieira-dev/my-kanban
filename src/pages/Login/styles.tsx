import styled from "styled-components";

export const Container = styled.div`
width:400px;
height: 450px;
background-color:hsl(155, 80%, 22%);
border: 5px solid white;

position:absolute;
top:50%;
left: 50%;
transform: translate(-50%,-50%);



`
export const GoogleG = styled.img``

export const Button = styled.button`
font-family:"Montserrat", sans-serif;
color: white;
font-size: 24px;
padding:8px;
border: 5px solid white;
cursor: pointer;
border-radius: 16px;

background-color: transparent;
display: flex;
align-items: center;
justify-content: center;
gap: 4px;
justify-self: flex-end ;

position: absolute;
left: 50%;
bottom: 24px;
transform: translateX(-50%);
width: 300px;

transition: filter 0.3s;
:hover{
    filter:brightness(0.9);
}
`