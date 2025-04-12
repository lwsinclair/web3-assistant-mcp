export const serializeJSON = (data: any) => {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return Number(value);
    }
    return value;
  });
};
