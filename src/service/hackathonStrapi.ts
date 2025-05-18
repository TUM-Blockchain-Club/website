import axios from "axios";
import { StrapiPicture, downloadPicture } from "./strapiPictures";

export type Hackathon = {
    name: string;
    // [lon, lat]
    coordinates: [number, number];
    link: string;
    image: StrapiPicture | null;
  };

export const fetchHackathons = async () : Promise<Hackathon[]> => {
    const hackathons: Hackathon[] = [];

    let hasMore = true;
    let page = 1;
    do {
        const res = await axios.get(
            `https://strapi.rbg.tum-blockchain.com/api/Hackathons?sort=name:asc&pagination[page]=${page}&pagination[pageSize]=25&populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        )
        
        for (const hackathon of res.data.data) {
            if (hackathon.image) {
                await downloadPicture(hackathon.image, hackathon.documentId, 'hackathons');
            }
            hackathon.coordinates = [hackathon.longitude, hackathon.latitude];

            hackathons.push(hackathon);
        }

        console.log(JSON.stringify(hackathons, null, 2));

        hasMore = res.data.meta.pagination.page < res.data.meta.pagination.pageCount;
        page = page + 1;
    } while (hasMore);

    return hackathons;
}