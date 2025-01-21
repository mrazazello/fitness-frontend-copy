import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { ISliderEditValues } from "@entities/sliders";
import {
  SliderEditForm,
  editSlider,
  fetchSlider,
  getSliderDetail,
  getSlidersLoading,
  sliderActions
} from "@entities/sliders";
import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";

import PageNotFound from "../404/PageNotFound";
import { slidersRoutesPaths } from "./routesPaths";

const SliderEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { navigateBack } = useNavigateBack();

  const onBack = useCallback(() => {
    dispatch(sliderActions.resetDetail());
    navigateBack(slidersRoutesPaths.sliders.URL());
  }, []);

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    if (id) void dispatch(fetchSlider(id));
  }, [id]);

  const sliderDetail = useAppSelector(getSliderDetail);
  const loading = useAppSelector(getSlidersLoading);

  const handleSliderEdit = useCallback(
    (values: ISliderEditValues) => {
      if (sliderDetail) {
        void dispatch(
          editSlider({
            ...values,
            code: sliderDetail.code
          })
        );
      }
    },
    [sliderDetail]
  );

  if (!id || loading === "failed") return <PageNotFound />;

  if (!sliderDetail) return null;

  return (
    <>
      <PageHeader
        title={`${slidersRoutesPaths.slider_edit.title}: ${sliderDetail.title}`}
        onBack={onBack}
      />
      <SliderEditForm
        sliderDetail={sliderDetail}
        loading={loading === "loading"}
        onSave={handleSliderEdit}
        onCancel={onBack}
      />
    </>
  );
};

export default SliderEdit;
