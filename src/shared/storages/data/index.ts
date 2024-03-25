import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { JOB_BOARDS } from '@root/utils/query-keys';
import { JobBoardSchema } from './schemas';
import { z } from 'zod';

type JobBoard = z.infer<typeof JobBoardSchema>;

type JobBoardStorage = BaseStorage<JobBoard[] | null> & {
  update: (jobBoards: JobBoard[]) => Promise<void>;
};

const jobBoards = createStorage<JobBoard[] | null>(JOB_BOARDS, null, {
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
