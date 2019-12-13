window.onload = function() {
	const Stage = cydran.Stage;
	const Component = cydran.Component;

	const T1 = document.querySelector('#appComponent').innerHTML.trim();
	const T2 = document.querySelector('#chooseComponent').innerHTML.trim();

	const urlParams = new URL(window.location).searchParams;
	const wkview = urlParams.get('v') && urlParams.get('v').toUpperCase() == 'T2' ? T2 : T1;
	const iCnt = urlParams.get('c') && !isNaN(urlParams.get('c')) ? urlParams.get('c') : 10;

	class App extends Component {
		constructor() {
			super('app', wkview);
			this.origMsg = 'No button has been clicked';
			this.text = this.origMsg;
			this.selectedCount = 0;
			this.countArray = [];
			this.mincount = 0;
			for (let x = this.mincount; x < iCnt; x++) {
				this.countArray.push({ id: x, label: 'label - ' + x });
			}
		}

		handleClickFirst() {
			this.text = 'The first button was clicked';
		}

		handleClickSecond() {
			this.text = 'The second button was clicked';
		}

		resetOrig() {
			this.text = this.origMsg;
		}
	}

	let stage = new Stage('body');
	stage.getConfig().useDebug();

	stage.withInitializer(function() {
		this.setComponent(new App());
	});

	stage.start();
};
