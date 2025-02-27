import { Ref } from 'vue';
import { Path, PathValue } from './paths';

export type GenericObject = Record<string, any>;

export type MaybeRef<T> = Ref<T> | T;

export type MaybeArray<T> = T | T[];

export type MaybeRefOrLazy<T> = MaybeRef<T> | (() => T);

export type MapValuesPathsToRefs<
  TValues extends GenericObject,
  TPaths extends readonly [...MaybeRef<Path<TValues>>[]]
> = {
  readonly [K in keyof TPaths]: TPaths[K] extends MaybeRef<infer TKey>
    ? TKey extends Path<TValues>
      ? Ref<PathValue<TValues, TKey>>
      : Ref<unknown>
    : Ref<unknown>;
};

export type FlattenAndSetPathsType<TRecord, TType> = { [K in Path<TRecord>]: TType };
