import {Progress} from "../app/components";
import {AuthProvider} from "../app/context";
import "../styles/globals.css";

import {AuthLayout, DashboardLayout, PageLayout} from "../app/layouts";

function MyApp({Component, pageProps, router}) {
    Progress();

    const authPages : string[] = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-otp"];

    return (
        <AuthProvider>
            {authPages.find(elt => elt == router.pathname) != undefined ? (
                <AuthLayout>
                    <Component {...pageProps} />
                </AuthLayout>
            ) : router.pathname.startsWith("/dashboard") ? (
                <DashboardLayout>
                    <Component {...pageProps} />
                </DashboardLayout>
            ) : (
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            )}
        </AuthProvider>
    );
}

export default MyApp;
