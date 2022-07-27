import React from 'react'
import { getProfile, getProfileDetails, GetProfileDetails } from '../../services'
import { ProfileDetail, Categories, ProfileWidget, Mentor, Comments, CommentsForm } from '../../components'

const ProfileDetails = ({ profile }) => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 gap-12 lg:grig-cols-12'>
        <div className='col-span-1 lg:col-span-4'>
          <ProfileDetail profile={profile} />
          <Mentor mentor={profile.mentor} />
          <CommentsForm slug={profile.slug} />
          <Comments  slug={profile.slug} />
        </div>
        <div className='col-span-1 lg:col-span-12 lg:flex'>
          <div className='relative lg:sticky top-8'>
          <ProfileWidget slug={profile.slug} categories={profile.categories.map((category) => category.slug)} />
          <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
export async function getStaticProps({ params }) {
  const data = await  getProfileDetails(params.slug)
  return {
    props: { profile: data }
  }
}

export async function getStaticPaths() {
  const profiles = await getProfile()
  return {
    paths: profiles.map(({ node: { slug }}) => ({ params: { slug }})),
    fallback: false,
  }
}