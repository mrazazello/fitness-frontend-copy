import { UploadProps } from "antd/lib/upload/interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { UploadRequestError } from "rc-upload/lib/interface";

import backendPaths from "@shared/constants/backendPaths";
import { ICreateFileResponse } from "@shared/models/files";

type RcCustomRequestOptions<T = any> = Parameters<
  Exclude<UploadProps<T>["customRequest"], undefined>
>[0];

const customUpload = async (options: RcCustomRequestOptions) => {
  const { onSuccess, onError, file, onProgress } = options;

  const fmData = new FormData();
  const config: any = {
    headers: { "Content-type": "multipart/form-data" },
    onUploadProgress: ({
      total,
      loaded
    }: {
      total: number;
      loaded: number;
    }) => {
      onProgress &&
        onProgress({
          percent: Number(Math.round((loaded / total) * 100).toFixed(2))
        });
    }
  };

  fmData.append("file", file);

  try {
    const response = await axios.post<
      AxiosRequestConfig<any>,
      AxiosResponse<ICreateFileResponse>
    >(backendPaths.FILES_UPLOAD_URL(), fmData, config);
    console.log("response: ", response);

    if (response.status === 200) {
      onSuccess && onSuccess(response.data.file);
    }
  } catch (err) {
    const error: UploadRequestError = new Error("Ошибка загрузки файла");
    onError && onError(error);
  }
};

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    // eslint-disable-next-line
    return e;
  }
  // eslint-disable-next-line
  return e && e.fileList;
};

export default customUpload;
