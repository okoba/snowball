(function($) {
  $(".snowball-main").on("open", ".snowball-block-table", function() {
      var block = $(this);
      var container = block.find(".table").get(0);
      var data = JSON.parse(block.find("[data-target='JSON']").val());

      var hot = new Handsontable(container, {
        data: data,
        rowHeaders: false,
        fixedRowsTop: 1,
        colHeaders: true,
        columnSorting: false,
        manualColumnMove: false,
        manualColumnResize: false,
        contextMenu: true,
        multiSelect: true,
        persistantState: true,
        fillHandle: true,
        observeChanges: true,
        search: true,
        undo: true,
        readOnly: false,
        stretchH: "all",
        afterChange: function (e) {
          refreshOnChange(block, data);
        },
        afterCreateRow: function (e) {
          refreshOnChange(block, data);
        },
        afterCreateCol: function (e) {
          refreshOnChange(block, data);
        },
        afterRemoveRow: function (e) {
          refreshOnChange(block, data);
        },
        afterRemoveCol: function (e) {
          refreshOnChange(block, data);
        }
      });

      $(this).trigger("render");
    });

    function refreshOnChange(block, data) {
      var generatedJSON = JSON.parse(JSON.stringify(data));
      var jsonString = JSON.stringify(generatedJSON);

      block.find("[data-target='JSON']").val(jsonString);
      block.find("[data-target='HTML']").val(createTable(generatedJSON));

      block.trigger("render");
    }

    function createTable(JSON) {
      var HTML = "<table>";
      var numRows = JSON.length;

      for (var i = 0; i < numRows; i++) {
        if (i === 0) {
          HTML = HTML + "<thead>";
        } else if (i === 1) {
          HTML = HTML + "</thead><tbody>";
        }
        HTML = HTML + "<tr>";
        for (var j = 0; j < JSON[i].length; j++) {
          if (JSON[i][j] === null) {
            JSON[i][j] = "";
          }

          if (i === 0) {
            HTML = HTML + "<th>" + JSON[i][j] + "</th>";
          } else {
            HTML = HTML + "<td>" + JSON[i][j] + "</td>";
          }
        }

        HTML = HTML + "</tr>";
      }

      HTML = HTML + "</tbody></table>";

      return HTML;
    }

})(jQuery);