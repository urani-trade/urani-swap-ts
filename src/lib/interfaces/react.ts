import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";

export type FCC<T = object> = FC<PropsWithChildren<T>>;

export type SetState<T> = Dispatch<SetStateAction<T>>;
