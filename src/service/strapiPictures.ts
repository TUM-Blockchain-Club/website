import fs from "fs";
import path from "path";
import axios from "axios";

export interface StrapiImageFormat {
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

export interface StrapiPicture {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: StrapiImageFormat;
        large: StrapiImageFormat;
        medium: StrapiImageFormat;
        small: StrapiImageFormat;
        [key: string]: StrapiImageFormat;
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

const CACHE_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 1 week

export const downloadPicture = async (picture: StrapiPicture, documentId: string, collectionName: string) : Promise<string> => {

    // Create directory if it doesn't exist
    const pictureDir = path.join(process.cwd(), 'public', collectionName);
    if (!fs.existsSync(pictureDir)) {
        fs.mkdirSync(pictureDir, { recursive: true });
    }

    // Base image filename & path
    const filePath = path.join(pictureDir, documentId + picture.ext);
    const filePublicUrl = `/${collectionName}/${documentId}${picture.ext}`;

    // Check cache freshness
    if (fs.existsSync(filePath)) {
        const { mtimeMs } = fs.statSync(filePath);
        if (Date.now() - mtimeMs < CACHE_DURATION_MS) {
            console.log(`Using cached profile picture for ${documentId}`);
            picture.url = filePublicUrl;
            return filePublicUrl;
        } else {
            fs.unlinkSync(filePath);
        }
    }

    // Download base image if missing
    if (!fs.existsSync(filePath)) {
        const response = await axios({
            url: 'https://strapi.rbg.tum-blockchain.com' + picture.url,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        
        await new Promise<void>((resolve, reject) => {
            writer.on('finish', () => resolve());
            writer.on('error', reject);
        });
        console.log(`Downloaded profile picture for ${documentId}`);

        picture.url = filePublicUrl;
    }

    if (picture.formats) {
        const formats = picture.formats;
        const formatSizes = ['thumbnail', 'small', 'medium', 'large'] as const;
        
        for (const size of formatSizes) {
            if (formats[size]) {
                // Download and save each format
                const formatFileName = `${documentId}_${size}${picture.ext}`;
                const formatFilePath = path.join(pictureDir, formatFileName);
                const fmtPublicUrl = `/${collectionName}/${formatFileName}`;
        
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
                formats[size].url = `/${collectionName}/${formatFileName}`;
            }
        }
    }

    return filePublicUrl;
}