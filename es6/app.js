const Stage = cydran.Stage;
const Component = cydran.Component;

class App extends Component {

	constructor() {
		super('app', () => document.querySelector('#appComponent').innerHTML);
		this.text = '';
	}

	handleClick() {
		this.text = 'I was clicked';
	}

}

let stage = new Stage('app');
stage.getConfig().useDebug();

stage.withInitializer(function() {
	this.setComponent(new App());
});

stage.start();
