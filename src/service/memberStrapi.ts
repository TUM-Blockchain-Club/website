import axios from "axios";
import { StrapiPicture, downloadPicture } from "./strapiPictures";

export const MembershipStatus = [
    "core",
    "trainees",
    "passive",
    "alumni",
    "advisor",
    "kicked_out",
    "exit",
    "supporting",
    "honorary",
    "unknown",
] as const;

export const Degree = [
    "bachelor",
    "master",
    "phd",
] as const;

export interface SocialMedia {
    id: number;
    platform: string | null;
    link: string;
}

export interface Department {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    discord_role_id: string | null;
    description: string | null;
    short_name: string | null;
}

export interface Member {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    membership_status?: (typeof MembershipStatus)[number] | null;
    degree?: (typeof Degree)[number] | null;
    email?: string | null;
    profile_picture?: StrapiPicture | null;
    social_media?: SocialMedia[];
    departments?: Department[];
}

export const fetchDepartments = async () : Promise<Department[]> => {
    const departments: Department[] = [];
    let hasMore = true;
    let page = 1;

    do {
        const res = await axios.get(
            `https://strapi.rbg.tum-blockchain.com/api/Departments?sort=name:asc&pagination[page]=${page}&pagination[pageSize]=25&populate=head`,
            {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        }
        )

        departments.push(...res.data.data);
        hasMore = res.data.meta.pagination.page < res.data.meta.pagination.pageCount;
        page = page + 1;

    } while (hasMore);

    return departments;
}

export const fetchMembers = async () : Promise<Member[]> => {    
    const members: Member[] = [];
 
    let hasMore = true;
    let page = 1;
    do {
        const res = await axios.get(
            `https://strapi.rbg.tum-blockchain.com/api/Members?sort=name:asc&pagination[page]=${page}&pagination[pageSize]=25&populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        )

        for (const member of res.data.data) {
            if (member.profile_picture) {
                await downloadPicture(member.profile_picture, member.documentId, 'members');
            }
            members.push(member);
        }
        
        hasMore = res.data.meta.pagination.page < res.data.meta.pagination.pageCount;
        page = page + 1;
    } while (hasMore);
    console.log(`Fetched ${members.length} members in ${page} requests`);

    return members;
}