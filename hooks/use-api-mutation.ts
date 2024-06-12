import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .finally(() => setPending(false))
      .then((res) => res)
      .catch((e) => {
        throw e;
      });
  };

  return {
    mutate,
    pending,
  };
};
