var Application = {
  initApplication: function() {
    $(window).load("pageinit", "#list-data", function() {
      Application.initShowMhs();
    });
    $(document).on("click", "#detail-data", function() {
      var nim = $(this).data("idpelanggan");
      Application.initShowDetailMhs(nim);
    });
  },

  initShowMhs: function() {
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
        for (let index = 0; index < dataObject.length; index++) {
          var appendList =
            '<li><a href="#detail-data?id=' +
            dataObject[index].id +
            '" target="_self" id="detail-pelanggan" data-idpelanggan="' +
            dataObject[index].id +
            '"><h2>' +
            dataObject[index].nama +
            "</h2><p>" +
            dataObject[index].kota +
            "</p><p><b>" +
            dataObject[index].kodepos +
            "</b></p></a></li>";
          $("#list-pelanggan").append(appendList);
          $("#list-pelanggan").listview("refresh");
        }
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  },

  initShowDetailMhs: function(nim) {
    $.ajax({
      url: "http://ekaiqbalv.000webhostapp.com/web_service.php",
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Please wait while retrieving data...",
          textVisible: true
        });
      },
      success: function(dataObject) {
        for (let index = 0; index < dataObject.length; index++) {
          if (dataObject[index].NIM == nim) {
            $(
              "#p-nim,#p-nama,#p-jurusan,#p-fakultas,#p-alamat,#p-nohp"
            ).empty();
            $("#p-nim").append("<b>NIM: </b>" + dataObject[index].NIM);
            $("#p-nama").append("<b>Nama: </b>" + dataObject[index].Nama);
            $("#p-jurusan").append(
              "<b>Jurusan: </b>" + dataObject[index].Jurusan
            );
            $("#p-fakultas").append(
              "<b>Fakultas: </b>" + dataObject[index].Fakultas
            );
            $("#p-alamat").append("<b>Alamat: </b>" + dataObject[index].Alamat);
            $("#p-nohp").append("<b>NoHp: </b>" + dataObject[index].NoHp);
          }
        }
      },
      complete: function(dataObject) {
        $.mobile.loading("hide");
      }
    });
  }
};