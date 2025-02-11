
import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const LazyNavLink = ({to, children, preloadModule, onClick, className }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
    });
    const [moduleLoaded, setModuleLoaded] = useState(false);

    useEffect(() => {
        if (inView && !moduleLoaded) {
            preloadModule().then(() => {
                setModuleLoaded(true);
            });
        }
    }, [inView, moduleLoaded, preloadModule]);

    return (
        <NavLink to={to} ref={ref} onClick={onClick} className={className}>
            {children}
        </NavLink>
    );
};

export default LazyNavLink;
