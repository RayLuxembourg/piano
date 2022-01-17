import notes from './notesData.json'
type PlaybackItem = {
    key: string,
    ms: number
}
export type Playback = PlaybackItem[]
export type Notes = typeof notes