import type { Meta, StoryObj } from '@storybook/react';
import { MemberCard } from '@/components/member_card';

const meta: Meta<typeof MemberCard> = {
    title: 'MemberCard',
    component: MemberCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock member data
const mockMember = {
    id: 1,
    documentId: 'member1',
    name: 'John Doe',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    publishedAt: '2023-01-01T00:00:00.000Z',
    membership_status: 'core' as const,
    degree: 'master' as const,
    email: 'john.doe@example.com',
    is_board: false,
    profile_picture: {
        id: 1,
        documentId: 'profile1',
        name: 'John Doe Profile',
        alternativeText: null,
        caption: null,
        width: 300,
        height: 300,
        formats: {
            thumbnail: {
                name: 'thumbnail_profile',
                hash: 'thumbnail_hash',
                ext: '.jpg',
                mime: 'image/jpeg',
                path: null,
                width: 156,
                height: 156,
                size: 4.5,
                sizeInBytes: 4500,
                url: 'https://via.placeholder.com/156',
            },
            large: {
                name: 'large_profile',
                hash: 'large_hash',
                ext: '.jpg',
                mime: 'image/jpeg',
                path: null,
                width: 300,
                height: 300,
                size: 15.5,
                sizeInBytes: 15500,
                url: 'https://via.placeholder.com/300',
            },
            medium: {
                name: 'medium_profile',
                hash: 'medium_hash',
                ext: '.jpg',
                mime: 'image/jpeg',
                path: null,
                width: 250,
                height: 250,
                size: 10.5,
                sizeInBytes: 10500,
                url: 'https://via.placeholder.com/250',
            },
            small: {
                name: 'small_profile',
                hash: 'small_hash',
                ext: '.jpg',
                mime: 'image/jpeg',
                path: null,
                width: 200,
                height: 200,
                size: 7.5,
                sizeInBytes: 7500,
                url: 'https://via.placeholder.com/200',
            },
        },
        hash: 'profile_hash',
        ext: '.jpg',
        mime: 'image/jpeg',
        size: 15.5,
        url: 'https://via.placeholder.com/300',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        publishedAt: '2023-01-01T00:00:00.000Z',
    },
    social_media: [
        {
            id: 1,
            platform: 'LinkedIn',
            link: 'https://linkedin.com/in/johndoe',
        },
        {
            id: 2,
            platform: 'GitHub',
            link: 'https://github.com/johndoe',
        }
    ],
    departments: [
        {
            id: 1,
            documentId: 'dept1',
            name: 'Engineering',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
            discord_role_id: null,
            description: 'Engineering department',
            short_name: 'Eng',
        }
    ],
};

// Default story
export const Default: Story = {
    args: {
        member: mockMember,
    },
};

// Without Profile Picture
export const WithoutProfilePicture: Story = {
    args: {
        member: {
            ...mockMember,
            profile_picture: null,
        },
    },
};

// Trainee Member
export const TraineeMember: Story = {
    args: {
        member: {
            ...mockMember,
            name: 'Jane Smith',
            membership_status: 'trainees',
        },
    },
};
