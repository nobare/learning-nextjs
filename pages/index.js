import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'one',
    image: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80',
    title: 'uno',
    address: 'front is rly hard',
  },
  {
    id: 'm2',
    title: 'two',
    image: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80',
    title: 'dos',
    address: 'help',
  }
]

function HomePage (props) {
  return <MeetupList meetups={props.meetups} />
}

export async function getStaticProps() {
  //fetch data (useEffct() normally)
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  }
}

export default HomePage;