/// <reference types="node" />

/**
 * The piece of code between the HTMLElement and the Mvvm
 * @type M {@link ModelMediator}
 * @type E extends HTMLElement
 * @implements {@link Disposable}
 */
export declare abstract class ElementMediator<M, E extends HTMLElement | Text> implements Disposable {
	private logger;
	private ____internal$$cydran____;
	private moduleInstance;
	private mediator;
	private pubSub;
	private domListeners;
	constructor(dependencies: any);
	/**
	 * Dispose of ElementMediator when released.
	 * + All event listeners will be removed.
	 * + This element mediator will be unwired from any other DOM entanglements
	 * + The mediator reference to the model is released/nulled
	 * + Any value representation of this element mediator is released/nulled
	 * + The [[Mvvm|mvvm]] refernce is released/nulled
	 * + The parental reference is released/nulled
	 */
	dispose(): void;
	/**
	 * Initialize this element mediator.
	 */
	init(): void;
	/**
	 * Get the active module instance reference by id
	 * @return U
	 */
	get<U>(id: string): U;
	/**
	 * Set the [[Module|module]] instance reference
	 * @param {Module} moduleInstance
	 */
	setModule(moduleInstance: Module): void;
	/**
	 * [message description]
	 * @param {string} channelName [description]
	 * @param {string} messageName [description]
	 * @param {any}    payload     [description]
	 */
	message(channelName: string, messageName: string, payload?: any): void;
	/**
	 * Broadcast a message
	 * @param {string} channelName [description]
	 * @param {string} messageName [description]
	 * @param {any}    payload     [description]
	 */
	broadcast(channelName: string, messageName: string, payload?: any): void;
	/**
	 * Broadcast a message in the Global context
	 * @param {string} channelName [description]
	 * @param {string} messageName [description]
	 * @param {any}    payload     [description]
	 */
	broadcastGlobally(channelName: string, messageName: string, payload?: any): void;
	on(messageName: string): OnContinuation;
	protected bridge(name: string): void;
	/**
	 * Get the associated {HTMLElement html element} of this element mediator.
	 * @return {HTMLElement} [description]
	 */
	protected getEl(): E;
	/**
	 * [getModule description]
	 * @return {Module} [description]
	 */
	protected getModule(): Module;
	/**
	 * Gets the prefix.
	 * @return the prefix
	 */
	protected getPrefix(): string;
	/**
	 * [mediate description]
	 * @param  {string}        expression [description]
	 * @return {ModelMediator}            [description]
	 */
	protected mediate<T>(expression: string): ModelMediator<T>;
	/**
	 * [getModel description]
	 * @return {any} [description]
	 */
	protected getModel(): any;
	/**
	 * [getParent description]
	 * @return {Component} [description]
	 */
	protected getParent(): Component;
	/**
	 * [getMediator description]
	 * @return {ModelMediator} [description]
	 */
	protected getModelMediator(): ModelMediator<M>;
	protected $apply(fn: Function, args: any[], guard?: Guard): any;
	/**
	 * Get the expression specified
	 * @return {string} [description]
	 */
	protected getExpression(): string;
	/**
	 * Gets the logger.
	 * @return {Logger} logger instance
	 */
	protected getLogger(): Logger;
	/**
	 * Wire the element mediator
	 */
	protected abstract wire(): void;
	/**
	 * Unwire the element mediator
	 */
	protected abstract unwire(): void;
	private removeDomListeners;
}
/**
 * Core class for Cydran
 */
export declare class Component {
	private ____internal$$cydran____;
	private ____internal$$cydran$$module____;
	/**
	 * Constructor
	 * @param template - string value representation of a template
	 * @param config - optional {@link ComponentConfig} argument
	 */
	constructor(template: string, config?: ComponentConfig);
	/**
	 * Get the {@link MetadataContinuation} of the {@link Component}
	 */
	metadata(): MetadataContinuation;
	/**
	 * Component has a {@link Region}
	 * @returns boolean - true | false
	 */
	hasRegion(name: string): boolean;
	/**
	 * Set a child component
	 * @param name - string name value of the child {@link Component}
	 * @param component - the {@link Component} reference
	 */
	setChild(name: string, component: Component): void;
	setChildFromRegistry(name: string, componentName: string, defaultComponentName?: string): void;
	message(channelName: string, messageName: string, payload?: any): void;
	dispose(): void;
	getParent(): Component;
	getEl(): HTMLElement;
	get<T>(id: string): T;
	scope(): Scope;
	reset(): void;
	protected init(): void;
	protected getItem<T>(): T;
	protected getExternals<T>(): T;
	protected broadcast(channelName: string, messageName: string, payload?: any): void;
	protected broadcastGlobally(channelName: string, messageName: string, payload?: any): void;
	protected $apply(fn: Function, args: any[]): void;
	protected watch(expression: string, target: (previous: any, current: any) => void): void;
	protected on(messageName: string): OnContinuation;
	protected getLogger(): Logger;
	protected ____internal$$cydran$$init____(template: string, config: ComponentConfig): void;
}
export declare class ComponentConfigBuilder {
	private instance;
	constructor();
	withMetadata(name: string, value: any): ComponentConfigBuilder;
	withAttribute(name: string): ComponentConfigBuilder;
	withPrefix(prefix: string): ComponentConfigBuilder;
	build(): ComponentConfig;
}
export declare class LoggerFactory {
	/**
	 * Get the named logger
	 * @param name of the associated logger
	 */
	static getLogger(name: string): Logger;
}
export declare class Modules {
	static getModule(name: string): Module;
	static getDefaultModule(): Module;
	static forEach(fn: (instace: Module) => void): void;
	static broadcast(channelName: string, messageName: string, payload?: any): void;
	static registerConstant(id: string, instance: any): void;
	static registerPrototype(id: string, classInstance: any): void;
	static registerSingleton(id: string, classInstance: any): void;
	static registerElementMediator(name: string, supportedTags: string[], elementMediatorClass: any): void;
	static getScope(): Scope;
	static get<T>(id: string): T;
	private static logger;
	private static modules;
}
export declare class PubSub implements Disposable {
	private listeners;
	private listenersByChannel;
	private moduleInstance;
	private context;
	private globalEnabled;
	constructor(context: any, moduleInstance?: Module);
	message(channelName: string, messageName: string, payload?: any): void;
	broadcast(channelName: string, messageName: string, payload?: any): void;
	broadcastGlobally(channelName: string, messageName: string, payload?: any): void;
	dispose(): void;
	on(messageName: string): OnContinuation;
	private listenTo;
	private enableGlobal;
	private disableGlobal;
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
	COMPONENT_NESTING_CHANGED: string;
};
export declare const builder: (rootSelector: string) => StageBuilder;
export declare function noConflict(): any;
export interface ComponentConfig {
	getMetadata(key: string): any;
	getPrefix(): string;
	getAttributes(): string[];
}
export interface Disposable {
	dispose(): void;
}
export interface ForChannelContinuation {
	invoke(target: (payload: any) => void): void;
}
export interface Guard {
	isPropagateUp(): boolean;
	isPropagateDown(): boolean;
}
export interface Logger {
	getName(): string;
	trace(payload: any, error?: Error): void;
	ifTrace(payloadFn: () => any, error?: Error): void;
	debug(payload: any, error?: Error): void;
	ifDebug(payloadFn: () => any, error?: Error): void;
	info(payload: any, error?: Error): void;
	ifInfo(payloadFn: () => any, error?: Error): void;
	warn(payload: any, error?: Error): void;
	ifWarn(payloadFn: () => any, error?: Error): void;
	error(payload: any, error?: Error): void;
	ifError(payloadFn: () => any, error?: Error): void;
	fatal(payload: any, error?: Error): void;
	ifFatal(payloadFn: () => any, error?: Error): void;
	isTrace(): boolean;
	isDebug(): boolean;
	isInfo(): boolean;
	isWarn(): boolean;
	isError(): boolean;
	isFatal(): boolean;
	isDisabled(): boolean;
}
export interface MetadataContinuation {
	has: (name: string) => boolean;
	get: (name: string) => any;
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
export interface Module extends Register {
	getName(): string;
	associate(...componentClasses: any[]): Module;
	disassociate(...componentClasses: any[]): Module;
	clear(): Module;
	broadcast(channelName: string, messageName: string, payload?: any): void;
	message(channelName: string, messageName: string, payload?: any): void;
	expose(id: string): Module;
	get<T>(id: string): T;
	getLocal<T>(id: string): T;
	getScope(): Scope;
	addStrategy(strategy: RegistryStrategy): Module;
	getLogger(): Logger;
}
export interface OnContinuation {
	invoke(target: (payload: any) => void): void;
	forChannel(name: string): ForChannelContinuation;
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
export interface Stage {
	setComponent(component: Component): Stage;
	setComponentFromRegistry(componentName: string, defaultComponentName?: string): void;
	get<T>(id: string): T;
	start(): void;
}
export interface StageBuilder {
	withComponentBefore(id: string, moduleName?: string): StageBuilder;
	withComponentAfter(id: string, moduleName?: string): StageBuilder;
	withComponent(id: string): StageBuilder;
	withInitializer(callback: () => void): StageBuilder;
	withTraceLogging(): StageBuilder;
	withDebugLogging(): StageBuilder;
	withInfoLogging(): StageBuilder;
	withWarnLogging(): StageBuilder;
	withErrorLogging(): StageBuilder;
	withFatalLogging(): StageBuilder;
	withLoggingDisabled(): StageBuilder;
	build(): Stage;
}

export as namespace cydran;

export {};
