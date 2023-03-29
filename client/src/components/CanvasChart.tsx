import React, {FC, useEffect, useRef, useState} from 'react';
import p5Types from "p5";
import Sketch from "react-p5";
import {Round} from "../types/Round";
import {useAppSelector} from "../redux/hooks";
import {selectCurrentRoundPlaying} from "../redux/slices/currentRoundSlice";

interface ICanvasChartProps {
    currentRound: Round | null
}

let y = 1;
const inc = 0.01;
const CanvasChart: FC<ICanvasChartProps> = ({currentRound}) => {
    const currentRoundPlaying = useAppSelector(selectCurrentRoundPlaying);
    const [isDrawEnd, setIsDrawEnd] = useState(false)
    const [x, setX] = useState(0)
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!currentRound) {
            setX(0)
            setIsDrawEnd(false)
            y = 1;
        }
    }, [currentRound])
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.frameRate(100)
        if (ref.current)
            p5.createCanvas(ref.current?.offsetWidth, 300).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        if (ref.current && (x >= ref.current?.offsetWidth)) return

        p5.noFill();
        p5.stroke(255, 0, 0, 255);
        p5.strokeWeight(3);

        if (currentRound && currentRound.isBettingTimeEnd) {
            if (+(x / 100).toFixed(2) >= currentRound.roundMultiplier) {
                setIsDrawEnd(true)
                return;
            }

            let prev_x = x;
            let prev_y = y;
            setX(val => val + 1.5)
            y = y + y * inc;

            if (currentRound && ref.current && x >= (ref.current?.offsetWidth / 100) * (currentRound.roundMultiplier * 10)) return;
            p5.line(prev_x, p5.height - prev_y, x, p5.height - y);
        }
    };

    return (
        <div className='bg-gray-700 rounded-md px-4 py-8'>
            <div className={'relative'} ref={ref}>
                <div
                    className={'font-bold absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-[20%]'}
                >
                    {!currentRoundPlaying && currentRound?.isBettingTimeEnd &&
                        <p className={`${currentRound && isDrawEnd ? 'text-red-600' : ''} text-[60px]`}>
                            {+(x / 100).toFixed(2)}x
                        </p>}
                    {currentRoundPlaying && currentRound?.isBettingTimeEnd && <p>Please wait for round end</p>}
                    {currentRound && !currentRound?.isBettingTimeEnd && <p>Please place your bet...</p>}
                    {!currentRound && <p>Round ended...</p>}
                </div>
                {ref.current && currentRound && !currentRoundPlaying ? <Sketch setup={setup} draw={draw}/> :
                    <div className={'h-[300px]'}></div>}
                <div className='border-t -mt-0.5 flex justify-between'>
                    {[...Array(11).keys()].map(item => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CanvasChart;