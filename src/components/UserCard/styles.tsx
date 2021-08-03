import styled from "styled-components";

export const CardWrapper = styled.div`
grid-area:user;
@media (max-width:1340px){
  grid-area: aria3;
  align-self: start;
  position: relative
}
`

export const Avatar = styled.img`
width:32px;
height: 32px;
border-radius:50px;

`
export const UserName = styled.p`
font-family:"Montserrat",sans-serif;
color:white;

`
export const Exit = styled.span`
font-family:"Montserrat",sans-serif;
color:hsl(0,100%,75%);
transition:color 0.3s;
cursor:pointer;
:hover&{
color:hsl(0,100%,55%);
}
`
export const TextWrapper = styled.div`
display: flex;
flex-direction: column;
@media (max-width:1340px){
display: none;

}
`

export const Card = styled.div`

padding:8px 12px;
min-width: 175px;

background-color:green;
border: 5px solid white;
border-radius:50px;
display: flex;
align-items: center;
justify-content: space-between;
gap:16px;

@media (max-width:1340px){
flex-direction: row-reverse;
min-width: 0;
padding: 0;
.active&{
    
    position: absolute;
    width: 175px;
    right: -20px;
    padding-left:12px;
    ${TextWrapper} {
		display:block;
	}
}
}

`