'use client';
import { Card } from '@/components/Card';
import { useEffect, useState } from 'react';
import style from './CoffeeList.module.css'
import FilterButtons from './FilterButtons';
import { Coffee } from '@/context/domain/Coffee';
import { fetchCoffees } from '@/context/services/coffeeService';

export default function CoffeeList() {
    const [items, SetItems] = useState<Coffee[]>([]);
    const [filterValue, SetFilterValue] = useState<string>('All');
    const varieties = ['All', 'Robusta', 'Arabic'];

    const getCoffees = async () => {
        const coffees = await fetchCoffees();
        SetItems(coffees);
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
                {items.map((item) => {
                    if (item.variety === filterValue || filterValue === 'All') {
                        return <Card 
                            key={item.id}
                            title={item.name} 
                            description={item.description}
                            variety={item.variety}
                            price={item.price}
                            imageUrl={item.imageUrl}
                        />
                    }                    
                })}
            </div>
        </>
    );
}
