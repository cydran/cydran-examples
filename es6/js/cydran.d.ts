declare class Config {
	constructor();
	useTrace(): void;
	useDebug(): void;
	useInfo(): void;
	useWarn(): void;
	useError(): void;
	useFatal(): void;
	useDisable(): void;
}
export interface OnContinuation {
	invoke(target: (payload: any) => void): void;
	forChannel(name: string): ForChannelContinuation;
}
export interface ForChannelContinuation {
	invoke(target: (payload: any) => void): void;
}
export interface Guard {
	isPropagateUp(): boolean;
	isPropagateDown(): boolean;
}
export interface Disposable {
	dispose(): void;
}
export interface Logger {
	getName(): string;
	trace(payload: any, error?: Error): void;
	debug(payload: any, error?: Error): void;
	info(payload: any, error?: Error): void;
	warn(payload: any, error?: Error): void;
	error(payload: any, error?: Error): void;
	fatal(payload: any, error?: Error): void;
	isTrace(): boolean;
	isDebug(): boolean;
	isInfo(): boolean;
	isWarn(): boolean;
	isError(): boolean;
	isFatal(): boolean;
	isDisable(): boolean;
}
export interface ModelMediator<T> extends Disposable {
	invoke(...args: any[]): void;
	get(): T;
	set(value: any): void;
	evaluate(guard: Guard): boolean;
	watch(context: any, target: (previous: T, current: T, guard?: Guard) => void): void;
	onDigest(context: any, target: (guard: Guard) => void): void;
	notifyWatcher(guard: Guard): void;
	setReducer(reducerFn: (input: T) => any): void;
}
export interface Register {
	registerConstant(id: string, instance: any): any | void;
	registerPrototype(id: string, classInstance: any): any | void;
	registerSingleton(id: string, classInstance: any): any | void;
}
export interface RegistryStrategy {
	get<T>(id: string): T;
}
export interface Scope {
	add(name: string, item: any): void;
	remove(name: string): void;
}
export interface Module extends Register {
	getName(): string;
	associate(...componentClasses: any[]): Module;
	disassociate(...componentClasses: any[]): Module;
	clear(): Module;
	broadcast(channelName: string, messageName: string, payload: any): void;
	message(channelName: string, messageName: string, payload: any): void;
	expose(id: string): Module;
	get<T>(id: string): T;
	getLocal<T>(id: string): T;
	getScope(): Scope;
	addStrategy(strategy: RegistryStrategy): Module;
	getLogger(): Logger;
}
export declare const Events: {
	AFTER_CHILD_ADDED: string;
	AFTER_CHILD_CHANGED: string;
	AFTER_CHILD_REMOVED: string;
	AFTER_PARENT_ADDED: string;
	AFTER_PARENT_CHANGED: string;
	AFTER_PARENT_REMOVED: string;
	BEFORE_CHILD_ADDED: string;
	BEFORE_CHILD_CHANGED: string;
	BEFORE_CHILD_REMOVED: string;
	BEFORE_DISPOSE: string;
	BEFORE_PARENT_ADDED: string;
	BEFORE_PARENT_CHANGED: string;
	BEFORE_PARENT_REMOVED: string;
};
export declare class Modules {
	static getModule(name: string): Module;
	static getDefaultModule(): Module;
	static forEach(fn: (instace: Module) => void): void;
	static broadcast(channelName: string, messageName: string, payload: any): void;
	static registerConstant(id: string, instance: any): void;
	static registerPrototype(id: string, classInstance: any): void;
	static registerSingleton(id: string, classInstance: any): void;
	static registerElementMediator(name: string, supportedTags: string[], elementMediatorClass: any): void;
	static getScope(): Scope;
	static get<T>(id: string): T;
	private static logger;
	private static modules;
}
export declare class Component {
	private ____internal$$cydran____;
	private ____internal$$cydran$$module____;
	constructor(componentName: string, template: string, attributePrefix?: string);
	hasMetadata(name: string): boolean;
	getMetadata(name: string): any;
	hasRegion(name: string): boolean;
	setChild(name: string, component: Component): void;
	setChildFromRegistry(name: string, componentName: string, defaultComponentName?: string): void;
	message(channelName: string, messageName: string, payload: any): void;
	dispose(): void;
	getParent(): Component;
	getEl(): HTMLElement;
	get<T>(id: string): T;
	protected getItem(): any;
	protected broadcast(channelName: string, messageName: string, payload: any): void;
	protected broadcastGlobally(channelName: string, messageName: string, payload: any): void;
	protected $apply(fn: Function, args: any[]): void;
	protected scope(): Scope;
	protected watch(expression: string, target: (previous: any, current: any) => void): void;
	protected withMetadata(name: string, value: any): void;
	protected on(messageName: string): OnContinuation;
	protected getLogger(): Logger;
}
export declare abstract class ElementMediator<M, E extends HTMLElement> implements Disposable {
	private logger;
	private ____internal$$cydran____;
	private previous;
	private value;
	private moduleInstance;
	private mediator;
	private pubSub;
	private params;
	private domListeners;
	constructor(dependencies: any);
	dispose(): void;
	init(): void;
	get<U>(id: string): U;
	setModule(moduleInstance: Module): void;
	message(channelName: string, messageName: string, payload: any): void;
	broadcast(channelName: string, messageName: string, payload: any): void;
	broadcastGlobally(channelName: string, messageName: string, payload: any): void;
	protected listenTo(channel: string, messageName: string, target: (payload: any) => void): void;
	protected listenToFramework(messageName: string, target: (payload: any) => void): void;
	protected bridge(name: string): void;
	protected getEl(): E;
	protected getModule(): Module;
	protected mediate<T>(expression: string): ModelMediator<T>;
	protected getModel(): any;
	protected getParent(): Component;
	protected getModelMediator(): ModelMediator<M>;
	protected notifyModelInteraction(): void;
	protected getExpression(): string;
	protected getLogger(): Logger;
	protected abstract wire(): void;
	protected abstract unwire(): void;
	private removeDomListeners;
}
export declare class LoggerFactory {
	static getLogger(name: string): Logger;
}
export declare class PubSub implements Disposable {
	private listeners;
	private listenersByChannel;
	private moduleInstance;
	private context;
	private globalEnabled;
	constructor(context: any, moduleInstance?: Module);
	message(channelName: string, messageName: string, payload: any): void;
	broadcast(channelName: string, messageName: string, payload: any): void;
	broadcastGlobally(channelName: string, messageName: string, payload: any): void;
	dispose(): void;
	on(messageName: string): OnContinuation;
	private listenTo;
	private enableGlobal;
	private disableGlobal;
}
export declare class Stage {
	private started;
	private rootSelector;
	private logger;
	private initializers;
	private root;
	constructor(rootSelector: string);
	withInitializer(callback: () => void): Stage;
	start(): void;
	setComponent(component: Component): Stage;
	get<T>(id: string): T;
	getConfig(): Config;
	private domReady;
}
export declare function noConflict(): any;

export as namespace cydran;

export {};
