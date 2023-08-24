import { Block } from "#/classes/Block";
import Cell from "#/classes/Cell";
import UnionBoard from "#/classes/UnionBoard";
import UnionManager from "#/classes/UnionManager";
import { Character } from "#/types/character";
import Position from "#classes/Position";
/* eslint-disable-next-line no-restricted-globals */
self.onmessage = (e: MessageEvent<{ characters: Character[]; board: Cell[][] }>) => {
    const characters = e.data.characters;
    const board = e.data.board.map((row) =>
        row.map(
            (cell) =>
                new Cell(new Position(cell.position.y, cell.position.x), cell.ability, cell.status, cell.occupyingBlock)
        )
    );

    const unionManager = new UnionManager(
        characters.map((character) => Block.blockFactory(character)),
        new UnionBoard(board)
    );
    unionManager
        .simulate()
        /* eslint-disable-next-line no-restricted-globals */
        .then((result) => self.postMessage(result))
        /* eslint-disable-next-line no-restricted-globals */
        .catch(() => self.postMessage(null));
};

export {};
