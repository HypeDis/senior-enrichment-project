const checkNew = location => {
  const path = location.pathname;
  const isNew = path.includes('new');
  return isNew;
};

export default checkNew;
