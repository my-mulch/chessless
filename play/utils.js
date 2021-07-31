/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable no-eval */
/* eslint-disable no-new-func */

import path from 'path';
import { fileURLToPath } from 'url';

import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function sleep(time) {
  return new Promise((_) => setTimeout(_, time * 1000));
}

export async function bundle(input) {
  const build = await rollup({ input, plugins: [nodeResolve({ extensions: ['.js'] })] });

  const { output } = await build.generate({ format: 'iife' });

  return output;
}

export function getElementByXPath(xpath) {
  return document
    .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
}

export function serialize(fn) {
  if (fn.constructor === String) return JSON.stringify(fn);

  return JSON.stringify(`(${fn.toString()})`);
}

export async function expose(page, fns) {
  await page.evaluateOnNewDocument((fns) => {
    fns
      .map(JSON.parse)
      .map(eval)
      .map((fn) => ({ [fn.name]: fn }))
      .forEach((fnObj) => Object.assign(window, fnObj));
  }, fns.map(serialize));
}
