import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import useTop from "../hooks/useTop";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Article } from "../interfaces/article";
import { Badge } from "../components/common/Badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { ShareButtons } from "../components/common/ShareButtons";
import { decodeAndFormatURL } from "../utils/decodeAndFormatUrl";
import { AsideSection } from "../components/articles/AsideSection";
import { PreviewArticle } from "../types/previewArticle";
import { Loader } from "../components/common/Loader";

const ARTICLE_URL = "/articles";
export const ArticlePage = () => {
  const [articleData, setArticleData] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<
    PreviewArticle[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useTop();
  const { article, level } = useParams();

  const currentPageUrl = window.location.href;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleId = `${level}-${article}`;
        const url = `${ARTICLE_URL}/${articleId}`;
        const res = (await axios.get(url)).data;
        setArticleData(res.article);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, [article, level]);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      const relatedUrl = `${ARTICLE_URL}/related?title=${decodeAndFormatURL(
        articleData?.title as string
      )}&section=${articleData?.section}`;

      const { relatedArticles } = (await axios.get(relatedUrl)).data;
      setRelatedArticles(relatedArticles);
    };

    fetchRelatedArticles();
  }, [articleData]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      <img
        src={articleData?.imgBase64}
        alt=""
        className="absolute inset-0 w-full h-[250px] md:h-[360px] object-cover dark:brightness-50 opacity-20"
      />
      <div className="py-16 md:py-24 container mx-auto px-4 flex gap-5 flex-wrap md:flex-nowrap relative z-10">
        <main className="flex-1 basis-full md:basis-3/4">
          <Breadcrumbs withoutLevels />
          <h1 className="text-4xl md:text-6xl text-center md:text-left font-bold text-orange-500 drop-shadow mb-6 md:mb-8">
            {articleData?.title}
          </h1>
          <section className="flex items-center justify-between gap-5 md:justify-between ">
            <div className="flex gap-2 items-center justify-center md:justify-start">
              <Badge accent>{articleData?.level as string}</Badge>
              <Badge>{articleData?.section as string}</Badge>
              <p className="hidden md:block ml-2 text-sm text-indigo-900 dark:text-indigo-200">
                This article you will read in{" "}
                <strong>{articleData?.readTime} min</strong>
              </p>
            </div>
            <div className="flex gap-1 items-center justify-center md:justify-end">
              <ShareButtons currentUrl={currentPageUrl} />
            </div>
          </section>
          <section className="md:mt-8 flex flex-col items-center">
            <ReactMarkdown
              className="markdown-content"
              remarkPlugins={[remarkGfm]}
            >
              {articleData?.data}
            </ReactMarkdown>
            <Link to={`../${articleData?.section}/${articleData?.apiKey}`}>
              <Button primary rounded>
                Practice
              </Button>
            </Link>
          </section>
        </main>
        {relatedArticles && (
          <AsideSection
            title="Related Articles"
            data={relatedArticles}
            pathRoot="../articles/"
          />
        )}
      </div>
    </div>
  );
};
