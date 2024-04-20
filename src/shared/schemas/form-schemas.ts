import { z } from 'zod';

export const JobApplicationFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, { message: 'Company name is required!' })
    .max(40, { message: 'Company name must be less than 40 characters!' }),
  jobTitle: z
    .string()
    .trim()
    .min(1, { message: 'Job title is required!' })
    .max(40, { message: 'Job tame must be less than 40 characters!' }),
  jobUrl: z.string(),
  jobDescription: z.string().trim(),
  jobBoardId: z.string().min(1, { message: 'Board ID is required!' }),
  jobBoardListId: z.string().min(1, { message: 'List ID is required!' })
});

export type JobApplicationFormType = z.infer<typeof JobApplicationFormSchema>;
