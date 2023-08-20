import { useUpdateCharacterList } from "#hooks/useUpdateCharacters";
import { convertResponseToCharacter } from "#utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useHttpGet from "./useHttpGet";

export const useRefetchCharacter = (nickname: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const update = useUpdateCharacterList();
    const { get } = useHttpGet<{ nickname: string; level: string; image: string; job: string }>();
    const queryClient = useQueryClient();
    const refetch = () => {
        setIsLoading(true);
        queryClient
            .fetchQuery(["character", nickname], async () =>
                get(`http://localhost:4000/character/?nickname=${nickname}`).then((res) => {
                    const character = convertResponseToCharacter(res);
                    update([character]);
                    return character;
                })
            )
            .then(() => setIsLoading(false));
    };

    return { isLoading, refetch };
};
