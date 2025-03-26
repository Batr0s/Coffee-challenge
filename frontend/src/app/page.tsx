import styles from './page.module.css'; 
import Image from 'next/image';
import CoffeeList from '@/components/CoffeeList';
import Link from 'next/link';
import ErrorBox from '@/components/ErrorBox';

export default function Home() {

  return (
    <>
      <div className='dark-background'></div>
      <ErrorBox/>
      <header>
        <div className='left-div'>                    
          <h2 className='color-white'><b>MVST</b> Coffee</h2>
        </div>
        <div className='right-div'>
          <Link href='/new' className={styles.camelButton}>
            <p>Create</p>
          </Link>
        </div>
      </header>
      <main>
        <section className={styles.introSection}>
          <Image 
            src='/coffee.jpg'
            width='700'
            height='400'
            className={styles.coffeeImage}
            alt='Coffee'
          />
          <div className={styles.heroBox}>
            <h1 className={`${styles.mainTitle} color-white`}><b>ROASTED COFFEE</b></h1>
            <p className={`${styles.subtitle} color-grey`}>Choose a coffee from below or create your own.</p>
            <Link href='/new' className={styles.camelButton}>
              <p>Create your own coffee</p>
            </Link>
          </div>
        </section>
        <section className='color-white'>
          <CoffeeList/>
        </section>
      </main>
      <footer>
        <div className='footer-text-box'>
          <h2 className='color-white'><span>MVST</span> Coffee</h2>
        </div>
        <div className='grains-box-1'></div>
        <div className='grains-box-2'></div>
        <div className='grains-box-3'></div>
      </footer>
    </>
  );
}
