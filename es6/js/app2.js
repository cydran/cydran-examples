window.onload = function() {
	const builder = cydran.builder;
	const Component = cydran.Component;
	const requireNotNull = cydran.requireNotNull;

	const T = document.querySelector('#myComponent').innerHTML.trim();

	class App extends Component {
		constructor() {
			super(T);
			this.on('updated').forChannel(APP).invoke(this.dataUpdate);
			this.on('error').forChannel(APP).invoke(this.dataError);
			this.baseline();
		}

		baseline() {
			this.pgLabel = 'Cydran ES6 Example - Data';
			this.buffData = [];
			this.selectedItem = "Nothing yet...";
			this.lastHoverItem = "";
			this.loadBuffer();
		}

		loadBuffer() {
			axios
				.get('./data/oss_licenses.json')
				.then(response => {
					this.broadcast(APP, 'updated', response.data);
				})
				.catch(error => {
					this.broadcast(APP, 'error', error);
				});
		}

		dataError(error) {
			this.getLogger().error(error);
		}

		dataUpdate(data) {
			this.buffData = data;
		}

		updateItem(value) {
			this.selectedItem = value;
		}

		logTheItem(value) {
			this.lastHoverItem = value;
			this.getLogger().info("value: " + this.lastHoverItem.name);
		}

		doReset() {
			this.baseline();
		}
	}

	builder('#pgpart')
		.withDebugLogging()
		.withPrototype(App.name, App, ["$pubSub"])
		.withInitializer(stage => {
      stage.setComponentFromRegistry(App.name);
    })
		.build()
		.start();
};
