import Link from 'next/link'
import React, { FC } from 'react'
import Image from "next/image";
import { MyCourseType } from '@/types';


const MyCourses: FC<MyCourseType> = ( props ) => {
  const {  name, description } = props
  return (
    <Link
    href={ "/" }
    className="rounded-lg shadow-lg overflow-hidden"
  >
    <Image
      src={ "/vercel.svg" }
      alt={ name}
      width={600}
      height={250}
    />
    <div className="p-5">
      <h3 className="text-xl font-bold text-slate-700">
        { name}
      </h3>
      <p className="mt-2 font-normal text-gray-600 line-clamp-3">
        {description}
      </p>
    </div>
  </Link>
  )
}

export default MyCourses
