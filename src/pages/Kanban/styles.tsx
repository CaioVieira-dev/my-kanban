import styled from 'styled-components'

export const Board = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 0.2fr 1.8fr; 
  gap: 10px 10px; 
  grid-template-areas: 
    "to-do doing done"
    "postsheetToDo postSheetDoing postSheetDone"; 
  justify-content: center; 
  justify-items: center; 
  align-items: center; 
  background-color: white;
  padding: 10px;

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

