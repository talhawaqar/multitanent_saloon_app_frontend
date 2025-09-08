"use client";

import { atom } from "recoil";

export const authAtom = atom({
  key: "token",
  default: {
    token: "",
  } as { token: string },
});
