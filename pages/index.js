import Head from 'next/head'
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage (props) {
  return (
  <>
  <Head>
    <title>Nobare Learning NextJS</title>
    <meta neme="description" content="Just learning some stuff" />
  </Head>
  <MeetupList meetups={props.meetups} />
  </>
  )
}

/* export async function getServerSideProps(context) {
  // Used when you need access to the complete request
  // Or when data is changed multiple times every second
  const req = context.req;
  const res = context.res;

  // Fetch data from API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    }
  };
} */

export async function getStaticProps() {

  const client = await MongoClient.connect(
    'mongodb+srv://nobareadm:tdb3bzmJs4SezuA6@nobaredb.fb61i.gcp.mongodb.net/batadase?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })), 
    },

    revalidate: 10
  };
}

export default HomePage;