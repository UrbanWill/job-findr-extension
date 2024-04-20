import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { JOB_BOARDS, JOB_BOARD_LISTS } from '@root/utils/query-keys';
import { JobBoardType, JobBoardListType } from './schemas';

type JobBoardStorage = BaseStorage<JobBoardType[] | null> & {
  update: (jobBoards: JobBoardType[]) => Promise<void>;
};

const jobBoards = createStorage<JobBoardType[] | null>(JOB_BOARDS, null, {
  storageType: StorageType.Local,
  liveUpdate: true
});

const jobBoardsStorage: JobBoardStorage = {
  ...jobBoards,

  update: async boards => {
    await jobBoards.set(boards);
  }
};

// Note: This is method if caching data in local storage is meant to work with react-query
// therefore, keep 'queryKey' in mind when using and extending this method
type JobBoardListStorageRecord = Record<string, JobBoardListType[] | null>;

type JobBoardListStorage = BaseStorage<JobBoardListStorageRecord | null> & {
  update: (jobBoards: JobBoardListStorageRecord) => Promise<void>;
};

const jobBoardLists = createStorage<JobBoardListStorageRecord | null>(JOB_BOARD_LISTS, null, {
  storageType: StorageType.Local,
  liveUpdate: true
});

const jobBoardListsStorage: JobBoardListStorage = {
  ...jobBoardLists,

  update: async boards => {
    await jobBoardLists.set(boards);
  }
};

export { jobBoardsStorage, jobBoardListsStorage };
