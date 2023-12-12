import { ReactNode } from "react";

export type StrictPropsWithChildren<P = unknown> = P & {
    children: ReactNode;
};

export interface MovieGenreData {
    id: number;
    name: string;
}

export interface MovieData {
    backdrop_path: string;
    id: number;
    original_title: string;
    poster_path: string;
    release_date: string;
    title: string;
}
