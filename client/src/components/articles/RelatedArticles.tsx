import { PreviewArticle } from "../../types/previewArticle";
import { decodeAndFormatURL } from "../../utils/decodeAndFormatUrl";
import { AsidePreview } from "./AsidePreview";

interface RelatedArticlesProps {
  title?: string;
  relatedArticles: PreviewArticle[];
  pathRoot?: string;
}

export const RelatedArticles = ({
  title,
  relatedArticles,
  pathRoot,
}: RelatedArticlesProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-orange-500 drop-shadow mb-2">
        {title}
      </h3>
      <section className="flex flex-col gap-2">
        {relatedArticles.map(({ id, title, introduction, img, level }) => {
          const link = `${pathRoot ? pathRoot : ""}${decodeAndFormatURL(
            level
          )}/${decodeAndFormatURL(title)}`;
          return (
            <AsidePreview
              key={id}
              title={title}
              introduction={introduction}
              link={link}
              imgSrc={img}
            />
          );
        })}
      </section>
    </div>
  );
};
