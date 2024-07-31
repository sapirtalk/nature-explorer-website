// app/trails/[id]/page.js

import { connectToDatabase} from '@/app/api/middleware/mongo';
import { ObjectId } from 'mongodb';
import TrailDetails from '@/components/trails/TrailDetails';
import ImageCarousel from '@/components/trails/trailPage/ImageCarousel';
import UserLike from '@/components/trails/UserLike';
import { cookies } from 'next/headers';
import Stars from '@/components/trails/ratingStars/Stars';
import CommentsSection from '@/components/trails/trailPage/CommentsSection';
import AddComment from '@/components/trails/trailPage/AddComment';
import AddRating from '@/components/trails/trailPage/AddRating';


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
  const user_cookie = cookies().get('user') ? cookies().get('user').value : null;
  const user = user_cookie ? JSON.parse(user_cookie) : null;
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
  var refresh = false

  if (!trail) {
    return (
      <div>
        <h1>Trail not found</h1>
      </div>
    );
  }

  const OPTIONS = { slidesToScroll: 1 ,
    containScroll: 'trimSnaps',
    slidesToShow: 1
  }
  

  return (
    <div className='lg:p-[50px] justify-center items-center flex flex-col h-full mx-3'>
      <div className='lg:min-h-[40vh] w-full h-full lg:p-10'>
      <div dir='rtl' className='flex flex-row-reverse justify-between'> 
        {user_id ? <UserLike trail_id = {trail_id} user_id = {user_id} liked = {liked} fromTrailPage={true} /> : null}
        <Stars rating={rating} user_id ={user_id} trail_id={trail_id} readOnly={true} onTrailPage={true} />
      </div>
        <h1 className='text-3xl lg:text-[35px] my-6 font-bold text-center'>{trail.name}</h1>
        <ImageCarousel images={trail.image} options={OPTIONS} />
      </div>
      <div className='border-t-2 w-full flex flex-col pt-2'>
        <TrailDetails trail={trail} />
      </div>
      {user ?
      <div className='border-t-2 flex flex-row justify-between items-center w-[60%] pt-[50px]'>
        <AddComment trailId={trail_id} userId={user_id}/>
        <AddRating trailId={trail_id} userId={user_id}/>
      </div>
      : null
      }
      <div className='border-t-2 flex flex-col w-full pt-[50px]'>
        <CommentsSection trail_id={trail_id} user_id={user_id}/>
      </div>
    </div>
  );
};

export default Trail;
