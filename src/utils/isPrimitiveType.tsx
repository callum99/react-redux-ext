export const isNonPrimitiveType = (value: any) => {
    if (value === null) return false;
    return (typeof value === 'object') || (typeof value === 'function' || (value === Array));
};
