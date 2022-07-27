import React, {useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
    .then((newCategories) => setCategories(newCategories))
  }, []);
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-9'>
      <h3 className='font-semibold text-xl mb-8 text-white pb-4  bg-purple-700 rounded-lg px-9 py-3 text-center'>
        Categories
      </h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className='cursor-pointer block pb-3 mb-3'>
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories