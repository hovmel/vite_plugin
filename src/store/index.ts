import {createStore} from 'effector';
import { updateActivePositions } from './events';

export const activePositionsStore = createStore<string[]>([]);

activePositionsStore.on(updateActivePositions, (_, newPositions) => newPositions);
