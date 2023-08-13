import { Alert } from "#components/commons/Alert";
import { PageLayout } from "#components/commons/PageLayout";
import { UnionPage } from "#pages/UnionPage";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <RecoilRoot>
            <PageLayout>
                <UnionPage></UnionPage>
            </PageLayout>
            <Alert/>
        </RecoilRoot>
    );
}

export default App;
