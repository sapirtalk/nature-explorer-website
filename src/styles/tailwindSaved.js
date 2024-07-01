

// Navbar styles

const navbar = {
    container: 'fixed text-text w-full h-24 lg:bg-primary shadow-2xl lg:py-[3%] lg:shadow-none bg-tertiary z-50 lg:relative',
    inner_div: 'flex justify-between items-center w-full h-full px-4 lg:px-[5%] lg:py-3',
    ul_desktop: 'space-x-8 hidden lg:flex lg:flex-row-reverse',
    li_desktop: 'text-xl text-text hover:text-accent',
    hamburger: 'lg:hidden',
    menu_opened: 'fixed right-0 top-0 w-[50%] md:w-[30%] lg:hidden backdrop-blur h-screen bg-tertiary bg-opacity-70 p-5 ease-in duration-300',
    menu_closed: 'fixed right-[-100%] top-0 p-10 ease-in duration-300',
    inner_menu_close_btn: 'flex justify-start h-[10%]',
    ul_opened_menu: 'flex flex-col space-y-8',
    li_opened_menu: 'text-2xl text-text lg:hover:text-accent flex justify-between items-center w-full h-full lg:px-16',
    user_intro: 'text-xl text-text text-end w-full border-text mb-7',
    desktop_p: 'mr-1 text-center h-fit xl:text-[23px] lg:text-[15px]',
    desktop_link_curr: 'opacity-50 mx-5 items-center flex flex-row',
    desktop_link: 'mx-5 items-center flex flex-row hover:text-blue-500'
}

// Footer styles

const footer = {
    container: 'bottom-0 flex flex-col items-center justify-center w-full md:h-[30vh] h-[20vh] mt-4 py-[5%] bg-tertiary text-text text-center',
    row: 'flex flex-row lg:flex-row text-center justify-between items-center lg:w-[30%] w-full h-[30%] px-[15%] lg:px-16',
    col: 'flex text-l text-text text-center justify-center items-center w-full h-full px-4 lg:px-16',
    rights: 'text-s text-text text-center w-full h-full px-4 lg:px-16 lg:text-l lg:py-5',
}



// Home page Styles

    // Greeting styles

    const greeting = {
        greeting_container: 'flex flex-col items-center justify-center w-full h-[30%] bg-text bg-opacity-70 p-3 mb-3 mt-3 shadow-2xl bg-opacity-50',
        greeting_title: 'text-primary text-xl',
        greeting_text: 'text-s text-primary text-center pt-[2%] w-[80%] lg:w-[50%]'
    }


   // Latest news styles
    const news = {
        latest_container: 'flex flex-col items-center justify-center w-full h-full p-3 bt-2 border-text border-t-[10px] border-b-[10px] ',
        latest_title: 'mb-[3vw] text-text text-2xl',
        latest_news: 'text-l text-text text-center w-full lg:w-[50%] h-full bg-white bg-opacity-70 p-3 shadow-2xl overflow-y-auto'
    }



export { navbar, footer ,news , greeting}