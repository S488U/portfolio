import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className='h-10 w-dvw flex justify-center align-center items-center mt-4 bg-transparent fixed z-9999'>
      <nav className='shadow-md flex justify-center align-center items-center gap-3 text-lg p-3 border-[3px] border-solid border-black bg-white rounded-full relative'>
        <a href="/" className='font-bold'>Portfolio</a>
        <a href="#home" className='text-red-500'>/</a>
        <a href="#about" className='text-sm hover:text-green-600'>/About</a>
        <a href="#project" className='text-sm hover:text-green-600'>/Project</a>
        <a href="#contact" className='text-sm hover:text-green-600'>/Contacts</a>
      </nav>
    </motion.header>
  )
}

export default Navbar
