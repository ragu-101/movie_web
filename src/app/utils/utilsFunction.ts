import { ApiServices } from "../services/apiServices"

export const utilsFunctions = {
    async getGenere(movie_id: number) {
        let genre_list: number[] = [];
        try{
            const list = await ApiServices.get('genre/movie/list');
            genre_list = list.genres;
            // let res = genre_list.filter((item: any, index: number) => genreArrSet.has(item.id));
            // return res;
        }
        catch(err){
            throw new Error('Unable to fetch genre list');
        }
    }
}