"use client";

import AdminBlogForm from "@/components/layoutdashboard/AdminBlogForm";
import React, { useState } from "react";

const AddBlog = () => {
  return (
    <div className="m-4">
      <h2 className="text-2xl font-bold mb-4">Viết Blog</h2>

      <div className="mt-8">
        <AdminBlogForm />
      </div>
    </div>
  );
};

export default AddBlog;
