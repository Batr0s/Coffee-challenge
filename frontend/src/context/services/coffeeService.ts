import { Coffee } from '@/context/domain/Coffee';
import { CoffeeApi } from '../api/coffeeApi';

const coffeeApi = new CoffeeApi();

export const fetchCoffees = async (): Promise<Coffee[]> => {
    return coffeeApi.getAll();
};

export const createCoffee = async (coffee: Coffee): Promise<Coffee | null> => {
    return coffeeApi.create(coffee);
};