window.onload = function() {
	const Stage = cydran.Stage;
	const Component = cydran.Component;
	const Modules = cydran.Modules;

	const T = document.querySelector('#myComponent').innerHTML.trim();
	const MODAL = document.querySelector('#modalBox').innerHTML.trim();
	const MODALBODY1 = $('#modalBody1').html().trim();
	//const MODALBODY1 = document.querySelector('#modalBody1').innerHTML.trim();
	const MODALBODY2 = document.querySelector('#modalBody2').innerHTML.trim();

	class App4 extends Component {
		constructor() {
			super(T);
		}

		init() {
			this.pgLabel = 'Cydran ES6 Example - Stuff';
		}

		cydranM1() {
			this.broadcastGlobally('modal', 'show', {
				title: 'Confirmation 1',
				name: 'modalbody1',
				closeable: true
			});
		}

		cydranM2() {
			this.broadcastGlobally('modal', 'show', {
				title: 'Confirmation 2',
				name: 'modalbody2'
			});
		}
	}

	class AbstractBody extends Component {
		constructor(template) {
			super(template);
		}

		handleClose() {
			this.broadcastGlobally("modal", "close", {});
		}

		pushSaveButton() {
			let msg = "I've saved something... and it isn't a piece of candy!";
			if(confirm(msg)) {
				this.getLogger().info(msg);
			} else {
				this.getLogger().info("Someone is going to die!");
			}
		}
	}

	class ModalBody1 extends AbstractBody {
		constructor() {
			super(MODALBODY1);
		}
	}

	class ModalBody2 extends AbstractBody {
		constructor() {
			super(MODALBODY2);
		}
	}

	class Modal extends Component {
		constructor() {
			super(MODAL);

			this.on('show').forChannel('modal').invoke(this.showModal);
			this.on('close').forChannel('modal').invoke(this.closeModal);
		}

		init() {
			this.title = 'Modal Dialog';
			this.visible = false;
			this.closeable = false;
		}

		showModal(payload) {
			this.getLogger().info('Modal opening');
			this.setChildFromRegistry('body', payload.name);
			this.title = payload.title;
			this.closeable = payload.closeable;
			this.visible = true;
		}

		closeModal() {
			this.getLogger().info('Modal closing');
			this.visible = false;
			this.setChild('body', null);
		}
	}

	Modules.registerPrototype('modal', Modal);
	Modules.registerPrototype('modalbody1', ModalBody1);
	Modules.registerPrototype('modalbody2', ModalBody2);

	let stage = new Stage('#pgpart');
	stage.getConfig().useDebug();
	stage.withInitializer(function() {
		this.setComponent(new App4());
	});

	stage.start();
};
