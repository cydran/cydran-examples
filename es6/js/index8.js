window.onload = function() {
  const channelName = "App";
  const msgType = "doUpdate";
  const comms = new cydran.PubSub(channelName);
  let seq = 0;

  const builder = cydran.builder;
  const Component = cydran.Component;
  const PubSub = cydran.PubSub;
  const Stage = cydran.Stage;

	const templates = ["main", "myCollections", "group", "thing"].map((t) => {
		const tempTemplate = document.querySelector("template[id=" + t + "]").innerHTML.trim();
		return {"key": t, "value": tempTemplate};
	});

  const AppName = "App";
  const srcPath = "data/index7_data.min.json";
  const style_rotation = ["lowerRomanList", "lowerGreekList", "circleList"];

	const TEMPLATE = (key) => {
		return templates.find((t) => t.key == key).value;
	};

  class App extends Component {
    constructor() {
      super(TEMPLATE("main"));
      this.pubSub = new PubSub(AppName);
      this.on("updated").forChannel(AppName).invoke(this.dataUpdate);
      this.on("error").forChannel(AppName).invoke(this.dataError);
      this.log = this.getLogger();
    }

    init() {
      this.srcPath = srcPath;
      this.mylist = [];
    }

    loadBuffer() {
      axios
        .get(this.srcPath)
        .then(response => {
          this.message(AppName, "updated", response.data);
        })
        .catch(error => {
          this.message(AppName, "eroor", error);
        });
    }

    dataError(error) {
      this.log.error(error);
    }

    dataUpdate(data) {
      this.mylist = data;
      this.log.ifInfo(() => 'loaded "' + this.srcPath + '" file');
    }

    doAReset() {
      this.reset();
    }
  }

  class GroupCollection extends Component {
    constructor() {
      super(TEMPLATE("myCollections"));
    }
  }

  class Group extends Component {
    constructor() {
      super(TEMPLATE("group"));
    }
  }

  class Thing extends Component {
    constructor() {
      super(TEMPLATE("thing"));
    }
  }

  const wkappName = "mainapp";
  builder("body")
    .withDebugLogging()
    .withPrototype(wkappName, App)
    .withPrototype("myCollections", GroupCollection)
    .withPrototype("thing", Thing)
    .withPrototype("group", Group)
    .withInitializer(stage => {
      stage.setComponentFromRegistry(wkappName);
    })
    .build()
    .start();
};
