"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../components.css";
// import swiper modules


import Image from "next/image";
import Link from "next/link";
import anime from "@/lib/supabase/anime";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";

// export default function SliderMovie() {
//   const [movieData, setMovieData] = useState<any[]>([]); 
//   async function getMovieData() {
//     const movieDamta = await movie();
//     setMovieData(movieDamta || []); 
//   }

//   useEffect(() => {
//     getMovieData();
//   }, []);

//   return (
//     <>
//       <Swiper
//         speed={600}
//         loop={true}
//         pagination={true}
//         modules={[Pagination]}
//         className="homemainsliderswiper"
//       >
//         {movieData?.map((animedescription: any) => (
//           <SwiperSlide
//             key={animedescription.id}
//             className="homemainsliderswiperslide"
//           >
//             <Image
//               className="mobileimg"
//               width={350}
//               height={350}
//               src={`https://image.tmdb.org/t/p/original${animedescription.poster_path}`}
//               quality={75}
//               alt={animedescription.title}
//             />
//             <Image
//               className="deskimg"
//               width={900}
//               height={900}
//               src={`https://image.tmdb.org/t/p/original${animedescription.extra.backdrops[0].file_path}`}
//               quality={75}
//               alt={animedescription.title}
//             />

//             <div className="homemainsliderinfo">
//               <span className="homemainsliderinfo-name">
//                 <img
//                   src={`https://image.tmdb.org/t/p/original${animedescription.extra.logos[0].file_path}`}
//                   alt={animedescription.title}
//                 />
//               </span>
//               <span>
//                 <h6>{animedescription.genres[1].name}</h6>
//                 <h6>{animedescription.release_date.substring(0, 4)}</h6>
//               </span>
//               <p className="about">{animedescription.overview}</p>
//               <Link
//                 href={`AniDojo/movie/${animedescription.id}`}
//                 className={"btntopage"}
//               >
//                 DOWNLOAD
//               </Link>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }

export function SliderAnime() {

  const [animeData, setAnimeData] = useState<any[]>([]);
  async function getAnimeData() {
    const animeDamta = await anime();
    setAnimeData(animeDamta || []);
  }

  useEffect(() => {
    getAnimeData();
  }, []);

  return (
    <>
      <Swiper
        speed={800}
        loop={true}
        pagination={true}
        modules={[Pagination]}
        className="homemainsliderswiper"
      >
        {animeData?.map((animedescription: any) => (
          <SwiperSlide
            key={animedescription.id}
            className="homemainsliderswiperslide"
          >
            <Image
              className="deskimg"
              width={1200}
              height={1200}
              src={`https://image.tmdb.org/t/p/original${animedescription.poster_path}`}
              quality={90}
              alt={animedescription.title}
            />
            <Image
              className="mobileimg"
              width={500}
              height={500}
              src={`https://image.tmdb.org/t/p/original${animedescription.desktopImages}`}
              quality={90}
              alt={animedescription.title}
            />

            <div className="homemainsliderinfo">
              <span className="homemainsliderinfo-name">
                <img
                  src={`https://image.tmdb.org/t/p/original${animedescription.logos}`}
                  alt={animedescription.title}
                />
              </span>

              <span>
                <h6>{animedescription.genres[1].name}</h6>
                {animedescription.first_air_date ? (
                  <h6>{animedescription.first_air_date.substring(0, 4)}</h6>
                ) : (
                  <h6>{animedescription.release_date.substring(0, 4)}</h6>
                )}
              </span>
              <p className="about">{animedescription.overview}</p>
              <Link
                href={`AniDojo/anime/${animedescription.id}`}
                className={"btntopage"}
              >
                DOWNLOAD
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
