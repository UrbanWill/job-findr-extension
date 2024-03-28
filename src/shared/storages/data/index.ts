import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { JOB_BOARDS, JOB_BOARD_LISTS } from '@root/utils/query-keys';
import { JobBoardType, JobBoardListType } from './schemas';

type JobBoardStorage = BaseStorage<JobBoardType[] | null> & {
  update: (jobBoards: JobBoardType[]) => Promise<void>;
};

const jobBoards = createStorage<JobBoardType[] | null>(JOB_BOARDS, null, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const jobBoardsStorage: JobBoardStorage = {
  ...jobBoards,

  update: async boards => {
    await jobBoards.set(boards);
  },
};

type JobBoardListStorage = BaseStorage<JobBoardListType[] | null> & {
  update: (jobBoards: JobBoardListType[]) => Promise<void>;
};

const jobBoardLists = createStorage<JobBoardListType[] | null>(JOB_BOARD_LISTS, null, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const jobBoardListsStorage: JobBoardListStorage = {
  ...jobBoardLists,

  update: async boards => {
    await jobBoardLists.set(boards);
  },
};

export { jobBoardsStorage, jobBoardListsStorage };
