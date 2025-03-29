'use client'
import { useState } from 'react';
import style from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { Coffee } from '@/context/domain/Coffee';
import { ManageCoffee } from '@/context/useCases/ManageCoffee';
import { HttpCoffeeRepository } from '@/context/adapters/HttpCoffeeRepository';
import { useRouter } from 'next/navigation';
import formValidation from '@/utils/formValidation';

export default function NewCoffee() {
    const router = useRouter();
    const [errors, setErrors] = useState<{
        name?: string;
        variety?: string;
        price?: string;
        description?: string;
    }>({});
    const [formData, setFormData] = useState<Coffee>({
        id: 0,
        name: '',
        variety: '',
        price: 0,
        description: '',
        imageUrl: 'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
    });

    const changeFormData = (event: any) => {
        const value = event.target.value;
        const attribute = event.target.id ? event.target.id : event.target.name;
        console.log
        setFormData({...formData, [attribute]: value})
    };

    const confirmation = async () => {
        const newErrors = formValidation(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const httpCoffeeRepository = new HttpCoffeeRepository();
        const coffeeService = new ManageCoffee(httpCoffeeRepository);

        const response = await coffeeService.createCoffee(formData);
        if (!response) {
            localStorage.setItem('error', 'A coffee with the same name already exists');
        }
        router.push('/');
    }; 

    return (
        <div className={style.background}>
            <div className={style.modalBox}>
                <Link href='/' className={style.closeButton}>
                    <p>X</p>
                </Link>
                <h1 className={`color-white ${style.formTitle}`}>CREATE NEW</h1>
                <form className={style.form}>
                    <div className={`${style.fieldRow} ${style.flex}`}>
                        <div className={style.nameBox}>
                            <label htmlFor='name' className={style.label}>Name</label>
                            <input
                                type='text'
                                id='name'
                                value={formData.name}
                                placeholder='Name your coffee here'
                                // onChange={(event) => changeFormData(event)}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if (value.length <= 30) {
                                        setFormData({ ...formData, 'name': value });
                                    }
                                }}
                                className={`${style.input} ${errors.name ? style.redBorder : ''}`}
                            />
                            {errors.name && <p className={style.errorMessage}>{errors.name}</p>}
                        </div>
                        <div className={style.priceBox}>
                            <label htmlFor='price' className={style.label}>Price</label>
                            {/* <div className={style.input}> */}
                                <input 
                                    type='number'
                                    id='price'
                                    value={formData.price}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        if (/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
                                            setFormData({ ...formData, 'price': parseFloat(value) });
                                        }
                                    }}
                                    className={`${style.input} ${errors.price ? style.redBorder : ''}`}
                                />
                                {/* <span className={style.euro}>€</span> */}
                            {/* </div> */}
                            {errors.price && <p className={style.errorMessage}>{errors.price}</p>}
                        </div>
                    </div>
                    <div className={style.fieldRow}>
                        <p className={style.label}>Type</p>
                        <div className={style.varietyBox}>
                            <label className={`
                                    ${style.typeLabel}
                                    ${formData.variety === 'Arabic' ? style.varietyChecked : ''} 
                                    ${errors.variety ? style.redBorder : ''}
                                `}>
                                <input 
                                    type='radio'
                                    name='variety'
                                    value='Arabic'
                                    onChange={(event) => changeFormData(event)}
                                    className={style.hideRadio}
                                />
                                <p>Arabic</p>
                            </label>
                            <label className={`
                                    ${style.typeLabel}
                                    ${formData.variety === 'Robusta' ? style.varietyChecked : ''} 
                                    ${errors.variety ? style.redBorder : ''}
                                `}>                            
                                <input
                                    type='radio'
                                    name='variety'
                                    value='Robusta'
                                    onChange={(event) => changeFormData(event)}
                                    className={style.hideRadio}
                                />
                                <p>Robusta</p>
                            </label>
                        </div>
                        {errors.variety && <p className={style.errorMessage}>{errors.variety}</p>}
                    </div>
                    <div className={style.fieldRow}>
                        <label htmlFor='imageUrl' className={style.label}>Upload Image</label>
                        <input 
                            type='text'
                            id='imageUrl'
                            value={formData.imageUrl}
                            placeholder='Paste image URL here'
                            onChange={(event) => changeFormData(event)}
                            disabled={true}
                            className={style.input}
                        />
                    </div>
                    <div className={style.fieldRow}>
                        <label htmlFor='description' className={style.label}>Description</label>
                        <input 
                            type='text'
                            id='description'
                            value={formData.description}
                            placeholder='Add a description'
                            // onChange={(event) => changeFormData(event)}
                            onChange={(event) => {
                                const value = event.target.value;
                                if (value.length <= 50) {
                                    setFormData({ ...formData, 'description': value });
                                }
                            }}
                            className={`${style.input} ${errors.description ? style.redBorder : ''}`}
                        />
                        {errors.description && <p className={style.errorMessage}>{errors.description}</p>}
                    </div>
                </form>

                <div className={style.buttonsBox}>
                    <Link href='/' className={style.blackButton}>
                        Discard
                    </Link>
                    <button className={style.camelButton} onClick={confirmation}>Confirm</button>
                </div>
                <Image 
                    src='/coffee_grains.png'
                    width='200'
                    height='200'
                    alt='Coffee grains'
                    className={style.coffeeGrains}
                />
            </div>
        </div>
    );
}