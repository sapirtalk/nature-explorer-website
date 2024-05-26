import LatestNews from '@/components/home_comp/LatestNews'

// export async function getServerSideProps(context) {
//   // Determine the protocol (http or https)
//   const protocol = context.req.headers['x-forwarded-proto'] || 'http';
//   const host = context.req.headers.host;

//   // Construct the base URL
//   const baseUrl = `${protocol}://${host}`;

//   // Fetch data from the API endpoint
//   const res = await fetch(`${baseUrl}/api/routes/admin_news`);
//   const news = await res.json();

//   return {
//       props: {
//           news,
//       },
//   };
// }

const Home = () => {

  return (
    <div>
        <div className='w-full h-[20vh]'>
          <LatestNews />
        </div>
    </div>

  )
}

export default Home