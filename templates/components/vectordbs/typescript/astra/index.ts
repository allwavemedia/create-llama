/* eslint-disable turbo/no-undeclared-env-vars */
import { VectorStoreIndex } from "llamaindex";
import { AstraDBVectorStore } from "llamaindex/vector-store/AstraDBVectorStore";
import { checkRequiredEnvVars } from "./shared";

export async function getDataSource(params?: any) {
  checkRequiredEnvVars();
  const store = new AstraDBVectorStore({
    params: {
      endpoint: process.env.ASTRA_DB_ENDPOINT!,
      token: process.env.ASTRA_DB_APPLICATION_TOKEN!,
    },
  });
  await store.connect(process.env.ASTRA_DB_COLLECTION!);
  return await VectorStoreIndex.fromVectorStore(store);
}
