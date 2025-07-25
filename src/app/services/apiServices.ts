export class ApiServices{
    public static base_url = process.env.NEXT_PUBLIC_BASE_URL;
    public static api_key = process.env.NEXT_PUBLIC_TOKEN;

    public static async get(url:string){
        const options = {
            method:'GET',
            headers:{
                accept: 'application/json',
                Authorization:`Bearer ${this.api_key}`
            }
        }
        const fetch_url = `${this.base_url}${url}`;
        
        const response = await fetch(fetch_url,options);
        if(!response.ok){
            throw new Error('Fetching failed');
        }
        return await response.json();
    }
}