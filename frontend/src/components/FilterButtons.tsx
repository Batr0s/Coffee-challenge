'use client';
import { useState } from 'react';
import style from './FilterButtons.module.css'

type Props = {
    varieties: string[],
    defaultActive?: string,
    changeFilter: (newFilter: string) => void
};

export default function FilterButtons({ varieties, defaultActive = 'All', changeFilter }: Props) {
    const [activated, setActivated] = useState<string>(defaultActive);

    const activateFilter = (variety: string) => {
        setActivated(variety);
        changeFilter(variety);
    };

    return (
        <div className={style.filtersBox}>
            {varieties.map((variety) => 
                <button 
                    key={variety}
                    value={variety} 
                    className={ activated === variety ? style.activeFilterButton : style.filterButton}
                    onClick={() => activateFilter(variety)}
                >
                    {variety}
                </button>
            )}  
        </div>
    );
}