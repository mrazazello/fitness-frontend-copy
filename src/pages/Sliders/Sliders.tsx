import { Button, Card, PageHeader } from "antd";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import type { ISliderListItem } from "@entities/sliders";
import {
  SlidersList,
  fetchSliders,
  getSlidersLoading,
  getSlidersPagination,
  slidersSelectors,
  toggleSlider
} from "@entities/sliders";
import { ShowErrorMessages, errorActions } from "@shared/api/error";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useAppStore";
import { useNavigateBack } from "@shared/hooks/useNavigateBack";
import useTableFilters from "@shared/hooks/useTableFilters";
import { addReactKeyByProperty } from "@shared/utils/addReactKey";

import { slidersRoutesPaths } from "./routesPaths";

const Sliders = () => {
  const { navigateSave } = useNavigateBack();
  const dispatch = useAppDispatch();
  const { onPageChange } = useTableFilters();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    void dispatch(errorActions.resetErrors());
    void dispatch(fetchSliders(Number(searchParams.get("page")) || 1));
  }, [searchParams]);

  const loading = useAppSelector(getSlidersLoading);
  const pagination = useAppSelector(getSlidersPagination);
  const sliders = addReactKeyByProperty<ISliderListItem>(
    useAppSelector(slidersSelectors.selectAll),
    "code"
  );

  const handleTogleSlider = (slider: ISliderListItem) => {
    void dispatch(toggleSlider(slider));
  };

  return (
    <>
      <PageHeader
        title="Слайдеры"
        extra={
          <Link to={slidersRoutesPaths.slider_create.URL()}>
            <Button type="primary">
              {slidersRoutesPaths.slider_create.title}
            </Button>
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
            navigateSave(slidersRoutesPaths.slider_edit.URL(code))
          }
          onToggle={handleTogleSlider}
        />
      </Card>
    </>
  );
};

export default Sliders;
