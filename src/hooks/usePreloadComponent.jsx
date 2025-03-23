import {lazy} from "react";

const usePreloadComponent = () => {
    const lazyLoad = (importComponent) => {
        const Component = lazy(importComponent);
        Component.preload = importComponent;
        Component.preload();
        return Component;
    }

    return {lazyLoad}
}

export default usePreloadComponent;