var DBMonster = DOMClass({
  name: 'dm-monster',
  'extends': HTMLTableElement,
  'static': {

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

  'with': DOMClass.bindings,
  constructor: function (dbs) {
    this.className = 'table table-striped latest-data';
    dbs.forEach(function (db) {
      this.appendChild(new DBMonster.Row(db));
    }, this.appendChild(document.createElement('tbody')));
  },
  update: function (dbs) {
    [].forEach.call(this.firstChild.children, this.subUpdate, dbs);
  },
  subUpdate: function (row, i) {
    row.update(this[i]);
  }
});