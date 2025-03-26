import { Coffee } from '@/context/domain/Coffee';
import { CoffeeRepository } from '@/context/domain/CoffeeRepository';

export class ManageCoffee {
    constructor(private coffeeRepository: CoffeeRepository) {}

    async fetchCoffees(): Promise<Coffee[]> {
        return this.coffeeRepository.getAll();
    };

    async createCoffee (coffee: Coffee): Promise<Coffee | null> {
        return this.coffeeRepository.create(coffee);
    };
}

// import { Coffee } from '@/context/domain/Coffee';
// import { CoffeeApi } from '../api/coffeeApi';

// const coffeeApi = new CoffeeApi();

// export const fetchCoffees = async (): Promise<Coffee[]> => {
//     return coffeeApi.getAll();
// };

// export const createCoffee = async (coffee: Coffee): Promise<Coffee | null> => {
//     return coffeeApi.create(coffee);
// };