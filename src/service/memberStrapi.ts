import axios from "axios";
import fs from "fs";
import path from "path";

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

export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export interface ProfilePicture {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: ImageFormat;
        large: ImageFormat;
        medium: ImageFormat;
        small: ImageFormat;
        [key: string]: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: never | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

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
    profile_picture?: ProfilePicture | null;
    social_media?: SocialMedia[];
    departments?: Department[];
}
const CACHE_DURATION_DAYS = Number(process.env.IMAGE_CACHE_DURATION_DAYS) || 1;
const CACHE_DURATION_MS = CACHE_DURATION_DAYS * 24 * 60 * 60 * 1000;

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
                await downloadProfilePicture(member);
            }
            members.push(member);
        }
        
        hasMore = res.data.meta.pagination.page < res.data.meta.pagination.pageCount;

        page = page + 1;
    } while (hasMore);
    console.log(`Fetched ${members.length} members in ${page} requests`);

    return members;
}

const downloadProfilePicture = async (member: Member) => {
    if (!member.profile_picture || !member.profile_picture.url) return;
    
    try {
        // Create directory if it doesn't exist
        const membersDir = path.join(process.cwd(), 'public', 'members');
        if (!fs.existsSync(membersDir)) {
            fs.mkdirSync(membersDir, { recursive: true });
        }
    
        // Base image filename & path
        const ext = member.profile_picture.ext || '.webp';
        const fileName = `${member.documentId}${ext}`;
        const filePath = path.join(membersDir, fileName);
        const filePublicUrl = `/members/${fileName}`;
    
        // Check cache freshness
        if (fs.existsSync(filePath)) {
            const { mtimeMs } = fs.statSync(filePath);
            if (Date.now() - mtimeMs < CACHE_DURATION_MS) {
                console.log(`Using cached profile picture for ${member.name}`);
                member.profile_picture.url = filePublicUrl;
            } else {
                fs.unlinkSync(filePath);
            }
        }
    
        // Download base image if missing
        if (!fs.existsSync(filePath)) {
            const response = await axios({
                url: 'https://strapi.rbg.tum-blockchain.com' + member.profile_picture.url,
                method: 'GET',
                responseType: 'stream'
            });

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);
            
            await new Promise<void>((resolve, reject) => {
                writer.on('finish', () => resolve());
                writer.on('error', reject);
            });
            console.log(`Downloaded profile picture for ${member.name}`);

            const publicUrl = `/members/${fileName}`;
            member.profile_picture.url = publicUrl;
        }

        if (member.profile_picture.formats) {
            const formats = member.profile_picture.formats;
            const formatSizes = ['thumbnail', 'small', 'medium', 'large'] as const;
            
            for (const size of formatSizes) {
                if (formats[size]) {
                    // Download and save each format
                    const formatFileName = `${member.documentId}_${size}${ext}`;
                    const formatFilePath = path.join(membersDir, formatFileName);
                    const fmtPublicUrl = `/members/${formatFileName}`;
            
                    if (fs.existsSync(formatFilePath)) {
                        const { mtimeMs } = fs.statSync(formatFilePath);
                        if (Date.now() - mtimeMs < CACHE_DURATION_MS) {
                            formats[size].url = fmtPublicUrl;
                            continue;
                        } else {
                            fs.unlinkSync(formatFilePath);
                        }
                    }
            
                    const formatResponse = await axios({
                        url: 'https://strapi.rbg.tum-blockchain.com' + formats[size].url,
                        method: 'GET',
                        responseType: 'stream'
                    });
                    
                    const formatWriter = fs.createWriteStream(formatFilePath);
                    formatResponse.data.pipe(formatWriter);
                    
                    await new Promise<void>((resolve, reject) => {
                        formatWriter.on('finish', () => resolve());
                        formatWriter.on('error', reject);
                    });
                    
                    // Update URL
                    formats[size].url = `/members/${formatFileName}`;
                }
            }
        }
    
    } catch (error) {
        console.error(`Error downloading profile picture for ${member.name}:`, error);
    }
}