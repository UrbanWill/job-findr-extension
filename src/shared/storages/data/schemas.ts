import { z } from 'zod';

export const JobBoardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.string()
});

export const JobBoardsSchema = z.array(JobBoardSchema);

export type JobBoardType = z.infer<typeof JobBoardSchema>;

export const JobBoardListSchema = z.object({
  id: z.string(),
  userId: z.string(),
  jobBoardId: z.string(),
  name: z.string(),
  position: z.number()
});

export const JobBoardListsSchema = z.array(JobBoardListSchema);

export type JobBoardListType = z.infer<typeof JobBoardListSchema>;
