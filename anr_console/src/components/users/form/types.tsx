import { z } from "zod";
import { schemaForm } from "./schema";

export type FormProps = z.infer<typeof schemaForm>;
