import React, {useEffect, useState} from 'react';
import './App.css'
import {IOptions} from "./types/types.ts";
import buttonsArray from "./constants/buttonsArray.ts";

import { useStore } from 'effector-react';
import { activePositionsStore } from './store';
import {getCurrentPositionsRequest, updateActivePositions, updatePositionsRequest} from "./store/events.ts";

interface AppProps {
    options: IOptions | undefined;
}

const App: React.FC<AppProps> = ({ options }) => {
    const [loading, setLoading] = useState(true);
    const activePositions = useStore(activePositionsStore);

    const handlePositionChange = async (position: string | string[]) => {
        try {
            let newPositions: string[];

            if (typeof position === 'string') {

                if (activePositions.includes(position)) {
                    newPositions = activePositions.filter(item => item !== position);
                } else {
                    newPositions = [...activePositions, position];
                }

            } else {
                newPositions = position;
            }


            setLoading(true);
            await updatePositionsRequest(newPositions);
            updateActivePositions(newPositions);

            if (options?.onPositionChange) {
                options.onPositionChange(newPositions);
            }
        } catch (e) {
            console.error('Error updating positions:', e);
        } finally {
            setLoading(false);
        }
    };

/*    const handleComplete = () => {
        if (options?.onComplete) {
            options.onComplete(activePositions);
        }
    };*/

    const setActivePositionsOnInit = async () => {
        try {
            if (options?.initializedOptions?.length) {
                await handlePositionChange(options.initializedOptions);
            } else {
                const positions = await getCurrentPositionsRequest();

                updateActivePositions(positions);
            }

        } catch (e) {
            console.error('Error fetching current positions:', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setActivePositionsOnInit().then();

        if (options?.onInit) {
            options.onInit();
        }
    }, []);

    return (
        <div>
            <img src="src/assets/car.jpeg" className="car" alt="Car" />
            <div className="overlay">
                {buttonsArray.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((buttonText, buttonIndex) => (
                            <button
                                key={`button-${rowIndex}-${buttonIndex}`}
                                onClick={() => handlePositionChange(buttonText)}
                                className={activePositions.includes(buttonText) ? 'active' : ''}
                            >
                                {buttonText}
                            </button>
                        ))}
                    </div>

                ))}
            </div>

            {loading && <p>please wait...</p>}
        </div>
    );
};

export default App;
