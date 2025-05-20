export const uploadImagesToCloudinary = async (file: File): Promise<string[]> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kylefolder');
    formData.append('folder', 'kylefolder');

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return [data.secure_url]; // Returns an array of URLs
    } catch (error) {
        console.error('Error uploading image to Cloudinary', error);
        throw error;
    }
};

export const uploadThumbnailProductToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kylefolder');
    formData.append('folder', 'kylefolder');

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.secure_url; // Returns a single URL as a string
    } catch (error) {
        console.error('Error uploading image to Cloudinary', error);
        throw error;
    }
};
export const uploadThumbnailToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kylefolder');
    formData.append('folder', 'Blog');

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.secure_url; // Returns a single URL as a string
    } catch (error) {
        console.error('Error uploading image to Cloudinary', error);
        throw error;
    }
};

export const uploadBlogImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kylefolder');
    formData.append('folder', 'thumbnailBlog');

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.secure_url; // Returns a single URL as a string
    } catch (error) {
        console.error('Error uploading image to Cloudinary', error);
        throw error;
    }
};
