import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  /** Current attempt index (0-based). Useful for retry feedback in UI. */
  attempt: number;
  /** Manually trigger a fresh fetch + retry cycle. */
  refetch: () => void;
}

export interface UseFetchOptions extends RequestInit {
  /** Maximum number of retry attempts on failure. Defaults to 3. */
  maxRetries?: number;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * useFetch — A typed data-fetching hook with loading state, error logging, and auto-retry.
 *
 * @template T  The expected shape of the parsed JSON response.
 *
 * @param url         - The URL to fetch. Pass `null` to skip fetching.
 * @param options     - Optional fetch options + `maxRetries` (default: 3).
 *
 * @example
 * const { data, isLoading, error, attempt, refetch } = useFetch<User[]>(
 *   "https://api.example.com/users",
 *   { headers: { Authorization: "Bearer token" }, maxRetries: 5 }
 * );
 */
function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions = {}
): UseFetchState<T> {
  const { maxRetries = 3, ...fetchOptions } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [attempt, setAttempt] = useState<number>(0);

  // Stable ref so the effect doesn't re-run when options object identity changes
  const fetchOptionsRef = useRef<RequestInit>(fetchOptions);
  useEffect(() => {
    fetchOptionsRef.current = fetchOptions;
  });

  // Abort controller ref — cancelled on unmount or re-fetch
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    if (!url) return;

    // Cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    setData(null);

    let currentAttempt = 0;

    while (currentAttempt <= maxRetries) {
      setAttempt(currentAttempt);

      try {
        const response = await fetch(url, {
          ...fetchOptionsRef.current,
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${response.statusText} — ${url}`
          );
        }

        const json: T = await response.json();

        setData(json);
        setError(null);
        setIsLoading(false);
        return; // ✅ Success — exit the retry loop
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        // Don't retry or log if the request was intentionally aborted
        if (error.name === "AbortError") {
          setIsLoading(false);
          return;
        }

        const isLastAttempt = currentAttempt === maxRetries;

        console.error(
          `[useFetch] Attempt ${currentAttempt + 1}/${maxRetries + 1} failed for "${url}":`,
          error
        );

        if (isLastAttempt) {
          // ❌ All retries exhausted — surface the error
          console.error(
            `[useFetch] All ${maxRetries + 1} attempts failed. Giving up.`,
            error
          );
          setError(error);
          setIsLoading(false);
          return;
        }

        // Exponential back-off: 500ms, 1000ms, 2000ms, …
        const delay = 500 * Math.pow(2, currentAttempt);
        console.warn(`[useFetch] Retrying in ${delay}ms…`);
        await sleep(delay);
      }

      currentAttempt++;
    }
  }, [url, maxRetries]);

  // Run on mount and whenever url / maxRetries change
  useEffect(() => {
    fetchData();
    return () => {
      abortRef.current?.abort();
    };
  }, [fetchData]);

  return { data, isLoading, error, attempt, refetch: fetchData };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default useFetch;