import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  INewsListItem,
  NewsList,
  fetchNews,
  getNewsLoading,
  getNewsPagination,
  newsSelectors
} from "@entities/news";

import { newsRoutes } from "./Routes";

const News = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchNews(1));
  }, []);

  const loading = useAppSelector(getNewsLoading);
  const pagination = useAppSelector(getNewsPagination);

  const news = addReactKeyByProperty<INewsListItem>(
    useAppSelector(newsSelectors.selectAll),
    "code"
  );

  const onPageChange = (page: number) => {
    void dispatch(fetchNews(page));
  };

  return (
    <>
      <PageHeader
        title="Новости"
        extra={
          <Link to={newsRoutes.news_create.URL()}>
            <Button type="primary">{newsRoutes.news_create.title}</Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <NewsList
          news={news}
          loading={loading === "loading"}
          onEdit={(code: string) => navigate(newsRoutes.news_edit.URL(code))}
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </Card>
    </>
  );
};

export default News;
