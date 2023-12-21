import { SliderAnime } from '@/component/Carousel/MainCarousel'
import Styles from './home.module.css'

export default function Home() {
  return (
    <div className={Styles.homemain}>
        <SliderAnime/>
    </div>
  )
}