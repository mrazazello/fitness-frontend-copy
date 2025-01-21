import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  NewsEditForm,
  editNews,
  fetchNewsDetail,
  getNewsDetail,
  getNewsLoading,
  newsActions
} from "@entities/news";
import type { INewsEditValues } from "@entities/news/model/types/news";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";

import PageNotFound from "../404/PageNotFound";

import { newsRoutesPaths } from "./routesPaths";

const NewsEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(newsActions.resetDetail());
    navigateBack(newsRoutesPaths.news.URL());
  }, []);

  useEffect(() => {
    dispatch(errorActions.resetErrors());
    if (id) dispatch(fetchNewsDetail(id));
  }, [id]);

  const newsDetail = useAppSelector(getNewsDetail);
  const loading = useAppSelector(getNewsLoading);

  const handleNewsEdit = useCallback(
    (values: INewsEditValues) => {
      if (!newsDetail || !values.photo || !values.photo[0]?.response?.code)
        return;

      void dispatch(
        editNews({
          ...values,
          code: newsDetail.code,
          date: dayjs(values.date).format("YYYY-MM-DD HH:mm:ss"),
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
        title={`${newsRoutesPaths.news_edit.title}: ${newsDetail.title}`}
        onBack={onBack}
      />
      <NewsEditForm
        newsDetail={newsDetail}
        loading={loading === "loading"}
        onSave={handleNewsEdit}
        onCancel={onBack}
      />
    </>
  );
};

export default NewsEdit;
