const preloadCache = new Map<string, Promise<string>>();

export function preloadImage(src: string): Promise<string> {
  const cached = preloadCache.get(src);
  if (cached) return cached;


  const promise = new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      preloadCache.delete(src); // allow a retry on the next attempt
      reject(new Error(`Failed to load ${src}`));
    };
    img.src = src;
  });

  preloadCache.set(src, promise);
  return promise;
}