import axios, { AxiosResponse } from "axios";

export interface Collection {
  symbol: string;
  name: string;
  description: string;
  image: string;
  twitter: string;
  discord: string;
  website?: string;
  categories: string[];
  isBadged: boolean;
  hasCNFTs: boolean;
  isOcp: boolean;
  splTokens: string[];
}

export interface CollectionsApiResponse {
  data: Collection[];
}

export const getCollections = (
  offset: number = 0,
  limit: number = 20
): Promise<CollectionsApiResponse> => {
  const apiUrl = "https://api-mainnet.magiceden.dev/v2/collections";
  console.log("API URL:", apiUrl);
  console.log("Parameters:", { offset, limit });
  return axios
    .get(apiUrl, {
      params: {
        offset,
        limit,
      },
    })
    .then((response: AxiosResponse<Collection[]>) => {
      console.log("API Response:", response);
      return { data: response.data }; // Wrap the response.data in CollectionsApiResponse
    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
      throw error;
    });
};



// Function to map collections into a table
export const mapCollectionsToTable = (collections: Collection[]): string => {
  const headers = Object.keys(collections[0]) as (keyof Collection)[];
  const tableHeader = `<tr>${headers
    .map((header) => `<th>${header}</th>`)
    .join("")}</tr>`;

  const tableRows = collections
    .map((collection) => {
      const row = headers
        .map((header) => `<td>${collection[header]}</td>`)
        .join("");
      return `<tr>${row}</tr>`;
    })
    .join("");

  return `<table>${tableHeader}${tableRows}</table>`;
};
