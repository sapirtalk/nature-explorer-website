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
    switch (action) {
  
        case 'set':
            cookies().set(name, value)
            break;
        case 'remove':
            cookies().delete(name)
            break;
        case 'get':
            return cookies().get(name)    
    }
  }