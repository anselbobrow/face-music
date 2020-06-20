export default function loadScripts(srcs) {
  let promises = [];
  for (let src of srcs) {
    let script = document.createElement('script');
    script.setAttribute('src', src);

    promises.push(
      new Promise((resolve, reject) => {
        // adds event listener for script load, then resolves
        script.onload = () => {
          resolve(`Loaded ${src}`);
        };
        // same thing but for errors
        script.onerror = () => {
          reject(new Error(`Error loading script: ${src}`));
        };
        // wait until the event listeners are added to append the script tags,
        // otherwise they might not trigger if the script loads fast
        document.head.appendChild(script);
      })
    );
  }
  return promises;
}
