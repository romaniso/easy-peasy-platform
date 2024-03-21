import { PreviewArticle } from "../../types/previewArticle";
import { RecentPreview } from "./RecentPreview";
import { decodeAndFormatURL } from "../../utils/decodeAndFormatUrl";

interface Props {
  data: PreviewArticle[];
}

export const RecentSection = ({ data }: Props) => {
  return (
    <section className="flex flex-col gap-2">
      {data.map(({ id, title, introduction, img, level }) => {
        return (
          <RecentPreview
            key={id}
            title={title}
            introduction={introduction}
            link={`${decodeAndFormatURL(level)}/${decodeAndFormatURL(title)}`}
            imgSrc={img}
          />
        );
      })}
    </section>
  );
};
