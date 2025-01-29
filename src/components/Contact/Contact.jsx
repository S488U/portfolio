import TextHeader from "../Elements/TextHeader";
import Data from "../Data/Data.json";
import BreakLine from "../Elements/BreakLine";

const Contact = () => {
    return (
        <div
            id="contact"
            className="w-full h-auto md:h-screen flex flex-col justify-around items-center overflow-hidden my-8 p-4 pt-4 mt-12"
        >
            <div className="w-full max-w-5xl space-y-4">
                <TextHeader text="Contact Me!" />
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Social Media Column */}
                    <div className="order-2 md:order-1 mt-2 bg-white text-black p-3 pb-5">
                        <h1 className="font-medium text-2xl font-nature pt-4 px-2">Find me in Social Media:</h1>
                        <div className="w-full grid grid-rows-4 grid-cols-1 text-xl px-16 md:px-20 gap-y-5 mt-5">
                            {Data.social.map(item => {
                                return (
                                    <a
                                        href=""
                                        className="md:max-w-[60%] flex flex-row justify-start items-center border border-gray shadow-md gap-x-2 p-3 rounded-full hv:border-black"
                                        key={item.id}
                                    >
                                        <img
                                            className="object-contain svg object-center"
                                            src={item.image}
                                            alt={item.name}
                                            height="40"
                                            width="40"
                                        />
                                        <p className="">{item.name}</p>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mail Column */}
                    <div className="order-1 md:order-2 mt-2 bg-white text-black p-3 pb-5">
                        <h1 className="font-medium text-2xl font-nature pt-4 px-2">Mail me from the web:</h1>
                        <form className="flex flex-col mt-5 gap-y-3 w-[300px] ml-0 md:ml-16">
                            <div className="flex flex-col justify-start items-start">
                                <label className="text-grey text-sm " htmlFor="name">Enter your name:</label>
                                <input type="text" className="text-black text-lg border-4 border-black focus:outline-none px-3 py-2 w-full" />
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label className="text-grey text-sm " htmlFor="name">Enter your email:</label>
                                <input type="text" className="text-black text-lg border-4 border-black focus:outline-none px-3 py-2 w-full" />
                            </div>
                            <div className="flex flex-col justify-start items-start ">
                                <label className="text-grey text-sm " htmlFor="name">Enter your message:</label>
                                <textarea className="text-black text-lg border-4 border-black focus:outline-none px-3 py-2 w-full"></textarea>
                            </div>
                            <div className="flex flex-col justify-start items-start ">
                                <input type="submit" value="send" className="font-nature text-white bg-black text-lg border-4 border-black focus:outline-none px-3 py-2 w-full cursor-pointer" />
                            </div>
                        </form>
                    </div>
                </div>
                <p className="text-sm text-grey text-center ">Relax, your name and email are safer than your pizza delivery guy&apos;s secret sauce recipe. No sharing here! 😄</p>
                <BreakLine/>
            </div>
        </div>
    );
};

export default Contact;
