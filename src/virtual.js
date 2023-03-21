import {
    elementScroll,
    observeElementOffset,
    observeElementRect,
    observeWindowOffset,
    observeWindowRect,
    Virtualizer,
    windowScroll
} from "@tanstack/virtual-core";

import {
    computed,
    onScopeDispose,
    shallowRef,
    triggerRef,
    unref,
    watch
} from "vue";

function useVirtualizerBase(options) {
    const virtualizer = new Virtualizer(unref(options));
    const state = shallowRef(virtualizer);

    const cleanup = virtualizer._didMount();

    watch(
        () => unref(options).getScrollElement(),
        (el) => {
            if (el) {
                virtualizer._willUpdate();
            }
        },
        {
            immediate: true
        }
    );

    watch(
        () => unref(options),
        (options) => {
            virtualizer.setOptions({
                ...options,
                onChange: (instance) => {
                    triggerRef(state);
                    options.onChange?.(instance);
                }
            });

            virtualizer._willUpdate();
            triggerRef(state);
        },
        {
            immediate: true
        }
    );

    onScopeDispose(cleanup);

    return state;
}

export function useVirtualizer(options) {
    return useVirtualizerBase(
        computed(() => ({
            observeElementRect: observeElementRect,
            observeElementOffset: observeElementOffset,
            scrollToFn: elementScroll,
            ...unref(options)
        }))
    );
}

export function useWindowVirtualizer(options) {
    return useVirtualizerBase(
        computed(() => ({
            getScrollElement: () => (typeof Window !== "undefined" ? window : null),
            observeElementRect: observeWindowRect,
            observeElementOffset: observeWindowOffset,
            scrollToFn: windowScroll,
            ...unref(options)
        }))
    );
}
