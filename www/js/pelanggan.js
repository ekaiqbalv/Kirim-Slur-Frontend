var Application = {
  initApplication: function() {
    $(window).load("pageinit", "#list-data", function() {
      Application.getListPelanggan();
    });
    $(document).on("click", "#detail-pelanggan", function() {
      let id = $(this).data("idpelanggan");
      Application.getPelangganById(id);
    });
    $(document).on("click", "#delete-pelanggan", function() {
      let id = $(this).data("idpelanggan");
      Application.deletePelanggan(id);
    });
  },

  getListPelanggan: function() {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan",
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Please wait while retrieving data...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        for (let index = 0; index < dataObject.data.length; index++) {
          var listPelanggan =
            '<li><a href="#detail-data?id=' +
            dataObject.data[index].id +
            '" target="_self" id="detail-pelanggan" data-idpelanggan="' +
            dataObject.data[index].id +
            '"><h2>' +
            dataObject.data[index].nama +
            "</h2><p>" +
            dataObject.data[index].kota +
            "</p><p><b>" +
            dataObject.data[index].kodepos +
            "</b></p></a></li>";
          $("#list-pelanggan").append(listPelanggan);
          $("#list-pelanggan").listview("refresh");
        }
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  },

  getPelangganById: function(id) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan/" + id,
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Please wait while retrieving data...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        $("#p-nama").html(dataObject.data.nama);
        $("#p-alamat").html(dataObject.data.alamat);
        $("#p-kota").html(dataObject.data.kota);
        $("#p-kode-pos").html(dataObject.data.kodepos);
        $("#p-no-telp").html(dataObject.data.no_telp);
        $("#delete-pelanggan").data("idpelanggan", dataObject.data.id);
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  },
  deletePelanggan: function(id) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan/" + id,
      type: "delete",
      success: function(dataObject) {
        window.location.replace("pelanggan.html");
      }
    });
  },
};
