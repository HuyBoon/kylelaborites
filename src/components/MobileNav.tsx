import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

const links = [
  { name: "home", path: "/" },
  { name: "products", path: "/products" },
  { name: "blog", path: "/blog" },
  { name: "contact", path: "/contact" },
];

interface MobileNavProps {
  openNav: boolean;
  onClose: () => void;
}

const MobileNav: FC<MobileNavProps> = ({ openNav, onClose }) => {
  const pathname = usePathname();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Khi menu mở, thêm lớp vào body để vô hiệu hóa cuộn
    if (openNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup khi component unmount hoặc menu đóng
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openNav]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  return (
    <>
      {/* Overlay */}
      {!isClosing && (
        <div
          className="fixed z-100 inset-0 min-h-screen bg-white w-[100%] bg-opacity-80 transition-opacity duration-500"
          onClick={handleClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white dark:bg-dark z-100 w-[90%] min-h-screen transform transition-transform duration-500 ease-in-out ${
          isClosing ? "animate-slide-out" : "animate-slide-in"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-8 shadow-md">
          <h1 className="text-4xl font-semibold text-accent dark:text-light">
            KYLE
          </h1>

          <X
            onClick={handleClose}
            className="cursor-pointer text-[#1e2327] dark:text-light"
            size={28}
          />
        </div>
        <p className="mt-4 text-lg text-center text-accent dark:text-light leading-relaxed ">
          Nơi vẻ đẹp tự nhiên được <br />
          nâng niu và tỏa sáng từ sâu bên trong
        </p>
        <nav className="flex flex-col justify-center items-center gap-8 mt-10">
          {links.map((link, i) => (
            <Link
              href={link.path}
              key={i}
              onClick={handleClose}
              className={`${
                link.path === pathname
                  ? "text-accent border-b-2 border-accent dark:text-light dark:border-light"
                  : "text-[#1e2327] dark:text-gray-500"
              } text-2xl capitalize hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 w-full">
          <p className="text-center text-accent dark:text-gray-200">
            © 2024 KYLE. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
