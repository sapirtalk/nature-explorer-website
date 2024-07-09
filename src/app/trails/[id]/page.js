// app/trails/[id]/page.js

import { connectToDatabase , disconnectFromDatabase } from '@/app/api/middleware/mongo';
import { ObjectId } from 'mongodb';
import TrailDetails from '@/components/trails/TrailDetails';
import ImageCarousel from '@/components/trails/trailPage/ImageCarousel';
import UserLike from '@/components/trails/UserLike';
import { cookies } from 'next/headers';
import Stars from '@/components/trails/ratingStars/Stars';


export const generateStaticParams = async () => {
  const db = await connectToDatabase();
  const trails = await db.collection('Trails').find({}).toArray();


  return trails.map((trail) => ({
    id: trail._id.toString(),
  }));
};

const loader = async ({ params }) => {
  const db = await connectToDatabase();
  const id = ObjectId.createFromHexString(params.id);
  const trail = await db.collection('Trails').findOne({ _id: id });
  const user = cookies().get('user') ? JSON.parse(cookies().get('user').value) : null;
  const favorite_trails = user ? await db.collection('Users').findOne({ _id: new ObjectId(user.id) }).then((user) => user.favoriteTrails) : [];
  return {trail , user , favorite_trails};
};

const Trail = async ({ params }) => {
  const data = await loader({ params });
  const {trail , user , favorite_trails} = data;
  const user_id = user ? user.id : null;
  const trail_id = trail ? trail._id.toString() : null;
  const liked = favorite_trails.includes(trail_id) ? true : false;
  const rating = trail ? trail.averageRating : null;







  if (!trail) {
    return (
      <div>
        <h1>Trail not found</h1>
      </div>
    );
  }

  const OPTIONS = { slidesToScroll: 'auto' }
  

  return (
    <div className='lg:p-[50px] h-full mx-3'>
      <div className='lg:min-h-[40vh] h-full lg:p-10'>
      <div className='flex justify- justify-between'> 
        {user_id ? <UserLike trail_id = {trail_id} user_id = {user_id} liked = {liked} fromTrailPage={true} /> : null}
        <Stars rating={rating} user_id ={user_id} trail_id={trail_id} readOnly={true} onTrailPage={true} />
      </div> 
        <h1 className='text-3xl lg:text-[35px] my-6 font-bold text-center'>{trail.name}</h1>
        <ImageCarousel images={trail.image} options={OPTIONS} />
      </div>
      <div className='border-t-2 flex flex-col pt-2'>
        <TrailDetails trail={trail} />
      </div>
      <div className='flex justify-center items-center'>
        <Stars rating={rating} user_id ={user_id} trail_id={trail_id} readOnly={false} onTrailPage={true} />
      </div>
      <div className='h-[30vh]'>
        <h1>פה תהיה מפה</h1>
      </div>
    </div>
  );
};

export default Trail;
