export const isComplete = <T>(
    object: Partial<T>,
    keys?: (keyof T)[],
): object is T => {
    const checkKeys: (keyof T)[] = keys ?? (Object.keys(object) as (keyof T)[]);

    return checkKeys.every(
        (key) =>
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== "",
    );
};
