import { useSyncExternalStore } from 'react';
import { BaseStorage } from '@src/shared/storages/base';

type WrappedPromise = ReturnType<typeof wrapPromise>;
const storageMap: Map<BaseStorage<unknown>, WrappedPromise> = new Map();

export default function useStorage<
  Storage extends BaseStorage<Data>,
  Data = Storage extends BaseStorage<infer Data> ? Data : unknown
>(storage: Storage) {
  const _data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);

  if (!storageMap.has(storage as BaseStorage<unknown>)) {
    storageMap.set(storage as BaseStorage<unknown>, wrapPromise(storage.get()));
  }
  if (_data !== null) {
    storageMap.set(storage as BaseStorage<unknown>, { read: () => _data });
  }

  return _data ?? (storageMap.get(storage as BaseStorage<unknown>)!.read() as Data);
}

function wrapPromise<R>(promise: Promise<R>) {
  let status = 'pending';
  let result: R;
  const suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}
