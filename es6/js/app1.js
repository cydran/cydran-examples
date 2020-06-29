/*jshint esversion: 6 */
window.onload = function() {
	const builder = cydran.builder;
	const Component = cydran.Component;
	const Filter = cydran.Filter;
	const Filters = cydran.Filters;
	const PagedFilter = cydran.PagedFilter;

	const urlParams = new URL(window.location).searchParams;

	const PGSIZE = 50;

	const APP_TEMPLATE = document.querySelector("#app").innerHTML.trim();
	class App extends Component {
		constructor() {
			super(APP_TEMPLATE);

			this.setBaseline();
			this.pgLabel = "Cydran ES6 Example - Paging";
			this.hardLimit = 1000000;

			this.filtered = Filters.builder(this, "m().fullData").paged();
			this.filtered.setPageSize(PGSIZE);

			this.on("PagedItem").forChannel(App.name).invoke(this.setTheLabel);
			this.setChild("filteredData", new Paged());
		}

		setBaseline() {
			this.rowCount = 10000;
			this.selectedItem = null;
			this.fullData = this.populateDataSet();
		}

		setTheLabel(label) {
			this.selectedItem = label;
		}

		populateDataSet() {
			const retval = new Array(this.rowCount);
			for (let i = 0; i < this.rowCount; i++) {
				retval[i] = { id: i };
			}
			return retval;
		}

		updateDataSet() {
			this.fullData = this.populateDataSet();
		}
	}

	const PAGED_TEMPLATE = document.querySelector("#paged").innerHTML.trim();
	class Paged extends Component {
		constructor() {
			super(PAGED_TEMPLATE);
		}

		doLabel(item) {
			this.broadcast(App.name, "PagedItem", item.id);
		}
	}

	builder("#pgpart")
		.withDebugLogging()
		.withInitializer(function() {
			const app = new App();
			this.setComponent(app);
		})
		.build()
		.start();
};
