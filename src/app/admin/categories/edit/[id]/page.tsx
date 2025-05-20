"use client";

import AdminProductForm from "@/components/layoutdashboard/AdminProductForm";
import HeaderTitle from "@/components/layoutdashboard/HeaderTitle";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductFormProps {
  _id?: string;
  slug?: string;
  name?: string;
  thumbnail: string;
  category?: string;
  description?: string;
  linktobuy?: string;
  images?: string[];
  price?: string;
  discount?: string;
  details?: string;
  isFeatured?: boolean;
}

const EditProduct = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; 

  const [productInfo, setProductInfo] = useState<ProductFormProps | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (id) {
      fetchProductById(id); 
    }
  }, [id]);

  async function fetchProductById(productId: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/adminproduct/${productId}`
      );
      const response = await res.json();

      if (response.success) {
        setProductInfo(response.product); // Set product info in state
      } else {
        console.error("Failed to fetch product:", response.message);
        router.push("/dashboard"); // Redirect if the product is not found
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false); // Stop loading once done
    }
  }

  // Display loading message while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-4">
      <HeaderTitle
        title="Edit Product"
        path="/categories"
        addItem="Back to Categories"
      />

      {productInfo && <AdminProductForm {...productInfo} />}
    </div>
  );
};

export default EditProduct;
