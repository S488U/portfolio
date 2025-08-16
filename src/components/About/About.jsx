import Data from "../Data/Data.json";
import TextHeader from "../Elements/TextHeader";
import BreakLine from "../Elements/BreakLine";

const About = () => {
    return (
        <div id="about" className="w-full h-auto flex flex-col justify-around items-center overflow-hidden my-8 p-4 pt-4" >
            
            <div className="w-full max-w-5xl space-y-4">
            <TextHeader text="About"/>
            {Data.about.content.map((item, index) => {
                return (
                    <div key={index}>
                        <p className="text-lg text-gray-700" >{item}</p>
                        <br />
                    </div>
                );
            })}
            <BreakLine/>
            </div>
        </div>
    )
}

export default About
