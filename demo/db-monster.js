var DBMonster = DOMClass({
  name: 'dm-monster',
  'extends': HTMLTableElement,
  'with': DOMClass.bindings,
  'static': {
    // each Custom Element row of the bench (200 Row components per benchmark)
    // it binds 2 properties and 1 attribute resolved via callback
    // it binds 2 properties and 1 invoke per each query result
    // total of 12 bindings (properties) with 2 bound call (resolved via methods)
    Row: DOMClass({
      name: 'dm-monster-row',
      'extends': HTMLTableRowElement,
      'with': DOMClass.bindings,
      constructor: function (db) {
        this.createBindings({
          template: ''.concat(
            '<td class="dbname">{{name}}</td>',
            '<td class="query-count">',
              '<span data-bind="class:getCountClassName(count)">{{count}}</span>',
            '</td>'
          ),
          bindings: {
            db: db,
            name: db.name,
            count: db.queries.length,
            getCountClassName: function () {
              return getCountClassName(this.db);
            }
          }
        });
        this.setAttribute('key', db.name);
        this.queryResults = db.topFiveQueries.map(function (query) {
          return this.appendChild(new DBMonster.QueryResult(query));
        }, this);
      },
      update: function (db) {
        this.bindings.db = db;
        this.bindings.name = db.name;
        this.bindings.count = db.queries.length;
        this.setAttribute('key', db.name);
        this.queryResults.forEach(this.subUpdate, db.topFiveQueries);
      },
      subUpdate: function (qr, i) {
        qr.update(this[i]);
      }
    }),
    // last 5 Custom Elements per each Row (1000 QueryResult components per benchmark)
    // each TD binds 1 property and 1 invoke through the elapsed property
    QueryResult: DOMClass({
      name: 'dm-monster-query-cell',
      'extends': HTMLTableCellElement,
      'with': DOMClass.bindings,
      constructor: function (query) {
        this.createBindings({
          template: ''.concat(
            '<span class="foo">{{formatElapsed(elapsed)}}</span>',
            '<div class="popover left">',
              '<div class="popover-content">{{query}}</div>',
              '<div class="arrow"></div>',
            '</div>'
          ),
          bindings: {
            elapsed: query.elapsed,
            query: query.query,
            formatElapsed: formatElapsed
          }
        });
        this.className = elapsedClassName(query.elapsed);
      },
      update: function (query) {
        this.bindings.query = query.query;
        this.bindings.elapsed = query.elapsed;
        this.className = elapsedClassName(query.elapsed);
      }
    })
  },
  // the DBMonster Custom Element benchmark.
  //  total amount of benchmark Custom Elements per instance: 1201
  //  total amount of benchmark bindings per instance: 2400
  //  total amount of bound invokes per instance: 1000
  //  will it perform? Hell YEAH!
  //    http://webreflection.github.io/dom-class/demo/dbmonster.html
  constructor: function (dbs) {
    this.className = 'table table-striped latest-data';
    dbs.forEach(function (db) {
      this.appendChild(new DBMonster.Row(db));
    }, this.appendChild(document.createElement('tbody')));
  },
  update: function (dbs) {
    Array.prototype.forEach.call(
      this.firstChild.children, this.subUpdate, dbs);
  },
  subUpdate: function (row, i) {
    row.update(this[i]);
  }
});