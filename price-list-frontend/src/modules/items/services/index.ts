import axios from 'axios';

const baseUrl = 'http://localhost/items';

export class FilmAPI {

    static filmsByOneSearch = 8; // Number of movies per one search query

    static async getFilmsByPage(page: number, filters?: string[]) {
        return await axios.get<any>(`${ baseUrl }films/step`, {
            params: {
                page,
                filters: filters?.length ? filters.join(',') : null
            }
        });
    }
}