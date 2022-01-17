import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Playback } from '../types'

export interface RecordState {
    recordStartTime: number
    currentRecord: Playback
    recordList: Playback[]
    isRecording: boolean
}
const demoData: Playback = [{ key: 'a', ms: 500 }, { key: 's', ms: 1000 }]

const initialState: RecordState = {
    recordStartTime: 0,
    currentRecord: [],
    recordList: [demoData],
    isRecording: false
}

export const RecordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
        startRecording: (state) => {
            state.recordStartTime = new Date().getTime();
            state.currentRecord = []
            state.isRecording = true
            console.log(state)
        },
        stopRecording: (state) => {
            state.recordStartTime = 0;
            state.recordList.push(state.currentRecord);
            state.currentRecord = []
            state.isRecording = false
        },
        addPlaybackToRecord: (state, action: PayloadAction<string>) => {
            if (!state.isRecording) return;
            state.currentRecord.push({
                key: action.payload,
                ms: new Date().getTime() - state.recordStartTime
            })
        },
        playRecord: (state, action: PayloadAction<number>) => {
            const createTimeoutCallback = (ms: number, key: string) => {
                return () => setTimeout(() => {
                    window.dispatchEvent(new KeyboardEvent('keydown', {
                        key
                    }))
                }, ms)
            }
            const index = action.payload;
            const timeouts = state.recordList[index].map(d => createTimeoutCallback(d.ms, d.key))
            timeouts.forEach(t => {
                t()
                clearTimeout(t())
            });

        },
    },
})

// Action creators are generated for each case reducer function
export const { addPlaybackToRecord, startRecording, stopRecording,playRecord } = RecordSlice.actions

export default RecordSlice.reducer
