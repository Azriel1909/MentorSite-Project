import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { getComments } from '../services'
import { parse } from 'path'
import { comment } from 'postcss'


const Comments = ({ slug }) => {
  const [ comments, setComments ] = useState([])

  /*useEffect(() => {
    getComments(slug)
    .then((result) => setComments(result))
  }, [])*/

  return (
    <>
      {comment.length > 0 && (
        <div className='bg-white rounded-lg shadow-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold pb-4'>
              {comments.length}
              {' '}
              Comments
            </h3>
            {comments.map((comment) => (
              <div key={comment.createdAt} className='border-b border-purple-200 mb-4 pb-4' >
                <p className='mb-4'>
                  <span className='font-semibold'>
                    {comment.name}
                  </span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className='whitespace-pre-line text-gray-600 w-full'>
                  {parse(comment.comment)}
                </p>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default Comments 