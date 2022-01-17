import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import PianoLayout from './components/PianoLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { playRecord, startRecording, stopRecording } from './redux/recordSlice';
import notes from './notesData.json'

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
  }
  const handleRecordButton = () => {
    if (isRecording) return dispatch(stopRecording())
    return dispatch(startRecording());
  }

  return (
    <Box>
      <PianoLayout pressedKey={pressedKey} notes={notes} />

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
