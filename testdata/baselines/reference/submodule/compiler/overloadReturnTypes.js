//// [tests/cases/compiler/overloadReturnTypes.ts] ////

//// [overloadReturnTypes.ts]
class Accessor {}

function attr(name: string): string;
function attr(name: string, value: string): Accessor;
function attr(map: any): Accessor;
function attr(nameOrMap: any, value?: string): any {
    if (nameOrMap && typeof nameOrMap === "object") {
        // handle map case
        return new Accessor;
    }
    else {
        // handle string case
        return "s";
    }
}


interface IFace {
	attr(name:string):string;
	attr(name: string, value: string): Accessor;
	attr(map: any): Accessor;
}


//// [overloadReturnTypes.js]
class Accessor {
}
function attr(nameOrMap, value) {
    if (nameOrMap && typeof nameOrMap === "object") {
        // handle map case
        return new Accessor;
    }
    else {
        // handle string case
        return "s";
    }
}
