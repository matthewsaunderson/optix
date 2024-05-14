import * as React from "react";

/**
 * Similar to the standard useEffect hook, but also returns a callback to manually re-trigger the effect to fire.
 *
 * @param effect Imperative function that can return a cleanup function. This should be constructed using a useCallback hook, since any changes will cause the effect to be re-triggered
 * @param dependencies The effect will automatically activate if any values in the list change.
 * @returns A callback to manually re-trigger the effect
 */
export function useRefreshableEffect(
  effect: React.EffectCallback,
  dependencies: ReadonlyArray<unknown>
): TriggerRefreshCallback {
  const [refresh, setRefresh] = React.useState(0);

  React.useEffect(effect, [...dependencies, effect, refresh]);

  return () => {
    setRefresh((prevState) => prevState + 1);
  };
}

export interface TriggerRefreshCallback {
  (): void;
}
