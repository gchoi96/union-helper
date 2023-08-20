import useHttpGet from "#hooks/http/useHttpGet";
import { useQuery } from "@tanstack/react-query";
import { convertResponseToCharacter } from "#utils";
import { useUpdateCharacterList } from "#hooks/useUpdateCharacters";

export const useCharacterQuery = (nickname: string) => {
    const { get } = useHttpGet<{ nickname: string; level: string; image: string; job: string }>();
    const update = useUpdateCharacterList();
    return useQuery(["character", nickname], async () =>
        get(`http://localhost:4000/character/?nickname=${nickname}`).then((res) => {
            const character = convertResponseToCharacter(res);
            update([character]);
            return character;
        })
    );
};
