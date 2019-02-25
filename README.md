# Node Benchmarks
Various Benchmarks for Node.js

Import test case from https://jsperf.com/

## Example
https://jsperf.com/replace-vs-split-join-vs-replaceall/78
```
replace literal RegExp x 51,858 ops/sec ±1.24% (94 runs sampled)
split.join literal RegExp x 34,449 ops/sec ±2.82% (93 runs sampled)
split.join string x 76,756 ops/sec ±1.63% (92 runs sampled)
replace constructed RegExp x 48,910 ops/sec ±1.66% (90 runs sampled)
split.join constructed RegExp x 34,475 ops/sec ±2.15% (94 runs sampled)
replace stored literal RegExp x 51,099 ops/sec ±0.95% (95 runs sampled)
replace literal multiline RegExp x 49,770 ops/sec ±1.45% (92 runs sampled)
replace stored constructed RegExp x 50,337 ops/sec ±1.07% (87 runs sampled)
substring loop x 5,128 ops/sec ±1.45% (92 runs sampled)
Fastest is split.join string
```
