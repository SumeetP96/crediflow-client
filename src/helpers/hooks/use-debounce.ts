import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef } from 'react';

export default function useDebounce(callback: (param?: any) => void, timer: number) {
  const ref = useRef<(param: any) => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (param?: any) => {
      ref.current?.(param);
    };
    return debounce(func, timer);
  }, [timer]);

  return debouncedCallback;
}
