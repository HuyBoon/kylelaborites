
import { FC } from "react";
import { useRouter } from "next/navigation";

// Define the type for the props
interface HeaderTitleProps {
  title: string;
  path: string;
  addItem: string;
}

const HeaderTitle: FC<HeaderTitleProps> = ({ title, path, addItem }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg p-2 ">
      <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
      <button
        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 max-w-max"
        onClick={() => router.push(path)}
      >
        {addItem}
      </button>
    </div>
  );
};

export default HeaderTitle;
