export const setFilter = (filter, { location, router }) => {
  const newFilter = {
    ...location.query,
    ...filter,
    page: 1,
  };

  const query = Object.keys(newFilter).reduce((target, key) => {
    if (newFilter[key]) {
      target[key] = newFilter[key]; // eslint-disable-line
    }

    return target;
  }, {});

  router.push({
    ...location,
    query,
  });
};

// TODO: Remove this after list pages refactoring
export default setFilter;
