// in order to use setTimeout in async functions...
const sleep = ms => new Promise(r => setTimeout(r, ms));

export default sleep;
