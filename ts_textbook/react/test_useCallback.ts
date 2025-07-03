type DependencyList = ReadonlyArray<unknown>;

declare function useArrowFunctionCallback<T extends (...args:unknown[]) =>unknown>(callback:T,dep:DependencyList):T;
declare function useFunctionCallback<T extends Function>(callback:T,dep:DependencyList):T;

const testCallback = useArrowFunctionCallback((test)=> {},[])
//const testCallback2 = useFunctionCallback((test)=> {},[])  // error => Parameter test implicitly has an any type.