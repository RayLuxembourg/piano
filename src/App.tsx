import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { PianoLayoutComponent } from './components/PianoLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { addPlaybackToRecord, playRecord, startRecording, stopRecording } from './redux/recordSlice';
import notes from './notesData.json'
import PianoButton from './components/PianoButton';

/* 
(leaving this comment to share thought process)
record timer when was stroke recorder and what key
start some kind of timer. on every play record the time in ms and key and store in memory
playback run a timer and play strokes according to their time
*/


function App() {
  const { recordList, isRecording } = useSelector((state: RootState) => state.records)
  const [pressedKey, setPressedKey] = useState<string>('')

  const dispatch = useDispatch()
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    setPressedKey(e.key)
        setTimeout(() => {
      setPressedKey('')
    },100)
  }
  
  const handleRecordButton = () => {
    if (isRecording) return dispatch(stopRecording())
    return dispatch(startRecording());
  }

  const onPlaying = (char:string) => {
    dispatch(addPlaybackToRecord(char))
  }

  return (
    <Box>
      <PianoLayoutComponent>
        {notes.map(note =>
          <PianoButton onPlaying={onPlaying} pressed={pressedKey === note.char} key={note.key} char={note.char} isSharp={note.sharp} buttonSound={note.sound} />)}

      </PianoLayoutComponent>
      <Stack width={'200px'} p={[2]} >
        <Button onClick={handleRecordButton}>{isRecording ? 'Stop Recording' : 'Start new Record'}</Button>
        {recordList.map((r, index) => {
          return <Button onClick={() => {
            dispatch(playRecord(index))
          }}>Record {index + 1}</Button>
        })}
      </Stack>
    </Box>
  );
}

export default App;
