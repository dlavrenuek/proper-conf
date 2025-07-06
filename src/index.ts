import { z } from "zod";

const ConfigSchema = z.object({
  database: z.object({
    url: z.string(),
    name: z.string(),
    password: z.string(),
  }),
  users: z.array(
    z.object({
      email: z.optional(z.string()),
      name: z.string(),
    }),
  ),
  groups: z.array(z.string()),
});

console.log(ConfigSchema.shape);

ConfigSchema.parse({
  database: {
    url: "123",
    name: "",
  },
});
