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
        var info = this.bindings;
        info.db = db;
        if (info.name != db.name) {
          info.name = db.name;
          this.setAttribute('key', info.name);
        }
        if (info.count != db.queries.length) {
          info.count = db.queries.length;
        }
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
            formatElapsed: formatElapsed,
            elapsedClassName: function (elapsed) {
              return 'Query ' + elapsedClassName(elapsed);
            }
          }
        });
        this.className = this.bindings.elapsedClassName(query.elapsed);
      },
      update: function (query) {
        var info = this.bindings;
        if (info.elapsed != query.elapsed) {
          this.className = this.bindings.elapsedClassName((
            info.elapsed = query.elapsed
          ));
        }
        if (info.query != query.query) {
          info.query = query.query;
        }
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