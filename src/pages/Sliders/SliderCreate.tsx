import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";

import type { ISliderEditValues } from "@entities/sliders";
import { SliderEditForm, createSlider } from "@entities/sliders";
import { errorActions } from "@shared/api/error";
import { useAppDispatch } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import { slidersRoutesPaths } from "./routesPaths";

const SliderCreate = () => {
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();
  const onBack = () => navigateBack(slidersRoutesPaths.sliders.URL());

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
  }, []);

  const handleSliderCreate = useCallback((values: ISliderEditValues) => {
    void dispatch(createSlider(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") onBack();
    });
  }, []);

  return (
    <>
      <PageHeader
        title={slidersRoutesPaths.slider_create.title}
        onBack={onBack}
      />
      <SliderEditForm onSave={handleSliderCreate} onCancel={onBack} />
    </>
  );
};

export default SliderCreate;
