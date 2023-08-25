import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.APP_ID_ALGOLIA as string,
  process.env.API_KEY_ALGOLIA as string
);

export const index = client.initIndex("pet-finder");
