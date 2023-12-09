import React from 'react'
import FeatureCards from '../../components/FeattureProductcard/FeatureCards'
import useHome from '../../components/Hooks/useHome'
import TrandingProudct from '../../components/TrandingProduct/TrandingProduct'
import EmblaCarousel from '../../components/banner/banner'

const Home = () => {
const {product} = useHome()
console.log(product);
    return (
        <div>
          <EmblaCarousel></EmblaCarousel>
          <FeatureCards></FeatureCards>
          <TrandingProudct></TrandingProudct>
          
        </div>
    )
}

export default Home