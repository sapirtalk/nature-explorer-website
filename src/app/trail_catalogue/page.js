import TrailsCatalogue from '@/components/trails/TrailsCatalogue';


const TrailsCataloguePage = () => {
    return (
        <div className='flex flex-col items-center justify-center px-2 w-full h-full'>
           <TrailsCatalogue cookieCallback={cookieCallback} />   
        </div>
    );
    }

export default TrailsCataloguePage;




const cookieCallback = async (name , value , action) => {
    'use server'
  
    const isCookiesEnabled = cookies().has(name)
  
    switch (action) {
  
        case 'set':
            cookies().set(name, value , {maxAge: 60 * 60 * 24 * 30})
            break;
        case 'remove':
            cookies().delete(name)
            break;
        case 'get':
            return isCookiesEnabled ? JSON.parse(cookies().get(name).value) : null  
    }
  }