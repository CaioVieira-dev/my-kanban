import styled from 'styled-components'

export const Paper = styled.div<{ bgImg: string; }>`
  max-width:200px;

  min-height: 100px;
  background-image: url(${props => props.bgImg});
  position:relative;

  margin-bottom: 16px;
`
export const Note = styled.p`
width:100%;
padding:30px 16px 16px 8px;
font-family:"Montserrat", sans-serif;
/*handle text overflow*/
text-align:center;
overflow:hidden;
text-overflow: ellipsis;

`
export const Pin = styled.div<{ bgImg: string }>`
position:absolute;
left:50%;
transform: translateX(-50%);
top:6px;
width: 18px;
height:18px;
background-image: url(${props => props.bgImg});
`