import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import type { INewsListItem } from "@entities/news";
import {
  NewsList,
  fetchNews,
  getNewsLoading,
  getNewsPagination,
  newsSelectors
} from "@entities/news";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import useTableFilters from "@shared/hooks/useTableFilters";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { newsRoutesPaths } from "./routesPaths";

const News = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { onPageChange } = useTableFilters();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchNews(Number(searchParams.get("page")) || 1));
  }, [searchParams]);

  const loading = useAppSelector(getNewsLoading);
  const pagination = useAppSelector(getNewsPagination);

  const news = addReactKeyByProperty<INewsListItem>(
    useAppSelector(newsSelectors.selectAll),
    "code"
  );

  return (
    <>
      <PageHeader
        title="Новости"
        extra={
          <Link to={newsRoutesPaths.news_create.URL()}>
            <Button type="primary">{newsRoutesPaths.news_create.title}</Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <NewsList
          news={news}
          loading={loading === "loading"}
          onEdit={(code: string) =>
            navigateSave(newsRoutesPaths.news_edit.URL(code))
          }
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </Card>
    </>
  );
};

export default News;
