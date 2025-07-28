import { FaApple, FaGooglePlay } from "react-icons/fa"
import HeroImg from '../assets/HeroImg.png'

export const Hero = () =>{
    return (
        <section>
            <div className="container grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="py-16">
                    <h1 className="text-3xl font-bold lg:text-4xl leading-relaxed xl:leading-normal">Empower Your <span className="text-secondary">Routine</span> <br/>Elevate Your <span className="text-secondary">Life</span></h1>
                    <p className="py-6 w-3/4">Transform your daily routine with a personalized habit tracker designed to help you achieve your goals.</p>

                   <div className="flex space-x-4 mt-4 justify-center md:justify-start">
                      <button className="primary-btn">
                      <FaGooglePlay className="text-2xl" />
                      <div className="text-left">
                        <p className="text-xs">Get it on</p>
                        <p className="text-base font-semibold">Google Play</p> 
                      </div>
                    </button>

                    <button className="primary-btn">
                        <FaApple className="text-2xl" />
                        <div className="text-left leading-tight">
                        <p className="text-xs">Get it on</p>
                        <p className="text-base font-semibold">App Store</p>
                        </div>
                    </button>
</div>
                </div>
                <div className="flex justify-center py-2 md:py-10 ">
                    <img src={HeroImg} alt="Hero" className="md:py-10 w-[450px] md:w-[450px] xl:w-[400px] h-[250px] md:h-[400px] xl:h-[350px] drop-shadow"/>
                </div>
            </div>
        </section>
    )
}