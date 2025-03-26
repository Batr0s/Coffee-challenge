import axios from "axios";
import { Coffee } from "../domain/Coffee";
import { CoffeeRepository } from "../domain/CoffeeRepository";

export class HttpCoffeeRepository implements CoffeeRepository {
    private readonly API_URL = "http://localhost:5000/coffee";

    async getAll(): Promise<Coffee[]> {
        const response = await axios.get<Coffee[]>(this.API_URL);
        return response.data;
    }

    async create(coffee: Coffee): Promise<Coffee | null> {
        try {
            const response = await axios.post<Coffee>(this.API_URL, coffee);
            return response.data;
        } catch(e: any) {
            return null
        }
    }
}
