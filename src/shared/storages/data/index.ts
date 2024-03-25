import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type JobBoard = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
};

type JobBoardStorage = BaseStorage<JobBoard[] | null> & {
  update: (jobBoards: JobBoard[]) => Promise<void>;
};

const jobBoards = createStorage<JobBoard[] | null>('jobBoards', null, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const jobBoardsStorage: JobBoardStorage = {
  ...jobBoards,

  update: async boards => {
    await jobBoards.set(boards);
  },
};

export { jobBoardsStorage };
