exports.v4 = function () {
  const date = new Date().getTime();
  const rand =
    Math.floor(
      Math.random() * (Math.floor(Number.MAX_SAFE_INTEGER) - Math.ceil(0) + 1)
    ) + Math.ceil(0);
  const uuid = `${date + rand}`.slice(0, 16);
  return uuid;
};
