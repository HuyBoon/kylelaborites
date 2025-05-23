// PRODUCTS
export async function getProducts(page = 1, limit = 6) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}&limit=${limit}`)

        // Kiểm tra xem phản hồi có thành công không
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const products = data.products || []; // Sử dụng mảng rỗng nếu không có sản phẩm
        const totalProducts = data.totalProducts || 0; // Đặt giá trị mặc định cho tổng số sản phẩm
        return { products, totalProducts };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], totalProducts: 0 }; // Trả về giá trị mặc định trong trường hợp lỗi
    }
}

export async function getAllProducts() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const products = data.products || [];
        return products;
    } catch (error) {
        console.error("Error fetching all products:", error);
        return []; // Trả về mảng rỗng trong trường hợp lỗi
    }
}

// BLOGS
export async function getBlogs(page = 1, limit = 6) {
    try {
        0
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog?page=${page}&limit=${limit}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const blogs = data.blogs || []; // Sử dụng mảng rỗng nếu không có blog
        const totalBlogs = data.totalBlogs || 0; // Đặt giá trị mặc định cho tổng số blog
        return { blogs, totalBlogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { blogs: [], totalBlogs: 0 }; // Trả về giá trị mặc định trong trường hợp lỗi
    }
}

export async function getAllBlogs() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const blogs = data.blogs || [];
        return blogs;
    } catch (error) {
        console.error("Error fetching all blogs:", error);
        return []; // Trả về mảng rỗng trong trường hợp lỗi
    }
}
