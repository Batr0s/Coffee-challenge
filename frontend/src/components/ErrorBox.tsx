'use client';
import { useEffect, useState } from 'react';
import style from './ErrorBox.module.css';

export default function ErrorBox() {
    const [error, setError] = useState<string | null>(null);
    
    const hideError = () => {
    setError(null);
    }

    useEffect(() => {
    const errorMessage = localStorage.getItem('error');
    if (errorMessage) {
        setError(errorMessage);
        localStorage.removeItem('error');
    }
    }, [error]);
    return (
        <>
        {error && 
        <div className={style.error}>
            <div>
                <p className={style.warningSymbol}>⚠︎</p>
            </div>
            <div>
                <p className={style.errorText}>{error}</p>
            </div>
            <div>
                <button className={style.xSymbol} onClick={hideError}>X</button>
            </div>
        </div>
        }
        </>
    )
}