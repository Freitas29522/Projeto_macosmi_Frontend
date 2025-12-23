DevExpress.config({
    licenseKey: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjgzNmViZGU0LTdjMDQtNGUwYi1iMTA5LWFkMDhkMjdjMmQ2ZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjQyCn0=.B3VzE06vSeUBiPm/UYj9Ku5/7ZjEa1KU4cg77DHMRXE79B9leTAOybk8fzK/iX3koFMx/1R5thrPhoKVqsnT8aoYjgNmpYI3QWz7MliW8zp0sGlY9PP4SIA3utdV2aE36uC40A==',
    forceIsoDateParsing: true,
  });
  

DevExpress.ui.dxDataGrid.defaultOptions({
  options: {
    onCellPrepared: function (e) {
      if (e.rowType === "data" || e.rowType === "totalFooter") {
        if (typeof e.value === "number" && e.value < 0) {
          e.cellElement.addClass("negativo");
        }
      }
    }
  }
});