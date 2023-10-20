import Link from 'next/link'
import React, { FC } from 'react'
import Image from "next/image";
import { MyCourseType } from '@/types';


const MyCourses: FC<MyCourseType> = ( props ) => {
  const {  data } = props
  const { id, nombre,  descripcion } = data
  return (
    <Link
    href={ '/'  }
    className="rounded-lg shadow-lg overflow-hidden"
  >
    <Image
      src={ "/favicon.jpg" }
      alt={ nombre}
      width={600}
      height={110}
    />
    <div className="p-5">
      <h3 className="text-xl font-bold text-slate-700">
        { `${id}. ${nombre}`  }
      </h3>
      <p className="mt-2 font-normal text-gray-600 line-clamp-3">
        {descripcion}
      </p>
    </div>
  </Link>
  )
}

export default MyCourses
