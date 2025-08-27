import TextHeader from "../Elements/TextHeader";
import Data from "../Data/Data.json";
import BreakLine from "../Elements/BreakLine";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const localUrl = `${window.location.protocol}//${window.location.hostname}:5000/send-email`;

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Helper validation function
    const validateForm = () => {
        const errors = [];

        if (!formData.name.trim()) errors.push("Name is required");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) errors.push("Enter a valid email");
        if (!formData.message.trim()) errors.push("Message cannot be empty");

        // Show each error in a separate toast
        if (errors.length > 0) {
            errors.forEach((err, idx) => {
                setTimeout(() => {
                    const toastId = toast.error(
                        <div
                            onClick={() => {
                                console.log("Toast clicked:", err);
                                toast.dismiss(toastId);
                            }}
                            style={{
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            {err}
                        </div>,
                        {
                            duration: 3000,
                            style: {
                                background: "#fff",
                                color: "#000",
                                fontSize: "14px",
                                textAlign: "left",
                                width: "250px",
                            },
                        }
                    );
                }, idx * 300);
            });
        }

        return { hasError: errors.length > 0 };
    };


    const formSubmit = async (e) => {
        e.preventDefault();

        const validation = validateForm();

        if (validation.hasError) {
            // Show validation errors
            const firstInvalidInput = document.querySelector('.form-control');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-600 text-sm mb-2';
            errorDiv.textContent = validation.errors.join(' • ');
            firstInvalidInput.parentNode.insertBefore(errorDiv, firstInvalidInput);

            // Scroll to first error
            firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        await toast.promise(
            fetch(localUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }).then(async (res) => {
                const data = await res.json();
                if (!data.success) throw new Error("Failed to send email.");
                setFormData({ name: "", email: "", message: "" });
            }),
            {
                loading: "Sending message...",
                success: "Message sent successfully! 🎉",
                error: "Could not send message. Try again!",
            }
        );
    };

    return (
        <div id="contact" className="w-full h-auto md:h-screen flex flex-col justify-around items-center overflow-hidden my-8 p-4 pt-4 mt-12">
            <div className="w-full max-w-5xl space-y-4">
                <TextHeader text="Contact Me!" />
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Social Media Column */}
                    <div className="order-2 md:order-1 mt-2 bg-white text-black p-3 pb-5">
                        <h1 className="font-medium text-2xl font-nature pt-4 px-2">Find me in Social Media:</h1>
                        <div className="w-full grid grid-rows-4 grid-cols-1 text-xl px-16 md:px-20 gap-y-5 mt-5">
                            {Data.social.map((item, index) => (
                                <motion.a
                                    href={item.url}
                                    className="md:max-w-[60%] flex flex-row justify-start items-center border border-gray shadow-md gap-x-2 p-3 rounded-full hover:border-black"
                                    key={index}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <img className="object-contain" src={item.image} alt={item.name + ' icon'} height="40" width="40" loading="lazy" />
                                    <p>{item.name}</p>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Mail Column */}
                    <div className="order-1 md:order-2 mt-2 bg-white text-black p-3 pb-5">
                        <h1 className="font-medium text-2xl font-nature pt-4 px-2">Mail me from the web:</h1>
                        <form onSubmit={formSubmit} className="flex flex-col mt-5 gap-y-3 w-[300px] ml-0 md:ml-16">
                            <div className="flex flex-col justify-start items-start form-control">
                                <label className="text-grey text-sm" htmlFor="name">Enter your name:</label>
                                <input name="name" id="name" type="text" className="text-black text-lg border-4 border-black focus:outline-hidden px-3 py-2 w-full" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col justify-start items-start form-control">
                                <label className="text-grey text-sm" htmlFor="email">Enter your email:</label>
                                <input name="email" id="email" type="text" className="text-black text-lg border-4 border-black focus:outline-hidden px-3 py-2 w-full" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col justify-start items-start form-control">
                                <label className="text-grey text-sm" htmlFor="message">Enter your message:</label>
                                <textarea name="message" id="message" className="text-black text-lg border-4 border-black focus:outline-hidden px-3 py-2 w-full" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <motion.input layout whileHover={{ backgroundColor: "#080808" }} type="submit" value="send" className="font-nature text-white bg-black text-lg border-4 border-black focus:outline-hidden px-3 py-2 w-full cursor-pointer" aria-label="Send your message" />
                            </div>
                        </form>
                    </div>
                </div>
                <p className="text-sm text-grey text-center">Relax, your name and email are safer than your pizza delivery guy&apos;s secret sauce recipe. No sharing here! 😄</p>
                <BreakLine />
            </div>
        </div>
    );
};

export default Contact;