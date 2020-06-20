// in order to use setTimeout in async functions...
export default function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
