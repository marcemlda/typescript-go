//// [tests/cases/conformance/types/typeRelationships/typeInference/genericClassWithFunctionTypedMemberArguments.ts] ////

//// [genericClassWithFunctionTypedMemberArguments.ts]
// Generic functions used as arguments for function typed parameters are not used to make inferences from
// Using function arguments, no errors expected

module ImmediatelyFix {
    class C<T> {
        foo<T>(x: (a: T) => T) {
            return x(null);
        }
    }

    var c = new C<number>();
    var r = c.foo(<U>(x: U) => ''); // {}
    var r2 = c.foo<string>(<U>(x: U) => ''); // string 
    var r3 = c.foo(x => ''); // {}

    class C2<T> {
        foo(x: (a: T) => T) {
            return x(null);
        }
    }

    var c2 = new C2<number>();
    var ra = c2.foo(<U>(x: U) => 1); // number
    var r3a = c2.foo(x => 1); // number
}

module WithCandidates {
    class C<T> {
        foo2<T, U>(x: T, cb: (a: T) => U) {
            return cb(x);
        }
    }

    var c: C<number>;
    var r4 = c.foo2(1, function <Z>(a: Z) { return '' }); // string, contextual signature instantiation is applied to generic functions
    var r5 = c.foo2(1, (a) => ''); // string
    var r6 = c.foo2<string, number>('', <Z>(a: Z) => 1); // number

    class C2<T, U> {
        foo3(x: T, cb: (a: T) => U, y: U) {
            return cb(x);
        }
    }

    var c2: C2<number, string>;
    var r7 = c2.foo3(1, <Z>(a: Z) => '', ''); // string
    var r8 = c2.foo3(1, function (a) { return '' }, ''); // string

    class C3<T, U> {
        foo3<T,U>(x: T, cb: (a: T) => U, y: U) {
            return cb(x);
        }
    }
    var c3: C3<number, string>;

    function other<T, U>(t: T, u: U) {
        var r10 = c.foo2(1, (x: T) => ''); // error
        var r10 = c.foo2(1, (x) => ''); // string

        var r11 = c3.foo3(1, (x: T) => '', ''); // error
        var r11b = c3.foo3(1, (x: T) => '', 1); // error
        var r12 = c3.foo3(1, function (a) { return '' }, 1); // error
    }
}

//// [genericClassWithFunctionTypedMemberArguments.js]
// Generic functions used as arguments for function typed parameters are not used to make inferences from
// Using function arguments, no errors expected
var ImmediatelyFix;
(function (ImmediatelyFix) {
    class C {
        foo(x) {
            return x(null);
        }
    }
    var c = new C();
    var r = c.foo((x) => ''); // {}
    var r2 = c.foo((x) => ''); // string 
    var r3 = c.foo(x => ''); // {}
    class C2 {
        foo(x) {
            return x(null);
        }
    }
    var c2 = new C2();
    var ra = c2.foo((x) => 1); // number
    var r3a = c2.foo(x => 1); // number
})(ImmediatelyFix || (ImmediatelyFix = {}));
var WithCandidates;
(function (WithCandidates) {
    class C {
        foo2(x, cb) {
            return cb(x);
        }
    }
    var c;
    var r4 = c.foo2(1, function (a) { return ''; }); // string, contextual signature instantiation is applied to generic functions
    var r5 = c.foo2(1, (a) => ''); // string
    var r6 = c.foo2('', (a) => 1); // number
    class C2 {
        foo3(x, cb, y) {
            return cb(x);
        }
    }
    var c2;
    var r7 = c2.foo3(1, (a) => '', ''); // string
    var r8 = c2.foo3(1, function (a) { return ''; }, ''); // string
    class C3 {
        foo3(x, cb, y) {
            return cb(x);
        }
    }
    var c3;
    function other(t, u) {
        var r10 = c.foo2(1, (x) => ''); // error
        var r10 = c.foo2(1, (x) => ''); // string
        var r11 = c3.foo3(1, (x) => '', ''); // error
        var r11b = c3.foo3(1, (x) => '', 1); // error
        var r12 = c3.foo3(1, function (a) { return ''; }, 1); // error
    }
})(WithCandidates || (WithCandidates = {}));
