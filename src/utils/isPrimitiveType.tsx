export const isPrimitiveType = (value: any) => {
    if (value === null) return true;
    return (typeof value !== 'object') || (typeof value !== 'function' || !Array.isArray(value));
};
