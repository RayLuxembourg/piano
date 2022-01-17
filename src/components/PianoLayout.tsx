import React from 'react'
import { Box } from '@chakra-ui/react'
import PianoButton from './PianoButton';
import notes from '../notesData.json'


export default function PianoLayout() {
    return (
        <Box display={'flex'} bgColor={'brown'} p={[4]} justifyContent={'center'} alignContent={'center'}>
            {notes.map(note =>
                <PianoButton key={note.key} char={note.char} isSharp={note.sharp}  buttonSound={note.sound} />)}
        </Box>
    )
}
