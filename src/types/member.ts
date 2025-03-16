export interface Department {
    name: string;
}

export interface Member {
    name: string;
    image: string;
    role: string;
    department: Department;
    linkedin: string;
    github: string;
    x: string;
    telegram: string;
    website: string;
    description: string;
    email: string;
    isAlumni: boolean;
}