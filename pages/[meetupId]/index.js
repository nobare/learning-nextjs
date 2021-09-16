import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head"
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta neme="description" content="Just learning some stuff" />
    </Head>
    <MeetupDetail
      image={props.meetupData.image} 
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </>
  )
}

export async function getStaticPaths() {

  const client = await MongoClient.connect(
    'mongodb+srv://nobareadm:tdb3bzmJs4SezuA6@nobaredb.fb61i.gcp.mongodb.net/batadase?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({ 
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://nobareadm:tdb3bzmJs4SezuA6@nobaredb.fb61i.gcp.mongodb.net/batadase?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetups = await meetupsCollection.findOne({ 
    _id: ObjectId(meetupId) ,
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      }
    }
  }
}

export default MeetupDetails;