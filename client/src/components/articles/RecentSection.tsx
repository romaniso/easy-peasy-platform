import { PreviewArticle } from "../../types/previewArticle";
import { RecentPreview } from "./RecentPreview";

interface Props {
  data: PreviewArticle[];
}

export const RecentSection = ({ data }: Props) => {
  return (
    <section className="flex flex-col gap-2">
      {data.map(({ id, title, introduction, img }) => {
        return (
          <RecentPreview
            key={id}
            title={title}
            introduction={introduction}
            link={title}
            imgSrc={img}
          />
        );
      })}
    </section>
  );
};
