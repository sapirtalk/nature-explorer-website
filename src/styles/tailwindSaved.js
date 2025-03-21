

// Navbar styles

const navbar = {
    container: 'fixed text-text w-full h-24 shadow-2xl lg:py-[3%] lg:shadow-none bg-primary z-50 lg:relative',
    inner_div: 'flex justify-between items-center w-full h-full px-4 lg:px-[5%] lg:py-3',
    ul_desktop: 'space-x-8 hidden lg:flex lg:flex-row-reverse ml-20',
    li_desktop: 'text-xl text-text hover:text-accent',
    hamburger: 'lg:hidden',
    menu_opened: 'fixed right-0 top-0 w-[50%] md:w-[30%] lg:hidden backdrop-blur h-screen bg-primary bg-opacity-70 p-5 ease-in duration-300',
    menu_closed: 'fixed right-[-100%] top-0 p-10 ease-in duration-300',
    inner_menu_close_btn: 'flex justify-start h-[10%]',
    ul_opened_menu: 'flex flex-col space-y-8',
    li_opened_menu: 'text-2xl text-text lg:hover:text-accent flex items-center w-full h-full lg:px-16',
    user_intro: 'text-xl text-text text-end w-full border-text mb-7',
    desktop_p: 'mr-1 text-center h-fit xl:text-[23px] lg:text-[15px]',
    desktop_link_curr: 'opacity-50 mx-5 items-center flex flex-row',
    desktop_link: 'mx-5 items-center flex flex-row hover:text-blue-500'
}

// Footer styles

const footer = {
    container: 'bottom-0 flex flex-col items-center justify-center w-full md:h-[30vh] h-[20vh] mt-4 py-[5%] bg-tertiary',
    row: 'flex flex-row lg:flex-row text-center justify-between items-center lg:w-[30%] w-full h-[30%] px-[15%] lg:px-16',
    col: 'flex text-l text-text text-center justify-center items-center w-full h-full px-4 lg:px-16',
    rights: 'text-s text-primary text-center w-full h-full px-4 lg:px-16 lg:text-l lg:py-5',
}



// Home page Styles

    // Greeting styles

    const greeting = {
        greeting_container: 'flex flex-col lg:rounded-lg items-center justify-center bg-tertiary p-3 mb-3 shadow-2xl',
        greeting_title: 'text-primary text-xl lg:text-3xl',
        greeting_text: 'text-primary text-center text-l lg:text-xl w-full h-full p-3',
    }




export { navbar, footer, greeting}