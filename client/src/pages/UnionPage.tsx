import { Board } from "#components/units/Board";
import { CardControl } from "#components/units/CardControl";
import { CardList } from "#components/units/CardList";
import { MainControl } from "#components/units/MainControl";
import { COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { flex } from "#styles/mixin";
import { css } from "@emotion/css";

export function UnionPage() {
    return (
        <div
            className={css`
                ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
                padding: 12px 20px;
                width: 1028px;
                height: 740px;
                flex-shrink: 0;
                border-radius: 5px;
                border: 5px solid ${COLOR.WHITE};
                background: #464643;
                > section {
                    ${flex({
                        direction: FLEX_DIRECTION.COLUMN,
                        justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                        alignItems: ALIGN_ITEMS.CENTER,
                    })}
                    height: 100%;
                }
            `}
        >
            <section>
                <Board />
                <CardControl />
                <CardList />
            </section>
            <section>
                <MainControl />
                {/* <RaidEffect /> */}
            </section>
        </div>
    );
}
