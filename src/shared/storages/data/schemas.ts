import { z } from 'zod';

export const JobBoardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.string(),
});

export const JobBoardsSchema = z.array(JobBoardSchema);
