var Application = {
  initApplication: function() {
    $(window).load("pageinit", "#list-data", function() {
      Application.getListBarang();
    });
    $(document).on("click", "#btn-tambah-barang", function() {
      let inputanKosong = "false";
      let inputan = $("#addDataBarang").find("input");
      inputan.each(function() {
        if ($(this).val() == "") {
          inputanKosong = "true";
        }
      });
      if (inputanKosong == "false") {
        let dataForm = $("#addDataBarang").serialize();
        Application.addBarang(dataForm);
      }
    });
    $(document).on("click", "#detail-barang", async function() {
      let id = $(this).data("idbarang");
      let dataBarang = await Application.getBarangById(id);
      window.location.href = "#detail-data";
      $("#p-nama").html(dataBarang.data.nama);
      $("#p-jenis").html(dataBarang.data.jenis);
      $("#p-berat").html(dataBarang.data.berat);
      $("#edit-barang").data("idbarang", dataBarang.data.id);
      $("#btn-hapus-barang").data("idbarang", dataBarang.data.id);
    });
    $(document).on("click", "#edit-barang", async function() {
      let id = $(this).data("idbarang");
      let dataBarang = await Application.getBarangById(id);
      window.location.href = "#edit-data";
      $("#input-nama").val(dataBarang.data.nama);
      $("#input-jenis").val(dataBarang.data.jenis);
      $("#input-berat").val(dataBarang.data.berat);
      $("#btn-edit-barang").data("idbarang", dataBarang.data.id);
    });
    $(document).on("click", "#btn-edit-barang", function() {
      let id = $(this).data("idbarang");
      let dataForm = $("#editDataBarang").serialize();
      Application.updateBarang(id, dataForm);
    });
    $(document).on("click", "#btn-hapus-barang", function() {
      let id = $(this).data("idbarang");
      Application.deleteBarang(id);
    });
  },

  addBarang: function(dataForm) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang/",
      type: "post",
      data: dataForm,
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang menyimpan data barang...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        window.location.replace("barang.html");
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  },

  getListBarang: function() {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang",
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang mengambil data...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        for (let index = 0; index < dataObject.data.length; index++) {
          var listBarang =
            '<li><a target="_self" id="detail-barang" data-idbarang="' +
            dataObject.data[index].id +
            '"><h2>' +
            dataObject.data[index].nama +
            "</h2><p>" +
            dataObject.data[index].jenis +
            "</p><p><b>" +
            dataObject.data[index].berat +
            "</b></p></a></li>";
          $("#list-barang").append(listBarang);
          $("#list-barang").listview("refresh");
        }
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  },

  getBarangById: async function(id) {
    let dataBarang;
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang/" + id,
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang mengambil data...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        dataBarang = dataObject;
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
    return dataBarang;
  },

  updateBarang: function(id, dataForm) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang/" + id,
      type: "put",
      data: dataForm,
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Sedang menyimpan data barang...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        window.location.replace("barang.html");
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  },

  deleteBarang: function(id) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang/" + id,
      type: "delete",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Menghapus data barang...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        window.location.replace("barang.html");
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  }
};
