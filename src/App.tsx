import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import PianoLayout from './components/PianoLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { playRecord, startRecording, stopRecording } from './redux/recordSlice';

/* 
(leaving this comment to share thought process)
record timer when was stroke recorder and what key
start some kind of timer. on every play record the time in ms and key and store in memory
playback run a timer and play strokes according to their time

*/


function App() {
  const { recordList, isRecording } = useSelector((state: RootState) => state.records)
  const dispatch = useDispatch()

  const handleRecordButton = () => {
    if (isRecording) return dispatch(stopRecording())
    return dispatch(startRecording());

  }

  return (
    <Box>
      <PianoLayout />

      <Button onClick={handleRecordButton}>{isRecording ? 'Stop Recording' : 'Start new Record'}</Button>
      <Stack >
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
