import styled from 'styled-components'

export const Paper = styled.div<{ bgImg: string; }>`
  max-width:200px;
  min-height: 100px;
  background-image: url(${props => props.bgImg});
  position:relative;
  left: 50%;
  transform:translateX(-50%);
  margin-bottom: 16px;
`
export const Note = styled.p`
width:100%;
padding:30px 24px 16px 8px;


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