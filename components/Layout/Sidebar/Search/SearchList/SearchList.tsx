import { FC } from "react"
import Link from "next/link"
import Image from "next/image"

import styles from './SearchList.module.scss'
import { IMovie } from "@shared/types/movie.types"
import { getMovieUrl } from "@/config/url.config"

const SearchList:FC<{movies : IMovie[]}> = ({movies}) => {
  return (
    <div className={styles.list}>
      {movies.length ? movies.map(movie => (
        <Link key={movie._id} href={getMovieUrl(movie.slug)} >
          <Image src={movie.poster}  width={50} height={50} alt={movie.title} draggable={false}  />
          <span >{movie.title}</span>
        </Link>
      )): <div className="text-white text-center my-4">Фильмы не найдены</div>}
    </div>
  )
}
export default SearchList