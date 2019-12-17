window.onload = function() {
	const Stage = cydran.Stage;
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
		}

		init() {
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
			this.reset();
		}
	}

	let stage = new Stage('#pgpart');
	stage.getConfig().useDebug();
	stage.withInitializer(function() {
		this.setComponent(new App2());
	});

	stage.start();
};
