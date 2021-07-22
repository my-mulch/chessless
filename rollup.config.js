import serve from "rollup-plugin-serve";
import image from '@rollup/plugin-image';
import babel from '@rollup/plugin-babel';
import postcss from "rollup-plugin-postcss";
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import livereload from "rollup-plugin-livereload";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: "./view/index.jsx",
  output: {
    file: "./dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    image(),
    postcss({
      extensions: [".css"],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    babel({
      compact: true,
      presets: ["@babel/preset-react"],
      plugins: ["@babel/plugin-proposal-class-properties"],
      babelHelpers: "bundled"
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ["dist"],
      host: "localhost",
      port: 1234,
    }),
    livereload({ watch: "dist" }),
  ]
};
