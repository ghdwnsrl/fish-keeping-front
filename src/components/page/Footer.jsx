import LazyNavLink from "../LazyNavLink.jsx";

const Footer = () => {
    return (
        <footer className='flex justify-center items-center space-x-1 pb-2'>
            <div className='flex items-center'>
                <LazyNavLink
                    key="terms"
                    to="/terms"
                    preloadModule={() => import('../../pages/TermPage/index.jsx')}
                    className='text-sm'
                >
                    이용약관
                </LazyNavLink>
                <span className="mx-1 text-sm">|</span>
                <LazyNavLink
                    key="privacy"
                    to="/privacy"
                    preloadModule={() => import('../../pages/PrivacyPage/index.jsx')}
                    className='text-sm'
                >
                    개인정보처리방침
                </LazyNavLink>
            </div>
            <p className='text-sm text-gray-400'>Copyright Mulkkogi All rights reserved.</p>
        </footer>
    )
}

export default Footer;