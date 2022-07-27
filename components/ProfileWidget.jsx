import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentProfiles, getSimilarProfiles } from '../services'


const ProfileWidget = ({ categories, slug }) => {
  const [relatedProfiles, setRelatedProfiles] = useState([]);
  useEffect(() => {
    if(slug){
      getSimilarProfiles(categories, slug)
      .then((result) => setRelatedProfiles(result))
    } else {
      getRecentProfiles()
      .then((result) => setRelatedProfiles(result))
    }
  },[slug])
  console.log(relatedProfiles)
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-9'>
      <h3 className='font-semibold text-xl mb-8 pb-4 text-white pb-4 bg-purple-700 rounded-lg px-9 py-3 text-center'>
        {slug ? 'Related Profiles' : 'Recent Profiles'} 
      </h3>
      {relatedProfiles.map((profile) =>  (
        <div key={profile.title} className='flex items-center justify-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img 
            alt={profile.title}
            height='60px'
            width='60px'
            className='align-middle rounded-lg aspect-square'
            src={profile.featuredImage.url} 
            />
          </div>
          <div className='flex-grow ml-4 lg:ml-5'>
            <p className='text-purple-600 font-xs mr-3'>{moment(profile.createdAt).format('MMMM DD, YYYY')}</p>
          </div>
          <Link href={`/profile/${profile.slug}`} 
          key={profile.title}
          className='text-md'>
            {profile.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProfileWidget