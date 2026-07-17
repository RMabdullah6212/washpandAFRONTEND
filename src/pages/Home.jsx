import HeroSection from '../Components/HomeComponents/HeroSection'
import VehicleType from '../Components/HomeComponents/VehicleType'
import WashPackage from '../Components/HomeComponents/washPackage'
import About from '../Components/HomeComponents/About'
import ServicesAbout from '../Components/HomeComponents/servicesAbout.jsx'
import PromoSlides from '../Components/HomeComponents/PromoSlides.jsx'
import Gallery from '../Components/HomeComponents/Gallery.jsx'
import ClientReviews from '../Components/HomeComponents/ClientReviews.jsx'
import BookingBanner from '../Components/HomeComponents/BookingBanner.jsx'
import QuickContact from '../Components/HomeComponents/QuickContact.jsx'
const Home = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <VehicleType />
      <WashPackage />
      <ServicesAbout />
      <PromoSlides />
      <Gallery />
      <ClientReviews />
      <BookingBanner />
      <QuickContact />
    </div>
  )
}

export default Home
