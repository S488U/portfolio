const Navbar = () => {
  return (
    <header className='w-full flex justify-center align-center items-center mt-4 bg-transparent fixed'>
        <nav className='shadow-md flex flex justify-center align-center items-center gap-3 text-lg p-3 border border-[3px] border-solid border-black bg-white rounded-full relative z-999'>
            <a href="/" className='font-bold'>Portfolio</a>
            <a href="/" className='text-red-500'>/</a>
            <a href="#about" className='text-sm hover:text-green-600'>/About</a>
            <a href="#project" className='text-sm hover:text-green-600'>/Project</a>
            <a href="#contact" className='text-sm hover:text-green-600'>/Contacts</a>
        </nav>
    </header>
  )
}

export default Navbar
