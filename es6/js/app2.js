window.onload = function() {
	const builder = cydran.builder;
	const Component = cydran.Component;
	const PubSub = cydran.PubSub;

	const T = document.querySelector('#myComponent').innerHTML.trim();
	const APP = "app";

	class App2 extends Component {
		constructor() {
			super(T);
			this.on('updated').forChannel(APP).invoke(this.dataUpdate);
			this.on('error').forChannel(APP).invoke(this.dataError);
			this.pubSub = new PubSub(new.target);
			this.baseline();
		}

		baseline() {
			this.pgLabel = 'Cydran ES6 Example - Data';
			this.buffData = [];
			this.selectedItem = "Nothing yet...";
			this.loadBuffer();
		}

		loadBuffer() {
			axios
				.get('./data/oss_licenses.json')
				.then(response => {
					this.pubSub.broadcast(APP, 'updated', response.data);
				})
				.catch(error => {
					this.pubSub.broadcast(APP, 'error', error);
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

		logTheItem() {
			//alert("License Abbrev: " + this.selectedItem);
			this.getLogger().info("value: " + this.selectedItem);
		}

		doReset() {
			this.baseline();
		}
	}

	builder('#pgpart')
		.withDebugLogging()
		.withInitializer(function() {
			const app = new App2();
			this.setComponent(app);
		})
		.build()
		.start();
};
