import axios from 'axios';

const api = axios.create({
    baseURL: 'https://myfailemtions.npkn.net',
    timeout: 15000,
})

export class Api {
    static getActivePositions() {
        return api.get('/b944ff');
    }

    static updateActivePositions(newPositions: string[]) {
        return api.post('/b944ff', newPositions);
    }
}
