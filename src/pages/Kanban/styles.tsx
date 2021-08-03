import styled from 'styled-components'

export const Container = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 0.2fr; 
  grid-template-rows: 0.01fr 1.8fr; 
  gap: 10px 10px; 
  grid-template-areas: 
    "logo . user"
    "aria2 board aria3";

  justify-content: center; 
  justify-items: center; 
  align-items: center; 
  width: 100%; 
padding-top: 24px;

`

export const Board = styled.div`
  grid-area: board;
  align-self: start; 

  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: clamp(42px,0.2fr,42) 1.8fr; 
  gap: 10px 10px; 
  grid-template-areas: 
    "to-do doing done"
    "postsheetToDo postSheetDoing postSheetDone"; 
  justify-content: center; 
  justify-items: center; 
  align-items: center; 
  background-color: white;
  padding: 10px;
  width: 900px;

  @media (max-width:1280px){
    width: 800px;
  }

`
export const BoardBorders = styled.div`
padding: 10px;
background-color:white;
`
export const ChalkText = styled.h2`
font-family: 'Shadows Into Light', cursive;
font-size: 24px;
color:white;
background-color: hsl(155, 80%, 22%);
width: 100%;
height: 100%;
text-align:center;

.to-do&{
  grid-area: to-do;
}
.doing&{
  grid-area:doing;
}
.done&{
  grid-area:done;
}
`
export const List = styled.div`

width: 100%;
height: 100%;
background-color: hsl(155, 80%, 22%);
padding: 16px 2%;
display: flex;
flex-direction:column;
align-items: center;

.to-do&{
  grid-area: postsheetToDo;
}
.doing&{
  grid-area:postSheetDoing;
}
.done&{
  grid-area:postSheetDone;
} 

`
export const Aria2 = styled.div`
grid-area: aria2;
align-self: start;
display: grid; 
  grid-template-columns: 1fr; 
  grid-template-rows: 0.5fr 1fr 1fr; 
  gap: 30px 30px; 
  grid-template-areas: 
    "aria2-1"
    "aria2-2"
    "aria2-3"; 
`

