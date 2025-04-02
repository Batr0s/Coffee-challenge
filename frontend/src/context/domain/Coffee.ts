export interface Coffee {
    id: number;
    name: string;
    variety: {
        id: number,
        name: string,
    };
    price: number;
    description: string;
    imageUrl: string;
};
