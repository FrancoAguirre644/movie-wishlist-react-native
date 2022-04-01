/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Wishlist: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface Movie {
  language:    Language[];
  cast:        string[];
  directors:   string[];
  genres:      Genre[];
  episodes:    any[];
  _id:         string;
  title:       string;
  plot:        string;
  fullPlot:    string;
  poster:      string;
  thumbnail:   string;
  rated:       Rated;
  runtime:     number;
  released:    Date;
  year:        number;
  imdb:        number;
  videoType:   VideoType;
  categorised: Categorised;
  __v:         number;
}

export enum Categorised {
  Popular = "popular",
}

export enum Genre {
  Action = "action",
  Adventure = "adventure",
  SciFi = "sci-fi",
}

export enum Language {
  English = "English",
  Hindi = "Hindi",
}

export enum Rated {
  NotRated = "Not rated",
}

export enum VideoType {
  Movie = "movie",
  Series = "series",
}

export interface MovieState {
  movies: Movie[],
  wishlist: Movie[],
}