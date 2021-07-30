/* eslint-disable no-new-func */

export async function sleep(time) {
  return new Promise((_) => setTimeout(_, time * 1000));
}

export function getElementByXPath(xpath) {
  return document
    .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
}

export function printDoc() {
  return document;
}

export function serialize(...fns) {
  return fns.map((fn) => JSON.stringify(`(${fn.toString()})`));
}
