type TabulateCallback<T> = (index: number) => T;

export class Arrays {
    static tabulate = <T>(count: number, mapFn: TabulateCallback<T>): T[] => {
        return [...new Array(count)].map((_, index) => mapFn(index));
    };

    static zip2 = <T, S>(arr1: T[], arr2: S[]): [T, S][] => {
        return arr1.map((elem, idx) => {
            return [elem, arr2[idx]];
        });
    };
}
