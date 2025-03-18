import { Coffee } from "./Coffee";

export interface CoffeeRepository {
    getAll(): Promise<Coffee[]>;
    create(coffee: Coffee): Promise<Coffee | null>;
} 