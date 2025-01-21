import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";

import { NewsEditForm, createNews } from "@entities/news";
import type { INewsCreateValues } from "@entities/news/model/types/news";
import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";

import { newsRoutesPaths } from "./routesPaths";

const NewsCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(newsRoutesPaths.news.URL());

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleNewsCreate = useCallback((values: INewsCreateValues) => {
    if (!values.photo || !values.photo[0]?.response?.code) return;

    void dispatch(
      createNews({
        title: values.title,
        date: dayjs(values.date).format("YYYY-MM-DD HH:mm:ss"),
        content: values.content,
        photo: convertIFileResponseToPhotoListItem(values.photo[0].response)
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") onBack();
    });
  }, []);

  return (
    <>
      <PageHeader title={newsRoutesPaths.news_create.title} onBack={onBack} />
      <NewsEditForm onSave={handleNewsCreate} onCancel={onBack} />
    </>
  );
};

export default NewsCreate;
