window.onload = function() {
	const builder = cydran.builder;
	const Component = cydran.Component;
	const PubSub = cydran.PubSub;

	const T = document.querySelector('#myComponent').innerHTML.trim();

	class App extends Component {
		constructor() {
			super(T);
			this.pgLabel = 'Cydran ES6 Example - Stuff';
		}

		logTheItem() {
			//alert("License Abbrev: " + this.selectedItem);
			this.getLogger().info("value: " + this.selectedItem);
		}

		toggleModal() {
			window.$("#myModal").modal("show");
			this.getLogger().info("Toggle-time!");
		}
	}

	builder('#pgpart')
		.withDebugLogging()
		.withInitializer(function() {
			const app = new App();
			this.setComponent(app);
		})
		.build()
		.start();
};
