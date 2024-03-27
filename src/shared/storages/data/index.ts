import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { JOB_BOARDS } from '@root/utils/query-keys';
import { JobBoardType } from './schemas';

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

export { jobBoardsStorage };
