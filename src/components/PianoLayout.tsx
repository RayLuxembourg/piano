import React from 'react'
import { chakra } from '@chakra-ui/react'
import PianoButton from './PianoButton';
import type { Notes } from '../types';

type Props = {
    notes: Notes
    pressedKey: string
}
const PianoLayoutComponent = chakra('div', {
    baseStyle: {
      display:'flex',
      bgColor:'brown',
      p:[4],
      justifyContent:'center',
      alignContent:'center'
    },
})
  

export default function PianoLayout({ notes,pressedKey }: Props) {
    return (
        <PianoLayoutComponent>
            {notes.map(note =>
                <PianoButton pressed={pressedKey === note.char} key={note.key} char={note.char} isSharp={note.sharp} buttonSound={note.sound} />)}
        </PianoLayoutComponent>
    )
}
