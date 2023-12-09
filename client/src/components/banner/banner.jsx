import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect, useState } from 'react'

 const EmblaCarousel = ({id}) => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true },[Autoplay()])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const [data,setdata] = useState({});
  useEffect(() =>{
    fetch("/slider.json")
    .then(res =>res.json())
    .then (data =>{
      const filterdata = data.find((Data) => Data.catagory.toLowerCase() == id.id.toLowerCase())
      console.log(filterdata);
      setdata(filterdata)
    })
  },[])
  console.log(data);



  return (
    <div className="embla h-[300px] lg:h-[700px]" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide"><img className='w-full h-[300px] lg:h-[700px] '  src="https://graphicsfamily.com/wp-content/uploads/edd/2023/06/E-commerce-Website-Product-Banner-Design-scaled.jpg" alt="" /></div>
        <div className="embla__slide"><img className='w-full h-[300px] lg:h-[700px]'  src="https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_106176-1671.jpg" alt="" /></div>
        <div className="embla__slide"><img className='w-full h-[300px] lg:h-[700px]'  src="https://img.freepik.com/premium-vector/social-media-banner-watch-web-banner-web-banner-design_706582-185.jpg" alt="" /></div>
      </div>
    </div> 
  )
}
export default EmblaCarousel