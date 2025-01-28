import { PreviewArticle } from "../../types/previewArticle";
import { TableOfContents } from "../common/TableOfContents/TableOfContents";
import { Article } from "../../interfaces/article";
import { RelatedArticles } from "./RelatedArticles";

interface AsideSectionProps {
  article: Article | null;
  relatedArticles: PreviewArticle[] | null;
  title: string;
  pathRoot?: string;
}

export const AsideSection = ({
  article,
  relatedArticles,
  title,
  pathRoot,
}: AsideSectionProps): JSX.Element => {
  return (
    <aside className="flex-1 basis-full md:basis-1/4 flex flex-col gap-5">
      {relatedArticles && (
        <RelatedArticles
          title={title}
          relatedArticles={relatedArticles}
          pathRoot={pathRoot}
        />
      )}
      {article && <TableOfContents title="On this page" data={article} />}
    </aside>
  );
};
