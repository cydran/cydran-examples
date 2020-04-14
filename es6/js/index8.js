window.onload = function() {
  const channelName = "App";
  const msgType = "doUpdate";
  const comms = new cydran.PubSub(channelName);
  let seq = 0;

  const builder = cydran.builder;
  const Component = cydran.Component;
  const PubSub = cydran.PubSub;
  const Stage = cydran.Stage;

  const appTemplate = document.querySelector("template[id=main]").innerHTML;
  const myCollectionsTemplate = document.querySelector(
    "template[id=myCollections]"
  ).innerHTML;
  const groupTemplate = document.querySelector("template[id=group]").innerHTML;
  const thingTemplate = document.querySelector("template[id=thing]").innerHTML;

  const AppName = "App";
  const srcPath = "data/index7_data.min.json";
  const style_rotation = ["lowerRomanList", "lowerGreekList", "circleList"];

  class App extends Component {
    constructor(srcPath) {
      super(appTemplate);
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
      super(myCollectionsTemplate);
    }
  }

  class Group extends Component {
    constructor() {
      super(groupTemplate);
    }
  }

  class Thing extends Component {
    constructor() {
      super(thingTemplate);
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
