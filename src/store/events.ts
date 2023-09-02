import {createEffect, createEvent} from 'effector';
import {Api} from "../api";

export const updateActivePositions = createEvent<string[]>();

export const getCurrentPositionsRequest = createEffect<void, string[]>(async () => {
    try {
        const {data} = await Api.getActivePositions();
        return data;
    } catch (error) {
        console.error('Error fetching current positions:', error);
        return [];
    }
});

export const updatePositionsRequest = createEffect<string[], void, Error>(async (positions) => {
    try {
        const {data} = await Api.updateActivePositions(positions);
        return data;
    } catch (error) {
        console.error('Error updating positions:', error);
        throw error;
    }
});
