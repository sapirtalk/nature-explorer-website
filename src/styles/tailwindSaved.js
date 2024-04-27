



const navbar = {
    container: 'fixed text-text w-full h-24 shadow-2xl bg-tertiary rounded-b-xl',
    inner_div: 'flex justify-between items-center w-full h-full px-4 lg:px-16',
    ul_desktop: 'space-x-4 hidden lg:flex',
    li_desktop: 'text-xl text-primary hover:text-accent',
    hamburger: 'lg:hidden',
    menu_opened: 'fixed right-0 top-0 w-[50%] sm:hidden h-screen bg-tertiary bg-opacity-70 p-10 ease-in duration-300',
    menu_closed: 'fixed right-[-100%] top-0 p-10 ease-in duration-300',
    inner_menu_close_btn: 'flex justify-start h-[10%]',
    ul_opened_menu: 'flex flex-col space-y-4',
    li_opened_menu: 'text-xl text-primary hover:text-accent'
}

const news = {
    latest_container: 'flex flex-col items-center justify-center w-full h-full bg-tertiary bg-opacity-70 p-4 shadow-2xl bg-opacity-50',
    latest_title: 'mb-[3vw] text-text text-2xl',
    latest_news: 'text-xl text-primary text-center w-[80%] lg:w-[50%] h-[10vh] bg-secondary rounded-lg p-4 shadow-2xl bg-opacity-50'
}



export { navbar, news }