import { PageHeader } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@app/index";
import { convertIFileResponseToPhotoListItem } from "@shared/models/files";
import { INewsCreateValues } from "@entities/news/model/types/news";
import { NewsEditForm, createNews } from "@entities/news";

import { newsRoutes } from "./Routes";

const NewsCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      if (res.meta.requestStatus === "fulfilled")
        navigate(newsRoutes.news.URL());
    });
  }, []);

  return (
    <>
      <PageHeader
        title={newsRoutes.news_create.title}
        onBack={() => navigate(newsRoutes.news.URL())}
      />
      <NewsEditForm
        onSave={handleNewsCreate}
        onCancel={() => navigate(newsRoutes.news.URL())}
      />
    </>
  );
};

export default NewsCreate;
