import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IEntitiesState } from "@shared/models/slice";

import { IDocDetail, IDocsListItem } from "../types/docs";
import { fetchDocs } from "../service/fetchDocs";
import { fetchDoc } from "../service/fetchDoc";
import { createDoc } from "../service/createDoc";
import { editDoc } from "../service/editDoc";
import { deleteDoc } from "../service/deleteDoc";

export interface IDocsSchema extends IEntitiesState {
  entities?: IDocsListItem[];
  docDetail?: IDocDetail;
}

const initialState: IDocsSchema = {
  loading: "idle"
};

export const docsAdapter = createEntityAdapter({
  selectId: (item: IDocsListItem) => item.code
});

const docsSlice = createSlice({
  name: "docs",
  initialState: docsAdapter.getInitialState(initialState),
  reducers: {
    resetDocDetail: (state) => {
      state.docDetail = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch docs
      .addCase(fetchDocs.fulfilled, (state, action) => {
        docsAdapter.addMany(state, action.payload.documents.items);
        state.loading = "idle";
      })
      .addCase(fetchDocs.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchDocs.pending, (state) => {
        state.loading = "loading";
      })
      // fetch one doc
      .addCase(fetchDoc.fulfilled, (state, action) => {
        state.docDetail = action.payload.document;
        docsAdapter.addOne(state, action.payload.document);
        state.loading = "idle";
      })
      .addCase(fetchDoc.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(fetchDoc.pending, (state) => {
        state.loading = "loading";
      })
      // create doc
      .addCase(createDoc.fulfilled, (state, action) => {
        const newDoc: IDocsListItem = {
          code: action.payload.code,
          name: action.meta.arg.name,
          slug: action.meta.arg.slug,
          color: action.meta.arg.color,
          mainPageShow: action.meta.arg.mainPageShow
        };
        docsAdapter.addOne(state, newDoc);
        state.loading = "idle";
      })
      .addCase(createDoc.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createDoc.pending, (state) => {
        state.loading = "loading";
      })
      // edit doc
      .addCase(editDoc.fulfilled, (state, action) => {
        state.docDetail = action.meta.arg;
        const update = {
          id: action.meta.arg.code,
          changes: {
            name: action.meta.arg.name,
            description: action.meta.arg.description,
            color: action.meta.arg.color,
            mainPageShow: action.meta.arg.mainPageShow
          }
        };
        docsAdapter.updateOne(state, update);
        state.loading = "idle";
      })
      .addCase(editDoc.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editDoc.pending, (state) => {
        state.loading = "loading";
      })
      // delete programm
      .addCase(deleteDoc.fulfilled, (state, action) => {
        docsAdapter.removeOne(state, action.meta.arg);
        state.loading = "idle";
      })
      .addCase(deleteDoc.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteDoc.pending, (state) => {
        state.loading = "loading";
      });
  }
});

export const { actions: docsActions, reducer: docsReducer } = docsSlice;
