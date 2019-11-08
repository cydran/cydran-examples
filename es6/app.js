const Stage = cydran.Stage;
const Component = cydran.Component;

class App extends Component {

	constructor() {
		super('app', document.querySelector('#appComponent').innerHTML);
		this.text = 'No button has been clicked';
	}

	handleClickFirst() {
		this.text = 'The first button was clicked';
	}

	handleClickSecond() {
		this.text = 'The second button was clicked';
	}

}

let stage = new Stage('#app');
stage.getConfig().useDebug();

stage.withInitializer(function() {
	this.setComponent(new App());
});

stage.start();
