import Tmdb from "../tmdb/tmdb";
import Init from "./init";

const superbase = Init()
export default async function animeMain() {
    try {
      const { data: anime } = await superbase
        .from("tmdbanimes")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);
      if (anime === null) return;
      else {
        const mappedData = anime.map(async (item: any) => {
          try {
            const animeFetch = await Tmdb({
              id: item.title,
              type: item.type,
            });
            return animeFetch;
          } catch (err) {
            console.log(err);
          }
        });
        const animeData = await Promise.all(mappedData);
        return animeData;
      }
    } catch (error) {
      console.log(error);
    }
  }