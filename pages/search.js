import Card from "../components/Card";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { useFetchUser } from "../lib/authContext";
import qs from "qs";
import { useRouter } from "next/router";
import Search from "../components/Search";
import RecentArticles from "../components/RecentArticles";

const News = ({ articles, categories }) => {
  const { user } = useFetchUser();
  const router = useRouter();

  const searchQuery = articles.filter((query) =>
    query.attributes.content.toLowerCase().includes(router.query.term)
  );

  return (
    <Layout user={user} categories={categories}>
      <div className="flex justify-center m-auto mb-3 py-16 max-w-[1100px]">
        <div className="flex flex-col px-4">
          <div className="flex text-4xl font-thin mb-5 uppercase tracking-widest">
            <div>Search Results for:</div>
            <div className="font-medium">{router.query.term}</div>
          </div>
          {searchQuery.length === 0 ? (
            <div className="text-4xl font-thin mb-5 uppercase tracking-widest">
              No News
            </div>
          ) : (
            <div className="flex flex-col">
              {searchQuery &&
                searchQuery.map((article) => {
                  return (
                    <Card
                      article={article}
                      key={`article__${article.attributes.slug}`}
                    />
                  );
                })}
            </div>
          )}
        </div>
        <div className="flex flex-col px-4">
          <Search />
          <div className="flex flex-col bg-white rounded-lg">
            <div className="text-2xl uppercase color-[#212b38] px-5 pt-5">
              Recent Articles
            </div>
            <RecentArticles
              articles={[
                articles[0],
                articles[1],
                articles[2],
                articles[3],
                articles[4],
              ]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: term }, { detail_contains: term }],
    },
  });

  const articlesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/articles?${query}`
  );

  const categoriesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/categories`
  );

  return {
    props: {
      articles: articlesResponse.data,
      categories: categoriesResponse.data,
    },
  };
}

export default News;
