const keyMap: { [key: string]: number } = {};

export function useKey(prefix = "union-helper") {
    const generate = () => {
        keyMap[prefix] = (keyMap[prefix] ?? 0) + 1;
        return `${prefix}_${keyMap[prefix]}`;
    };

    return { generate };
}
