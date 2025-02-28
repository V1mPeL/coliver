import * as z from 'zod';

export const searchCityValidation = z.object({
  search_city: z.string().min(3).nonempty(),
});
