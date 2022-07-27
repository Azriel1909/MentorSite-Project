import React, { useRef ,useState, useEffect } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentElement = useRef()
  const nameElement = useRef()
  const emailElement = useRef()
  const storeDataElement = useRef()
  useEffect(() => {
    nameElement.current.value = window.localStorage.getItem('name')
    emailElement.current.value = window.localStorage.getItem('gmail')
  }, [])

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentElement.current
    const { value: name } = nameElement.current
    const { value: email } = emailElement.current
    const { checked: storeData } = storeDataElement.current

    if(!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name, email, comment, slug
    }

    if(storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } // And if i don´t care to save the data 
    // JUST REMOVE IT! 
    else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 4000);
      })
  }
  
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave Feedback</h3>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <textarea 
          ref={commentElement} 
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-purple-100 text-gray-700' 
          placeholder='Comment' 
          name='comment'
          />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
          <input 
          type="text"
          ref={nameElement}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-purple-100 text-gray-700' 
          placeholder='Name' 
          name='name'
          />
          <input 
          type="text"
          ref={emailElement}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-purple-100 text-gray-700' 
          placeholder='Email' 
          name='email'
          />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div>
            <input ref={storeDataElement} type='checkbox' id='storeData' name='storeData' value='true' />
            <label className='text-gray-600 cursor-pointer ml-4' htmlFor='storeData'>Save my name for the next time I comment.</label>
          </div>
        </div>
        {error && <p className='text-xs text-red-500'>All fields are required.</p>}
        <div className='mt-8'>
          <button type='button' onClick={handleCommentSubmission}
          className='transition duration-500 ease hover:bg-yellow-600 inline-block bg-pink-600 text-lg rounded-lg text-white px-8 py-3 cursor-pointer font-semibold' >
            send
          </button>
          {showSuccessMessage && <span className='text-xl font-semibold float-right text-green-400 mt-3'>Comment submitted for review.</span>}
        </div>
    </div>
  )
}

export default CommentsForm