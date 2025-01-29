import Data from "../Data/Data.json";
import UpArrowIcon from "../Elements/UpArrowIcon";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const Footer = () => {
    return (
        <footer className="w-full h-[300px] flex flex-col justify-center items-center bg-black text-white mt-20">
            <div className="w-[90%] flex flex-col justify-center items-center gap-y-5">
                <div className="w-full flex flex-row justify-between items-start">
                    <div className="flex flex-col text-left gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <h6 className="text-sm">Social Media:</h6>
                            <div className="flex flex-row gap-x-4">
                                {Data.footer.map((item, index) => {
                                    return (
                                        <a key={index} href={item.url} className="cursor-pointer">
                                            <img src={item.image} alt={item.name} height="20" width="20" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <p className="text-left">
                                © {new Date().getFullYear()} Shahabas Abdul Hameed. All rights reserved.
                            </p>
                        </div>
                    </div>
                    <div>
                        <button onClick={scrollToTop} className="py-2 px-3 border border-white rounded-lg hover:scale-110 transition-all">
                            <UpArrowIcon size={20} color="white" />
                        </button>
                    </div>
                </div>
                <div className="w-full h-[12px] skew-x-12 bg-white"></div>
            </div>
        </footer>
    )
}

export default Footer
