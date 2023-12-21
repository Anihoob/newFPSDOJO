import { ImageResponse } from "next/server";

interface Props {
  id: string | any;
  type: string | any;
}

// class RateLimiter {
//   private tokens: number;
//   private lastRefreshed: number;

//   constructor(private readonly rateLimit: number) {
//     this.tokens = rateLimit;
//     this.lastRefreshed = Date.now();
//   }

//   async getToken() {
//     const now = Date.now();
//     const elapsedTime = now - this.lastRefreshed;
//     const newTokens = Math.floor(elapsedTime / 50); // 50ms interval

//     if (newTokens > 0) {
//       this.tokens = Math.min(this.tokens + newTokens, this.rateLimit);
//       this.lastRefreshed = now;
//     }

//     if (this.tokens > 0) {
//       this.tokens--;
//       return true;
//     }

//     return new Promise((resolve) => {
//       const timeToWait = 50 - ((now - this.lastRefreshed) % 50);
//       setTimeout(() => resolve(this.getToken()), timeToWait);
//     });
//   }
// }

// const tmdbRateLimiter = new RateLimiter(20);

// await tmdbRateLimiter.getToken();
export default async function Tmdb(props: Props) {
  const baseUrl = "https://api.themoviedb.org/3";
  const dataUrl = `${baseUrl}/${props.type}/${props.id}`;
  const logoUrl = `${dataUrl}/images`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const [mainResponse, imagesResponse] = await Promise.all([
      fetch(dataUrl, options),
      fetch(logoUrl, options),
    ]);

    if (!mainResponse.ok || !imagesResponse.ok) {
      throw new Error("response code 400");
    }


    const mainData = await mainResponse.json();
    const imageData = await imagesResponse.json();

    const findDesktopImage = imageData.posters.find((image: any) =>
    image.height === 3000 || image.height === 2100 || image.height === 1080
    && 
    image.iso_639_1 === "en"
    );


    const desktopImage = findDesktopImage.file_path;

    const findLogo = imageData.logos.find((image: any) =>
    image.iso_639_1 === "en"
    );

    const logo = findLogo.file_path;

    const combinedData = {
      ...mainData,
      desktopImages: desktopImage,
      logos: logo,
    };

    return combinedData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
