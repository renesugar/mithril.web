export const setFilter = (filter, { location, router }) => {
  const newFilter = {
    ...location.query,
    ...filter,
    page: 1,
  };

  const query = Object.entries(newFilter)
    .filter(([_, value]) => value !== undefined && value != null) // eslint-disable-line
    .reduce(
      (query, [key, value]) => Object.assign(query, { [key]: value }),
      {}
    );

  router.push({
    ...location,
    query,
  });
};

// TODO: Remove this after list pages refactoring
export default setFilter;
