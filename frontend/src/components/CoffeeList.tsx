'use client';
import { Card } from '@/components/Card';
import { useEffect, useState } from 'react';
import style from './CoffeeList.module.css'
import FilterButtons from './FilterButtons';
import { Coffee } from '@/context/domain/Coffee';
import { ManageCoffee } from '@/context/useCases/ManageCoffee';
import { HttpCoffeeRepository } from '@/context/adapters/HttpCoffeeRepository';

export default function CoffeeList() {
    const [coffees, SetCoffees] = useState<Coffee[]>([]);
    const [filterValue, SetFilterValue] = useState<string>('All');
    const varieties = ['All', 'Robusta', 'Arabic'];

    const getCoffees = async () => {
        const httpCoffeeRepository = new HttpCoffeeRepository();
        const manageCoffee = new ManageCoffee(httpCoffeeRepository);
        const coffees = await manageCoffee.fetchCoffees();
        SetCoffees(coffees);
    };

    useEffect(() => {
        getCoffees();
    }, []);

    const changeFilter = (newFilter: string) => {
        SetFilterValue(newFilter);
    };
    
    return (
        <>
            <div className={style.headerAndFilterBox}>
                <div className={style.headerBox}>
                    <h2 className='color-white'><b>MVST. EXCLUSIVE COFFEE</b></h2>
                </div>
                <FilterButtons 
                    varieties={varieties}
                    changeFilter={changeFilter}
                />
            </div>
            <div className={style.cardsMainBox}>
                {coffees.map((coffee) => {
                    if (coffee.variety === filterValue || filterValue === 'All') {
                        return <Card 
                            key={coffee.id}
                            title={coffee.name} 
                            description={coffee.description}
                            variety={coffee.variety}
                            price={coffee.price}
                            imageUrl={coffee.imageUrl}
                        />
                    }                    
                })}
            </div>
        </>
    );
}
