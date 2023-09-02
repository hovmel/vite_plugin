import { ReactNode, useState, useEffect } from 'react';

type ErrorBoundaryProps = {
    children: ReactNode;
};

function ErrorBoundary({ children }: ErrorBoundaryProps) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const componentDidCatch = (error: ErrorEvent) => {
            console.error(error);

            setHasError(true);
        };

        window.addEventListener('error', componentDidCatch);

        return () => {
            window.removeEventListener('error', componentDidCatch);
        };
    }, []);

    if (hasError) {
        return <div>Что-то пошло не так. Пожалуйста, обновите страницу.</div>;
    }

    return <>{children}</>;
}

export default ErrorBoundary;
