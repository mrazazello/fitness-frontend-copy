import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@app/index";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";
import {
  fetchSliders,
  getSlidersLoading,
  getSlidersPagination,
  ISliderListItem,
  SlidersList,
  slidersSelectors,
  toggleSlider
} from "@entities/sliders";

import { slidersRoutes } from "./Routes";

const Sliders = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchSliders(1));
  }, []);

  const loading = useAppSelector(getSlidersLoading);
  const pagination = useAppSelector(getSlidersPagination);
  const sliders = addReactKeyByProperty<ISliderListItem>(
    useAppSelector(slidersSelectors.selectAll),
    "code"
  );

  const handleTogleSlider = (slider: ISliderListItem) => {
    void dispatch(toggleSlider(slider));
  };

  const onPageChange = (page: number) => {
    void dispatch(fetchSliders(page));
  };

  return (
    <>
      <PageHeader
        title="Слайдеры"
        extra={
          <Link to={slidersRoutes.slider_create.URL()}>
            <Button type="primary">{slidersRoutes.slider_create.title}</Button>
          </Link>
        }
      />
      <Card>
        <ShowErrorMessages />
        <SlidersList
          sliders={sliders}
          loading={loading === "loading"}
          pagination={pagination}
          onPageChange={onPageChange}
          onEdit={(code: string) =>
            navigate(slidersRoutes.slider_edit.URL(code))
          }
          onToggle={handleTogleSlider}
        />
      </Card>
    </>
  );
};

export default Sliders;
