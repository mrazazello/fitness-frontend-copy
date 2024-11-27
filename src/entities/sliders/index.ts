import {
  ISliderListItem,
  ISliderDetail,
  ISliderEditValues,
  ISliderEditRequest
} from "./model/types/sliders";
import {
  sliderReducer,
  sliderActions,
  ISlidersSchema
} from "./model/slice/slidersSlice";
import {
  slidersSelectors,
  getSlidersLoading,
  getSlidersPagination,
  getSliderDetail
} from "./model/selectors/slidersSelectors";
import { createSlider } from "./model/service/createSlider";
import { deleteSlider } from "./model/service/deleteSlider";
import { editSlider } from "./model/service/editSlider";
import { fetchSlider } from "./model/service/fetchSlider";
import { fetchSliders } from "./model/service/fetchSliders";
import { toggleSlider } from "./model/service/toggleSlider";
import { SlidersList } from "./ui/SlidersList";
import { SliderEditForm } from "./ui/SliderEditForm";

export type {
  ISliderListItem,
  ISliderDetail,
  ISliderEditValues,
  ISliderEditRequest,
  ISlidersSchema
};
export { sliderReducer, sliderActions };
export {
  slidersSelectors,
  getSlidersLoading,
  getSlidersPagination,
  getSliderDetail
};
export {
  createSlider,
  deleteSlider,
  editSlider,
  fetchSlider,
  fetchSliders,
  toggleSlider
};
export { SlidersList, SliderEditForm };
