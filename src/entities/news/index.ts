import { INewsListItem, INewsDetail } from "./model/types/news";
import { newsReducer, newsActions, INewsSchema } from "./model/slice/newsSlice";
import {
  newsSelectors,
  getNewsLoading,
  getNewsDetail,
  getNewsPagination
} from "./model/selectors/newsSelectors";
import { createNews } from "./model/service/createNews";
import { deleteNews } from "./model/service/deleteNews";
import { editNews } from "./model/service/editNews";
import { fetchNews } from "./model/service/fetchNews";
import { fetchNewsDetail } from "./model/service/fetchNewsDetail";
import { NewsList } from "./ui/NewsList";
import { NewsEditForm } from "./ui/NewsEditForm";

export type { INewsListItem, INewsDetail, INewsSchema };
export { newsReducer, newsActions };
export { newsSelectors, getNewsLoading, getNewsDetail, getNewsPagination };

export { createNews, deleteNews, editNews, fetchNews, fetchNewsDetail };
export { NewsList, NewsEditForm };
