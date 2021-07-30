/* eslint-disable no-shadow */
/* eslint-disable no-eval */
/* eslint-disable no-new-func */

export async function sleep(time) {
  return new Promise((_) => setTimeout(_, time * 1000));
}

export function getElementByXPath(xpath) {
  return document
    .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
}

export function serialize(fns) {
  return fns.map((fn) => JSON.stringify(`(${fn.toString()})`));
}

export async function expose(page, fns) {
  await page.evaluateOnNewDocument((fns) => {
    fns
      .map(JSON.parse)
      .map(eval)
      .map((fn) => ({ [fn.name]: fn }))
      .forEach((fnObj) => Object.assign(window, fnObj));
  }, serialize(fns));
}
