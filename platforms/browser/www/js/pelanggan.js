var Application = {
  initApplication: function() {
    $(window).load("pageinit", "#list-data", function() {
      Application.getListPelanggan();
    });
    $(document).on("click", "#btn-tambah-pelanggan", function() {
      let inputanKosong = "false";
      let inputan = $("#addDataPelanggan").find("input");
      inputan.each(function() {
        if ($(this).val() == "") {
          inputanKosong = "true";
        }
      });
      if (inputanKosong == "false") {
        let dataForm = $("#addDataPelanggan").serialize();
        Application.addPelanggan(dataForm);
      }
    });
    $(document).on("click", "#detail-pelanggan", async function() {
      let id = $(this).data("idpelanggan");
      let dataPelanggan = await Application.getPelangganById(id);
      window.location.href = "#detail-data";
      $("#p-nama").html(dataPelanggan.data.nama);
      $("#p-alamat").html(dataPelanggan.data.alamat);
      $("#p-kota").html(dataPelanggan.data.kota);
      $("#p-kode-pos").html(dataPelanggan.data.kodepos);
      $("#p-no-telp").html(dataPelanggan.data.no_telp);
      $("#edit-pelanggan").data("idpelanggan", dataPelanggan.data.id);
      $("#btn-hapus-pelanggan").data("idpelanggan", dataPelanggan.data.id);
    });
    $(document).on("click", "#edit-pelanggan", async function() {
      let id = $(this).data("idpelanggan");
      let dataPelanggan = await Application.getPelangganById(id);
      window.location.href = "#edit-data";
      $("#input-nama").val(dataPelanggan.data.nama);
      $("#input-alamat").val(dataPelanggan.data.alamat);
      $("#input-kota").val(dataPelanggan.data.kota);
      $("#input-kode-pos").val(dataPelanggan.data.kodepos);
      $("#input-no-telp").val(dataPelanggan.data.no_telp);
      $("#btn-edit-pelanggan").data("idpelanggan", dataPelanggan.data.id);
    });
    $(document).on("click", "#btn-edit-pelanggan", function() {
      let id = $(this).data("idpelanggan");
      let dataForm = $("#editDataPelanggan").serialize();
      Application.updatePelanggan(id, dataForm);
    });
    $(document).on("click", "#btn-hapus-pelanggan", function() {
      let id = $(this).data("idpelanggan");
      Application.deletePelanggan(id);
    });
  },

  addPelanggan: function(dataForm) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan/",
      type: "post",
      data: dataForm,
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang menyimpan data pelanggan...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        window.location.replace("pelanggan.html");
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  },

  getListPelanggan: function() {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan",
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang mengambil data...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        for (let index = 0; index < dataObject.data.length; index++) {
          var listPelanggan =
            '<li><a target="_self" id="detail-pelanggan" data-idpelanggan="' +
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

  getPelangganById: async function(id) {
    let dataPelanggan;
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan/" + id,
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang mengambil data...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        dataPelanggan = dataObject;
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
    return dataPelanggan;
  },

  updatePelanggan: function(id, dataForm) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan/" + id,
      type: "put",
      data: dataForm,
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang menyimpan data pelanggan...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        window.location.replace("pelanggan.html");
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
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Menghapus data pelanggan...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        window.location.replace("pelanggan.html");
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  }
};
