$(function() {
  getData();
});

function getData() {
  $.ajax({
    url: "http://localhost:5015/pelanggan",
    type: "get",
    beforeSend: function() {
      $("#data").html(
        '<div class="icon-loading"><i class="fas fa-spinner fa-spin"></i><div>Sedang mengambil data...</div></div>'
      );
    },
    success: function(dataObject) {
      $("#data").html("");
      for (let index = 0; index < dataObject.length; index++) {
        var appendData =
          '<div class="container-data">' +
          '<div class="data-header">' +
          dataObject[index].nama +
          "</div><div>" +
          dataObject[index].alamat +
          "</div><div><b>" +
          dataObject[index].kota +
          '</b></div><div class="container-action"><button type="button" class="btn btn-sm btn-danger">Hapus</button><button type="button" class="btn btn-sm btn-outline-secondary">Edit</button></div></div>';
        $("#data").append(appendData);
      }
    }
  });
}