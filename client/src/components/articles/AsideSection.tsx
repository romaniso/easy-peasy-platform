import { decodeAndFormatURL } from "../../utils/decodeAndFormatUrl";
import { AsidePreview } from "./AsidePreview";
import { PreviewArticle } from "../../types/previewArticle";
import { TableOfContents } from "../common/TableOfContents/TableOfContents";
import { Article } from "../../interfaces/article";

interface AsideSectionProps {
  article: Article | null;
  data: PreviewArticle[];
  title: string;
  pathRoot?: string;
}

export const AsideSection = ({
  article,
  data,
  title,
  pathRoot,
}: AsideSectionProps): JSX.Element => {
  return (
    <aside className="flex-1 basis-full md:basis-1/4 flex flex-col gap-5">
      <div>
        <h3 className="text-2xl font-bold text-orange-500 drop-shadow mb-2">
          {title}
        </h3>
        <section className="flex flex-col gap-2">
          {data.map(({ id, title, introduction, img, level }) => {
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
      {article?.data && <TableOfContents title="On this page" data={article} />}
    </aside>
  );
};
