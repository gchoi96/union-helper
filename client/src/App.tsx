import { Alert } from "#components/commons/Alert";
import { PageLayout } from "#components/commons/PageLayout";
import { UnionPage } from "#pages/UnionPage";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});
function App() {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <PageLayout>
                    <UnionPage></UnionPage>
                </PageLayout>
                <Alert />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default App;
