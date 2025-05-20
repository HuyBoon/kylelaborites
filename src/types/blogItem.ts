export interface BlogItemProps {
    _id: string;
    title: string;
    slug: string;
    tags: string[];
    description: string;
    thumbnail: string; // Array of image URLs
    content: string;
}
