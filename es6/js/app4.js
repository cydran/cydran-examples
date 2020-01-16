const builder = cydran.builder;
const Component = cydran.Component;

class App4 extends Component {
  constructor() {
    super(document.querySelector("#myComponent").innerHTML.trim());
  }

  init() {
    this.pgLabel = "Cydran ES6 Example - Stuff";
  }

  cydranM1() {
    this.broadcastGlobally("modal", "show", {
      title: "Confirmation 1",
      name: "modalbody1",
      closeable: true,
    });
  }

  cydranM2() {
    this.broadcastGlobally("modal", "show", {
      title: "Confirmation 2",
      name: "modalbody2",
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
    if (confirm(msg)) {
      this.getLogger().info(msg);
    } else {
      this.getLogger().info("Someone is going to die!");
    }
  }
}

class ModalBody1 extends AbstractBody {
  constructor() {
    super($("#modalBody1").html().trim());
  }
}

class ModalBody2 extends AbstractBody {
  constructor() {
    super(document.querySelector("#modalBody2").innerHTML.trim());
  }
}

class Modal extends Component {
  constructor() {
    super(document.querySelector("#modalBox").innerHTML.trim());

    this.on("show").forChannel("modal").invoke(this.showModal);
    this.on("close").forChannel("modal").invoke(this.closeModal);
  }

  init() {
    this.title = "Modal Dialog";
    this.visible = false;
    this.closeable = false;
  }

  showModal(payload) {
    this.getLogger().info("Modal opening");
    this.setChildFromRegistry("body", payload.name);
    this.title = payload.title;
    this.closeable = payload.closeable;
    this.visible = true;
  }

  closeModal() {
    this.getLogger().info("Modal closing");
    this.visible = false;
    this.setChild("body", null);
  }
}

function modalCapacity(builder) {
  builder
    .withPrototype("modal", Modal)
    .withPrototype("modalbody1", ModalBody1)
    .withPrototype("modalbody2", ModalBody2);
}

builder("#pgpart")
  .withDebugLogging()
  .withCapability(modalCapacity)
	.withCapability((builder) => {
  	builder.withPrototype("app4", App4);
	})
  .withInitializer(function() {
    this.setComponentFromRegistry("app4");
  })
  .build()
  .start();
