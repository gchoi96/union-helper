// const results = useQueries({
//   queries: [
//     { queryKey: ['post', 1], queryFn: fetchPost, staleTime: Infinity},
//     { queryKey: ['post', 2], queryFn: fetchPost, staleTime: Infinity}
//   ]
// })

import useHttpGet from "./useHttpGet";
import { useQueries } from "@tanstack/react-query";
import { convertResponseToCharacter } from "#utils";

export const useCharacterQueries = (nicknames: string[]) => {
    const { get } = useHttpGet<{ nickname: string; level: string; image: string; job: string }>();
    return useQueries({
        queries: nicknames.map((nickname) => ({
            queryKey: ["character", nickname],
            queryFn: async () =>
                get(`${process.env.REACT_APP_SERVER_ADDRESS}/character/?nickname=${nickname}`).then((res) =>
                    convertResponseToCharacter(res)
                ),
            cacheTime: Infinity,
        })),
    });
};
