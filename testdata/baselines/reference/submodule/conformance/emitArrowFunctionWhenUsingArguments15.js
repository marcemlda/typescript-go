//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments15.ts] ////

//// [emitArrowFunctionWhenUsingArguments15.ts]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments15.js]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}
