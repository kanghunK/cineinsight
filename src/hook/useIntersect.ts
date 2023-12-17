import { useCallback, useEffect, useRef } from "react";
import throttle from "lodash.throttle";

type IntersectHandler = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
) => void;

const useIntersect = (
    onInterSect: IntersectHandler,
    options?: IntersectionObserverInit
) => {
    const ref = useRef(null);
    const callback = throttle(
        useCallback(
            (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver
            ) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) onInterSect(entry, observer);
                });
            },
            [onInterSect]
        )
    );

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(callback, options);

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options, callback]);

    return ref;
};

export default useIntersect;
