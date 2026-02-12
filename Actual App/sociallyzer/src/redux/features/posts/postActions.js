import { createAction } from "@reduxjs/toolkit";

export const commentAdded = createAction("posts/commentAdded");
export const commentRemoved = createAction("post/commentRemoved");

export const likeToggled = createAction("post/likeToggled");

export const saveToggled = createAction("post/saveToggled");