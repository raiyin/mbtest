import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
// import { Point } from './types/Point';

function App() {
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);
    const [width] = useState(800);
    const [height] = useState(400);
    const [heroRadius] = useState(50);
    // const [fireRadius] = useState(5);
    const [minY] = useState(50);
    const [maxY] = useState(350);

    const [firstX] = useState(50);
    // const [firstY, setFirstY] = useState(minY);
    // const [firstColor, setFirstColor] = useState("red");
    const [firstSpeed, setFirstSpeed] = useState(3);
    const [firstFreq, setFirstFreq] = useState(50);
    const [firstScore] = useState(0);
    // const [firstBalls, setFirstBalls] = useState<Point[]>([]);
    // const [firstDir, setFirstDir] = useState(1);

    const [secondX] = useState(750);
    const [secondY, setSecondY] = useState(minY);
    // const [secondColor, setSecondColor] = useState("red");
    const [secondSpeed, setSecondSpeed] = useState(3);
    const [secondFreq, setSecondFreq] = useState(50);
    const [secondScore] = useState(0);
    // const [secondBalls, setSecondBalls] = useState<Point[]>([]);
    const [secondDir, setSecondDir] = useState(secondSpeed);


    useEffect(() => {
        const interval = setInterval(() => {
            update();
        }, 1000 / 1);

        return () => clearInterval(interval);
    }, []);

    const update = () => {
        resetCtx();

        //updateY(true);
        updateY(false);

        //drawHero(firstY, true);
        drawHero(secondY, false);

        //drawFireball(counter, counter, true);
    };

    const resetCtx = () => {
        const ctx = drawCanvasRef.current?.getContext('2d');
        if (ctx === null || ctx === undefined) {
            return;
        }

        ctx.clearRect(0, 0, width, height);
    };

    const updateY = (isFirst: boolean) => {
        if (isFirst) {
            // if (firstY + heroRadius > height) {
            //     firstDir = -1;
            //     firstY = height - heroRadius;
            // }
            // else if (firstY - heroRadius < 0) {
            //     firstY = heroRadius;
            //     firstDir = 1;
            // }
            // else {
            //     firstY = firstY + firstDir;
            // }
        }
        else {
            console.log(secondY);
            if (secondY - heroRadius < 0) {
                setSecondDir(() => secondSpeed);
                setSecondY(_ => heroRadius);
            }
            else if (secondY > maxY) {
                setSecondDir(() => -1 * secondSpeed);
                setSecondY(_ => maxY);
            }
            else {
                setSecondY(() => secondY + secondDir);
            }
        }
    };

    const drawHero = (y: number, isFirst: boolean) => {
        const ctx = drawCanvasRef.current?.getContext('2d');
        if (ctx === null || ctx === undefined) {
            return;
        }

        const x = isFirst ? firstX : secondX;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(x, y, heroRadius, 0, 2 * Math.PI);
        ctx.stroke();
    };





    const changeSpeedHandler = (isFirst: boolean, event: ChangeEvent<HTMLInputElement>) => {
        if (isFirst)
            setFirstSpeed(+event.currentTarget.value);
        else
            setSecondSpeed(+event.currentTarget.value);
    };

    return (
        <>
            <h1 className={styles.title}>SCORE</h1>
            <div className={styles.score}>
                <div className={styles['player-score']}>{firstScore}</div>
                <div className={styles['player-score']}>{secondScore}</div>
            </div>

            <div className={styles['play-zone']}>
                <div className={styles['player-control']}>
                    <label htmlFor="firstSpeed">Speed</label>
                    <input
                        type="range"
                        min="1" max="10"
                        value={firstSpeed}
                        id='firstSpeed'
                        onChange={(event) => setFirstSpeed(+event.currentTarget.value)}
                    />
                    <label htmlFor="firstFrequency">Frequency</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={firstFreq}
                        id='firstFrequency'
                        onChange={(event) => { setFirstFreq(+event.currentTarget.value); }}
                    />
                </div>
                <canvas className={styles.poligon}
                    ref={drawCanvasRef}
                    color='white'
                    width={width}
                    height={height}
                >
                </canvas>
                <div className={styles['player-control']}>
                    <label htmlFor="secondSpeed">Speed</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={secondSpeed}
                        id='secondSpeed'
                        onChange={(event) => changeSpeedHandler(false, event)}
                    />
                    <label htmlFor="secondFrequency">Frequency</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={secondFreq}
                        id='secondFrequency'
                        onChange={(event) => setSecondFreq(+event.currentTarget.value)}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
