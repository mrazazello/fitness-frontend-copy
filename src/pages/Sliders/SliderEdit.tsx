import { PageHeader } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  ISliderEditValues,
  SliderEditForm,
  editSlider,
  fetchSlider,
  getSliderDetail,
  getSlidersLoading
} from "@entities/sliders";

import PageNotFound from "../404/PageNotFound";

import { slidersRoutes } from "./Routes";

const SliderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        title={`${slidersRoutes.slider_edit.title}: ${sliderDetail.title}`}
        onBack={() => navigate(slidersRoutes.sliders.URL())}
      />
      <SliderEditForm
        sliderDetail={sliderDetail}
        loading={loading === "loading"}
        onSave={handleSliderEdit}
        onCancel={() => navigate(slidersRoutes.sliders.URL())}
      />
    </>
  );
};

export default SliderEdit;
