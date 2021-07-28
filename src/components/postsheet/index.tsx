import { ReactNode } from 'react'
import { Note, Paper, Pin } from './styles'



type PostsheetProps = {
  paperColor?: string;
  pinColor?: string;
  children: ReactNode;
  refi?: any
  dragProps?: any;
  handProps?: any;
}

export function Postsheet(props: PostsheetProps) {
  const paperImg = `'data:image/svg+xml;utf8,
  <svg xmlns="http://www.w3.org/2000/svg" 
  preserveAspectRatio="none" 
  viewBox="0 0 219 100.795">
  <path id="postsheet" 
  d="M0,0,109.272-4.855,219,0s-5.7-.825-5.7,21.076S219,87.608,219,87.608L0,95.94,2.548,42.96Z" 
  transform="translate(0 4.855)" 
  fill="${props.paperColor || "hsl(180, 100%, 85%)"}"/></svg>'`

  const pinImg = `'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 18 18">
<g id="pin" transform="translate(-1111 -215)">
  <circle id="Elipse_1" data-name="Elipse 1" cx="9" cy="9" r="9" transform="translate(1111 215)" fill="${props.pinColor || "red"}"/>
  <ellipse id="Elipse_2" data-name="Elipse 2" cx="3.5" cy="2" rx="3.5" ry="2" transform="translate(1121.173 215) rotate(25)" fill="white"/>
</g>
</svg>'`

  //Todo, limitar para 350caracteres
  return (
    <Paper
      ref={props.refi}
      bgImg={paperImg}
      {...props.dragProps}
      {...props.handProps}
    >
      <Pin bgImg={pinImg} />
      <Note>
        {props.children}
      </Note>
    </Paper>
  )
}