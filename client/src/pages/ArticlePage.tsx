import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import useTop from "../hooks/useTop";

export const ArticlePage = () => {
  useTop();

  const { article } = useParams();
  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-4xl md:text-6xl text-center font-bold text-orange-500 drop-shadow mb-6 md:mb-8">
        {article}
      </h1>
      <Breadcrumbs />
    </div>
  );
};
