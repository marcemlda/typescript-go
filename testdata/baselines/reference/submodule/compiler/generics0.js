//// [tests/cases/compiler/generics0.ts] ////

//// [generics0.ts]
interface G<T> {
    x: T;
}

var v2: G<string>;

var z = v2.x; // 'y' should be of type 'string'

//// [generics0.js]
var v2;
var z = v2.x;
