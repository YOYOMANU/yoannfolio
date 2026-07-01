export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type Technology = {
    id: string;
    name: string;
    slug: string;
    image?: string;
    categories: Category[];
}
export type Category = {
    id: string;
    name: string;
    description?: string;
    technologies: Technology[];
}


export type ContactForm = {
    name: string
    email: string
    subject: string
    message: string
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    category: string;
    short_description: string;
    long_description: string;
    problem: string;
    solution: string;
    role: string;
    context: string;
    swatch_class: string;
    live_url?: string;
    repo_url?: string;
    is_featured: boolean;
    status: string;
    image?: string;
    technologies: Technology[];
    features: ProjectFeature[];

}

export type ProjectFeature = {
    id: string;
    title: string;
    description: string;
};

export type PreviewState = {
    title: string;
    category: string;
    short_description: string;
    swatch_class: string;
    role: string;
    context: string;
    live_url: string;
    repo_url: string;
    status: string;
    is_featured: boolean;
    image: string | null;
};


export type SelectOption = {
    label: string
    value: string
}



export type PaginatedCollection<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
};