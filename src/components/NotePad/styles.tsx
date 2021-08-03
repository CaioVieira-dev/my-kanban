import styled from "styled-components";

export const Container = styled.div<{ hues?: number[] }>`
grid-area: aria2-2;
align-self: start;

width: 224px;
height: 205px;
border-right: 5px solid hsl( ${props => props.hues !== undefined ? props.hues[1] : 200}, 100%, 85%);
margin-right: 24px;
background-color: hsl(${props => props.hues !== undefined ? props.hues[1] : 200}, 100%, 85%);

-webkit-box-shadow: 5px 5px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[2] : 0}, 100%, 85%),
  10px 10px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[3] : 181}, 100%, 85%),
   15px 15px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[4] : 116}, 100%, 85%),
    20px 20px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[5] : 306}, 100%, 85%);
   
box-shadow:5px 5px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[2] : 0}, 100%, 85%),
  10px 10px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[3] : 181}, 100%, 85%),
   15px 15px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[4] : 116}, 100%, 85%),
    20px 20px 0px 0px hsl(${props => props.hues !== undefined ? props.hues[5] : 306}, 100%, 85%);
     
@media (max-width:1440px){

  z-index:10;
}
@media (max-height:760px){
  width:calc(224px * 2 / 3);
  height:calc( 205px * 2 / 3);
  top:40%;
}

`
export const NoteWrapper = styled.div`
position:relative;`
export const NoteDragger = styled.img`
position: absolute;
top: 0;
left: 0;
width:20px;
height: 20px;
background-color:red;
z-index: 2000;

`
export const NewNote = styled.textarea<{ bg?: number }>`

width: 219px;
height: 200px;
resize: none;
text-indent: 20px;
border:0;
background-color: hsl(${props => props.bg !== undefined ? props.bg : 50},100%,85%);
font-family:'Montserrat', sans-serif;
font-size: 16px;
padding: 12px;
::-webkit-scrollbar{
width: 8px;
height: 8px;
}
::-webkit-scrollbar-thumb{
background: #B3AFB3;
border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover{
background: #B3AFB3;
}
::-webkit-scrollbar-track{
background: #F0F0F0;
border-radius: 0px;
box-shadow: inset 0px 0px 0px 0px #F0F0F0;
}
@media (max-height:760px){
  width:calc(224px * 2 / 3);
  height:calc( 205px * 2 / 3);
}
`