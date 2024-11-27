import { PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@app/index";
import {
  ISliderEditValues,
  SliderEditForm,
  createSlider
} from "@entities/sliders";

import { slidersRoutes } from "./Routes";

const SliderCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleSliderCreate = useCallback((values: ISliderEditValues) => {
    void dispatch(createSlider(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled")
        navigate(slidersRoutes.sliders.URL());
    });
  }, []);

  return (
    <>
      <PageHeader
        title={slidersRoutes.slider_create.title}
        onBack={() => navigate(-1)}
      />
      <SliderEditForm
        onSave={handleSliderCreate}
        onCancel={() => navigate(slidersRoutes.sliders.URL())}
      />
    </>
  );
};

export default SliderCreate;
