import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IPhotoListItem } from "@shared/models/photo";
import { IEntitiesState, PartialBy } from "@shared/models/slice";

import {
  IClubAddress,
  IClubDetail,
  IClubEditRequest,
  IClubListItem
} from "../types/clubs";
import { fetchClubs } from "../service/fetchClubs";
import { fetchClub } from "../service/fetchClub";
import { fetchClubAddress } from "../service/fetchClubAddress";
import { fetchClubPhotos } from "../service/fetchClubPhotos";
import { editClubPhotos } from "../service/editClubPhotos";
import { editClub } from "../service/editClub";
import { editAddress } from "../service/editAddress";

export interface IClubSchema extends IEntitiesState {
  entities?: IClubListItem[];
  clubDetail?: IClubDetail;
  clubAddress?: IClubAddress;
  clubPhotos?: IPhotoListItem[];
}

const initialState: IClubSchema = {
  loading: "idle"
};

export const clubsAdapter = createEntityAdapter({
  selectId: (item: IClubListItem) => item.code
});

const clubsSlice = createSlice({
  name: "clubs",
  initialState: clubsAdapter.getInitialState(initialState),
  reducers: {
    resetPhotos: (state) => {
      state.clubPhotos = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.fulfilled, (state, action) => {
        clubsAdapter.addMany(state, action.payload.items);
        state.loading = "idle";
      })
      .addCase(fetchClubs.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchClubs.pending, (state) => {
        state.loading = "loading";
      })
      // fetching club
      .addCase(fetchClub.fulfilled, (state, action) => {
        state.clubDetail = action.payload.detail;
        state.loading = "idle";
      })
      .addCase(fetchClub.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchClub.pending, (state) => {
        state.loading = "loading";
      })
      // fetching address
      .addCase(fetchClubAddress.fulfilled, (state, action) => {
        state.clubAddress = action.payload.address;
        state.loading = "idle";
      })
      .addCase(fetchClubAddress.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchClubAddress.pending, (state) => {
        state.loading = "loading";
      })
      // fetching club photos
      .addCase(fetchClubPhotos.fulfilled, (state, action) => {
        state.clubPhotos = action.payload.photos.items;
        state.loading = "idle";
      })
      .addCase(fetchClubPhotos.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchClubPhotos.pending, (state) => {
        state.loading = "loading";
      })
      // edit club photos
      .addCase(editClubPhotos.fulfilled, (state, action) => {
        state.clubPhotos = action.meta.arg.photos;
        state.loading = "idle";
      })
      .addCase(editClubPhotos.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editClubPhotos.pending, (state) => {
        state.loading = "loading";
      })
      // edit club
      .addCase(editClub.fulfilled, (state, action) => {
        const editedClub: PartialBy<IClubEditRequest, "code"> = action.meta.arg;
        delete editedClub.code;
        state.clubDetail = editedClub;
        state.loading = "idle";
      })
      .addCase(editClub.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editClub.pending, (state) => {
        state.loading = "loading";
      })
      // edit club address
      .addCase(editAddress.fulfilled, (state, action) => {
        const newAddress = {
          ...action.meta.arg
        };
        state.clubAddress = newAddress;
        state.loading = "idle";
      })
      .addCase(editAddress.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editAddress.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: clubActions, reducer: clubReducer } = clubsSlice;
