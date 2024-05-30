// app/trails/[id]/page.js

import { connectToDatabase } from '@/app/api/middleware/mongo';
import { ObjectId } from 'mongodb';
import SingleTrail from '@/components/trails/SingleTrail';


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
  return {trail};
};

const Trail = async ({ params }) => {
  const data = await loader({ params });
  const trail = data.trail;

  if (!trail) {
    return (
      <div>
        <h1>Trail not found</h1>
      </div>
    );
  }

  return (
    <div className='p-3'>
      <div>
      <SingleTrail
        id={trail._id}
        image={trail.image}
        name={trail.name}
        desc={trail.description}
        length={trail.distance}
        difficulty={trail.difficulty}
        duration={trail.duration}
        kids={trail.kidsFriendly}
        pets={trail.petsFriendly}
        babyStroller={trail.babyStrollerFriendly} />
        </div>
        <div className='h-[30vh]'>
        <h1>פה תהיה מפה</h1>
        </div>
        <div className='h-[30vh]'>
        <h1>פה יהיה דירוג משתמשים</h1>
        </div>
    </div>
  );
};

export default Trail;
