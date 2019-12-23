window.onload = function() {
	const Stage = cydran.Stage;
	const Component = cydran.Component;
	const PubSub = cydran.PubSub;
	const $ = jQuery;

	const T = document.querySelector('#myComponent').innerHTML.trim();

	class App2 extends Component {
		constructor() {
			super(T);
		}

		init() {
			this.pgLabel = 'Cydran ES6 Example - Stuff';
		}

		logTheItem() {
			//alert("License Abbrev: " + this.selectedItem);
			this.getLogger().info("value: " + this.selectedItem);
		}

		toggleModal() {
			window.$("#myModal").modal('show');
			this.getLogger().info("Toggle-time!");
		}
	}

	let stage = new Stage('#pgpart');
	stage.getConfig().useDebug();
	stage.withInitializer(function() {
		this.setComponent(new App2());
	});

	stage.start();
};
