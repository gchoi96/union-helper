import { Board } from "#components/Board";
import { Card } from "#components/Card";
import { Cell } from "#components/Cell";
import { JOB_GROUP, JOB_NAME } from "#enums/job";
import { CELL_STATUS } from "#enums/status";
import React from "react";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <RecoilRoot>
            <div className="App">
                <Cell status={CELL_STATUS.AVAILABLE} toggleCellStatus={() => {}} onMouseEnter={() => {}} />
                <Board />
                <Card
                    character={{
                        nickname: "진부령박스카",
                        job: { name: JOB_NAME.섀도어, group: JOB_GROUP.도적 },
                        level: 270,
                        isUsed: false,
                        isMobile: false,
                        image: "https://ssl.nexon.com/s2/game/maplestory/renewal/common/no_char_img_180.png",
                    }}
                ></Card>
                <header className="App-header">
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
            </div>
        </RecoilRoot>
    );
}

export default App;
