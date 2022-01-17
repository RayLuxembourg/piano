import React, { useEffect, useRef } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'


const activeButton: BoxProps = {
    borderTop: "1px solid #777",
    borderLeft: "1px solid #999",
    borderBottom: "1px solid #999",
    boxShadow: "2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2)",
    background: "linear-gradient(to bottom,#fff 0%,#e9e9e9 100%)"
}

const sharpButtonStyle: BoxProps = {
    width: '0',
    height: '210px',
    position: 'relative',
    _active: {
        _after: {
            backgroundColor: 'gray',
        }
    },
    _after: {
        content: '""',
        width: '45px',
        position: 'absolute',
        height: '100%',
        left: '-23px',
        bgColor: '#000',
        border: '1px solid #fff',
        zIndex: 1,
    }
}

const buttonStyle: BoxProps = {
    width: '45px',
    height: '300px',
    bgColor: '#fff',
    border: '1px solid black',
    position: 'relative',
    _active: {
        ...activeButton
    }

}

type Props = {
    buttonSound: string
    isSharp: boolean
    char: string
    pressed: boolean,
    onPlaying: (char: string) => void
}

export default function PianoButton({ onPlaying, pressed,buttonSound, isSharp, char }: Props) {
    const audioRef = useRef<HTMLAudioElement>();

    useEffect(() => {
        if (pressed) onPlay()
    }, [pressed])

    const onPlay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            onPlaying(char);
        }
    }

    const style = isSharp ? sharpButtonStyle : buttonStyle
    return (
        <Box {...style} onClick={onPlay}  >
            {/* @ts-ignore */}
            <audio ref={audioRef} src={buttonSound} />
            <Box pos={'absolute'} zIndex={2} left={2} bottom={2} color={'red'}>{char}</Box>
        </Box>
    )
}
