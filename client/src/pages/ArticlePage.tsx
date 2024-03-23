import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import useTop from "../hooks/useTop";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { RecentPreview } from "../components/articles/RecentPreview";
import { Article } from "../interfaces/article";
import { Badge } from "../components/common/Badge";
import ReactMarkdown from "react-markdown";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

import { ShareButtons } from "../components/common/ShareButtons";

const ARTICLE_URL = "/articles";
export const ArticlePage = () => {
  const [data, setData] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useTop();
  const { article, level } = useParams();

  const currentPageUrl = window.location.href;

  useEffect(() => {
    (async () => {
      try {
        const articleId = `${level}-${article}`;
        const url = `${ARTICLE_URL}/${articleId}`;
        const data = (await axios.get(url)).data;
        setData(data.article);

        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <div className="relative">
      <img
        src={data?.imgBase64}
        alt=""
        className="absolute inset-0 w-full h-[250px] md:h-[360px] object-cover dark:brightness-50 opacity-20"
      />
      <div className="py-16 md:py-24 container mx-auto px-4 flex gap-5 flex-wrap md:flex-nowrap relative z-10">
        <main className="flex-1 basis-full md:basis-3/4">
          {/*<main className="w-full md:w-3/4 overflow-hidden">*/}
          <Breadcrumbs />
          <h1 className="text-4xl md:text-6xl text-center md:text-left font-bold text-orange-500 drop-shadow mb-6 md:mb-8">
            {data?.title}
          </h1>
          <section className="flex items-center justify-between gap-5 md:justify-between ">
            <div className="flex gap-2 items-center justify-center md:justify-start">
              <Badge accent>{data?.level as string}</Badge>
              <Badge>{data?.section as string}</Badge>
              <p className="hidden md:block ml-2 text-sm text-indigo-900 dark:text-indigo-200">
                This article you will read in{" "}
                <strong>{data?.readTime} min</strong>
              </p>
            </div>
            <div className="flex gap-1 items-center justify-center md:justify-end">
              <ShareButtons currentUrl={currentPageUrl} />
            </div>
          </section>
          <section className="md:mt-8 flex flex-col items-center">
            <ReactMarkdown className="markdown-content">
              {data?.data}
            </ReactMarkdown>
            <Link to="/">
              <Button primary rounded>
                Practice
              </Button>
            </Link>
          </section>
        </main>
        <aside className="flex-1 basis-full md:basis-1/4">
          <h3 className="text-2xl font-bold text-orange-500 drop-shadow mb-2">
            Related Articles
          </h3>
          <section className="flex flex-col gap-2">
            <RecentPreview
              key={1}
              title="Lorem"
              introduction="Lorem lorem lorem lorem lorem"
              link="/"
              imgSrc={data?.imgBase64}
            />
            <RecentPreview
              key={1}
              title="Lorem"
              introduction="Lorem lorem lorem lorem lorem"
              link="/"
              imgSrc={data?.imgBase64}
            />
            <RecentPreview
              key={1}
              title="Lorem"
              introduction="Lorem lorem lorem lorem lorem"
              link="/"
              imgSrc={data?.imgBase64}
            />
            <RecentPreview
              key={1}
              title="Lorem"
              introduction="Lorem lorem lorem lorem lorem"
              link="/"
              imgSrc={data?.imgBase64}
            />
          </section>
        </aside>
      </div>
    </div>
  );
};
