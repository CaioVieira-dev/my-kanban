import { ReactNode } from 'react'
import styled from 'styled-components'

const pinSvg = `'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 18 18">
<g id="pin" transform="translate(-1111 -215)">
  <circle id="Elipse_1" data-name="Elipse 1" cx="9" cy="9" r="9" transform="translate(1111 215)" fill="red"/>
  <ellipse id="Elipse_2" data-name="Elipse 2" cx="3.5" cy="2" rx="3.5" ry="2" transform="translate(1121.173 215) rotate(25)" fill="white"/>
</g>
</svg>'`
//const img = `'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 219 100.795"><path id="postsheet" d="M0,0,109.272-4.855,219,0s-5.7-.825-5.7,21.076S219,87.608,219,87.608L0,95.94,2.548,42.96Z" transform="translate(0 4.855)" fill="red"/></svg>'`
const Paper = styled.div<{ bgImg: string }>`
  max-width:200px;
  min-height: 100px;
  background-image: url(${props => props.bgImg});
  position:relative;
  left: 50%;
  transform:translateX(-50%);
  margin-bottom: 16px;
`
const Note = styled.p`
width:100%;
padding:30px 24px 16px 8px;


`
const Pin = styled.div`
position:absolute;
left:50%;
transform: translateX(-50%);
top:6px;
width: 18px;
height:18px;
background-image: url(${pinSvg});
`

type PostsheetProps = {
  color: string;
  children: ReactNode;
}

export function Postsheet(props: PostsheetProps) {

  const img = `'data:image/svg+xml;utf8,
  <svg xmlns="http://www.w3.org/2000/svg" 
  preserveAspectRatio="none" 
  viewBox="0 0 219 100.795">
  <path id="postsheet" 
  d="M0,0,109.272-4.855,219,0s-5.7-.825-5.7,21.076S219,87.608,219,87.608L0,95.94,2.548,42.96Z" 
  transform="translate(0 4.855)" 
  fill="${props.color}"/></svg>'`

  //Todo, limitar para 350caracteres
  return (


    <Paper bgImg={img}>
      <Pin />
      <Note>
        {props.children}
      </Note>
    </Paper>

  )
}