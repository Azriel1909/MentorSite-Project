import type { NextPage } from 'next'
import Head from 'next/head'
import { ProfileCard, Categories, ProfileWidget } from  '../components' 
import { getProfile } from '../services'


const Home: NextPage = ({ profiles }) => {
  return (
    <div className="container mx-auto px-10 mb-8 bg-300">
      <Head>
        <title>MentorSite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
        {profiles.map((profile) => 
        //Render out our div
        //Our real profile component
          <ProfileCard profile={profile.node} key={profile.title} />
        )}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <ProfileWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
export async function getStaticProps() {
  const profiles = (await getProfile()) || [];
  return {
    props: { profiles }
  }
}
