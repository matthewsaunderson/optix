import React, { useCallback } from "react";
import {
  TriggerRefreshCallback,
  useRefreshableEffect,
} from "./useRefreshableEffect";
import { RequestStatus } from "../Interfaces/RequestStatus";

export function useFetchedData<T>(
  url: string
): [T[] | null, TriggerRefreshCallback, RequestStatus] {
  const [data, setData] = React.useState<T[] | null>(null);
  const [requestState, setRequestState] = React.useState(RequestStatus.Pending);
  const refreshFetchedData = useRefreshableEffect(
    useCallback(() => {
      const fetchDataCallback = async () => {
        try {
          setRequestState(RequestStatus.Pending);
          const response = await fetch(url);
          if (response.ok) {
            const fetchedData = await response.json();

            if (!!fetchedData) {
              setData(fetchedData);
              setRequestState(RequestStatus.Success);
            }
          } else {
            if (response.status === 500) {
              fetchDataCallback();
              return;
            }
            setRequestState(RequestStatus.Failed);
          }
        } catch (error: unknown) {
          console.error(error);
          setRequestState(RequestStatus.Failed);
        }
      };
      fetchDataCallback();
    }, [url]),
    []
  );
  return [data, refreshFetchedData, requestState];
}
