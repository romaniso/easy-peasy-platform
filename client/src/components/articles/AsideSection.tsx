import { decodeAndFormatURL } from "../../utils/decodeAndFormatUrl";
import { AsidePreview } from "./AsidePreview";
import { PreviewArticle } from "../../types/previewArticle";

interface Props {
  data?: PreviewArticle[] | null;
  title: string;
}

export const AsideSection = ({ data, title }: Props) => {
  if (!data)
    return (
      <aside className="flex-1 basis-full md:basis-1/4">
        <h3 className="text-2xl font-bold text-orange-500 drop-shadow mb-2">
          {/*No {title}*/}
          <p>Loading...</p>
        </h3>
      </aside>
    );

  return (
    <aside className="flex-1 basis-full md:basis-1/4">
      <h3 className="text-2xl font-bold text-orange-500 drop-shadow mb-2">
        {title}
      </h3>
      <section className="flex flex-col gap-2">
        {data.map(({ id, title, introduction, img, level }) => {
          return (
            <AsidePreview
              key={id}
              title={title}
              introduction={introduction}
              link={`${decodeAndFormatURL(level)}/${decodeAndFormatURL(title)}`}
              imgSrc={img}
            />
          );
        })}
      </section>
    </aside>
  );
};
