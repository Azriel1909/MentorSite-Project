import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const ProfileCard = ({ profile }) => {
  console.log(profile);
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <img
          src={profile.featuredImage.url}
          alt={profile.title}
          className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
        />
      </div>
      <h1 className='transition duration-300 text-center mb-8 cursor-pointer hover:text-yellow-600 text-3xl font-semibold m-3'>
      <Link href={`/profile/${profile.slug}`}>
        {profile.title}
      </Link>
      </h1>
      <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center mb-4 lg:mb-3 w-full lg:w-auto mr-8'>
        <p className='inline align-middle text-gray-700 ml-1 text-lg'>
            {profile.mentor.name}
          </p>
          <img
          alt={profile.mentor.name}
          height='70px' 
          width='70px'
          className='align-middle p-3'
          src={profile.mentor.photo.url}
          />
        </div>
        <div className='font-medium text-gray-700'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {moment(profile.createdAt).format('MMM DD, YYYY')}
          </span>
        </div>
      </div>
      <p className='text-center text-lg text-gray-600 font-normal px-4 lg:px-20 mb-8'>
        {profile.extract}
      </p>
      <div className='text-center'>
        <Link href={`/profile/${profile.slug}`}>
          <span className='transition duration-400 transform hover:-translate-y-1 inline-block bg-purple-600 text-lg rounded-full text-white px-9 py-3 cursor-pointer font-bold'>
                View profile
          </span>
        </Link>
      </div>
    </div>
  )
}

export default ProfileCard