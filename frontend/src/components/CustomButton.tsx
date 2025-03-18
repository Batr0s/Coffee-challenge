"use client"

import style from './CustomButton.module.css'

type Props = {
    children: React.ReactNode;
    onClickFunction: () => void;
    customStyle?: string;
};

export default function Button ({ children, onClickFunction, customStyle = 'camelButton' }: Props) {

    return (
        <button className={style[customStyle]} onClick={onClickFunction}>{children}</button>
    );
};