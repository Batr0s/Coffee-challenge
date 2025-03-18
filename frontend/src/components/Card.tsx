import React from 'react';
import style from './Card.module.css'
import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  variety: string ;
  price: number;
  imageUrl: string;
};

export const Card = ({ title, description, variety, price, imageUrl }: Props) => {

  return (
    <div className={style.cardBox}>
      <div className={ `${style.varietyBox} ${variety === 'Arabic' ? style.arabic : style.robusta}`}>
        <p>{variety}</p>
      </div>
      <Image
        src={imageUrl}
        width='200'
        height='300'
        className={style.image}
        alt={`${variety} coffee`}
      />
      <div className={style.textBox}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.description}>{description}</p>
        <p className={style.price}>{price}€</p>
      </div>
    </div>
  );
};
