import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import {
  NewsEditForm,
  editNews,
  fetchNewsDetail,
  getNewsDetail,
  getNewsLoading
} from "@entities/news";
import { INewsEditValues } from "@entities/news/model/types/news";

import PageNotFound from "../404/PageNotFound";

import { newsRoutes } from "./Routes";

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    id && dispatch(fetchNewsDetail(id));
  }, [id]);

  const newsDetail = useAppSelector(getNewsDetail);
  const loading = useAppSelector(getNewsLoading);

  const handleNewsEdit = useCallback(
    (values: INewsEditValues) => {
      if (!newsDetail || !values.photo || !values.photo[0]?.response?.code)
        return;

      void dispatch(
        editNews({
          code: newsDetail.code,
          date: dayjs(values.date).format("YYYY-MM-DD HH:mm:ss"),
          title: values.title,
          content: values.content,
          photo: convertIFileResponseToPhotoListItem(values.photo[0].response)
        })
      );
    },
    [newsDetail]
  );

  if (!id || loading === "failed") return <PageNotFound />;

  if (!newsDetail) return null;

  return (
    <>
      <PageHeader
        title={`${newsRoutes.news_edit.title}: ${newsDetail.title}`}
        onBack={() => navigate(newsRoutes.news.URL())}
      />
      <NewsEditForm
        newsDetail={newsDetail}
        loading={loading === "loading"}
        onSave={handleNewsEdit}
        onCancel={() => navigate(newsRoutes.news.URL())}
      />
    </>
  );
};

export default NewsEdit;
