window.onload = function() {
	const Stage = cydran.Stage;
	const Component = cydran.Component;

	const urlParams = new URL(window.location).searchParams;
	const vMap = { t1: '#appComponent', t2: '#chooseComponent' };

	function getView(v) {
		const base = 't1';
		let vp = (urlParams.get(v) || base).toLowerCase();
		if (!vMap[vp]) {
			vp = base;
		}
		const sv = vMap[vp] || vMap[base];
		return { template: document.querySelector(sv).innerHTML.trim(), name: vp };
	}

	function getConstantValue(c) {
		return Number(urlParams.get(c));
	}

	const D_C = { COUNT: 10000, OFFSET: 250, IDX: 0 };
	const DIR = { UP: 1, DOWN: -1 };

	const wkview = getView('v');
	const iCnt = getConstantValue('c') || D_C.COUNT;
	const offset = getConstantValue('o') || D_C.OFFSET;
	const idx = getConstantValue('i') || D_C.IDX;
	const msg = urlParams.get('m') || 'nothing';

	class App extends Component {
		constructor() {
			super('app', wkview.template);
			this.pgLabel = 'Cydran ES6 Example - Page';
			this.origMsg = 'No button has been clicked';
			this.text = this.origMsg;
			this.selectedLabel = this.createLabel(msg);
			this.max = iCnt;
			this.fullData = null;
			this.buffData = [];
			this.arrayIdx = idx;
			this.mincount = 0;
			this.offset = offset <= this.max ? offset : this.max;
			this.allowPrior = false;
			this.allowNext = true;
			this.curPg = '';
			this.view = wkview.name;

			this.populateBuffer();
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

		setSelectedLabel(c) {
			this.selectedLabel = this.createLabel(c);
		}

		createLabel(c) {
			return 'label: #' + c;
		}

		updateBuffer(dir) {
			let p1 = this.arrayIdx;
			let p2 = this.arrayIdx + this.offset;
			const a = this.fullData;
			if (dir === DIR.DOWN) {
				p1 = this.arrayIdx - this.offset;
				p2 = p1 - this.offset;
				p2 = p2 < 0 ? 0 : p2;
				this.buffData = a.slice(p2, p1);
				this.arrayIdx = p1;
			} else {
				this.buffData = a.slice(p1, p2);
				this.arrayIdx = p2;
			}
			this.allowPrior = this.arrayIdx > this.offset;
			this.allowNext = this.arrayIdx < this.fullData.length;
		}

		toTheBeginning() {
			this.arrayIdx = 0;
			this.updateBuffer(DIR.UP);
		}

		toTheEnd() {
			this.arrayIdx = this.fullData.length - this.offset;
			this.updateBuffer(DIR.UP);
		}

		nextBuffer() {
			this.updateBuffer(DIR.UP);
		}

		previousBuffer() {
			this.updateBuffer(DIR.DOWN);
		}

		populateBuffer() {
			this.fullData = [];
			for (let i = 0; i < this.max; i++) {
				this.fullData.push({ id: i });
			}
			this.toTheBeginning();
		}

		clearBuffer() {
			this.buffData = [];
			this.arrayIdx = 0;
			this.setSelectedLabel(msg);
		}

		updatePageLoc() {
			const l = new URL(window.location);
			const p = l.searchParams;
			p.set('v', this.view);
			p.set('c', this.max);
			p.set('o', this.offset);
			this.curPg = l.href;
			console.log('this.curPg:', this.curPg);
		}

		goView(v) {
			this.view = v === 1 ? 't1' : 't2';
			this.updatePageLoc();
			window.location = this.curPg;
		}

		goInitialView() {
			const l = new URL(window.location);
			window.location = l.origin + l.pathname;
		}
	}

	let stage = new Stage('#pgpart');
	stage.getConfig().useDebug();

	stage.withInitializer(function() {
		const app = new App();
		app.curPag = window.location.href;
		this.setComponent(app);
	});

	stage.start();
};
