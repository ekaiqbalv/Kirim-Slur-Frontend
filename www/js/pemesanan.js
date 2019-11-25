var Application = {
  initApplication: function () {
    $(window).load("pageinit", "#list-data", function () {
      Application.getPemesanan()
    })

    $(document).on("click", "#detail-Pemesanan", async function () {
      let id = $(this).data("idPemesanan")
      let dataObject = await Application.getByIdPemesanan(id)

      $('#i-id,#p-nama,#p-no-ktp,#p-no-telp').empty()
      $('#i-id').val(dataObject['data'].id)
      $('#p-nama').append(dataObject['data'].nama)
      $('#p-no-ktp').append(dataObject['data'].no_ktp)
      $('#p-no-telp').append(dataObject['data'].no_telp)
    })

    $(window).load("pageinit", "#tambah-data", function () {
      Application.getKurir()
      Application.getPengirim()
      Application.getPenerima()
      Application.getBarang()
    })

    $(document).on("click", "#btn-tambah-pemesanan", function () {
      let no_resi = Application.makeId()
      let tanggal = $("#input-tglpemesanan").val()
      tanggal = moment(tanggal).format("YYYY-MM-DD HH:mm:ss")
      let id_pengirim = $("#select-pengirim option:selected").val()
      let id_penerima = $("#select-penerima option:selected").val()
      let id_barang = $("#select-barang option:selected").val()
      let id_kurir = $("#select-kurir option:selected").val()
      let kategori = $("#select-barang option:selected").data('kategori')
      let total = $("#total").val()
      const PemesananData = {
        no_resi,
        tanggal,
        id_pengirim,
        id_penerima,
        id_barang,
        id_kurir,
        kategori,
        total
      }
      console.log(PemesananData)

      Application.addPemesanan(PemesananData)
    })

    $(document).on("click", "#btn-delete", function () {
      let id = $("#i-id").val()
      Application.deletePemesanan(id)
    })

    $(document).on("input", "#input-ongkir", () => {
      let ongkir = $("#input-ongkir").val()
      let selectedBeratBarang = $("#select-barang option:selected").data('berat')
      let selectedKirim = $("#select-jenis-kirim option:selected").val()
      console.log(selectedBeratBarang + " " + selectedKirim)
      let total = (parseInt(ongkir) + selectedKirim * selectedBeratBarang)
      $("#total").val(total);

    })

    $(document).on("click", "#btn-update", async function () {
      let id = $("#i-id").val()
      let dataObject = await Application.getByIdPemesanan(id)

      $('#edit-id').val(dataObject['data'].id)
      $('#edit-nama').val(dataObject['data'].nama)
      $('#edit-no-ktp').val(dataObject['data'].no_ktp)
      $('#edit-no-telp').val(dataObject['data'].no_telp)
    })

    $(document).on("click", "#btn-do-update", function () {
      let id = $("#edit-id").val()
      let nama = $('#edit-nama').val()
      let no_ktp = $('#edit-no-ktp').val()
      let no_telp = $('#edit-no-telp').val()
      const PemesananData = {
        nama,
        no_ktp,
        no_telp
      }
      Application.updatePemesanan(id, PemesananData)
    })
  },

  makeId: function () {
    var result = '';
    var characters = '0123456789';
    for (var i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  },

  getPemesanan: function () {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pemesanan",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pemesanan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataObject['data'].map(result => {
          var appendList =
            '<li><a href="#detail-data?id=' + result.id +
            '" target="_self" id="detail-Pemesanan" data-idPemesanan="' + result.id +
            '"><h2>' + result.nama +
            "</h2><p>" + result.no_ktp +
            "</p><p><b>" + result.no_telp +
            "</b></p></a></li>"
          $("#list-Pemesanan").append(appendList)
          $("#list-Pemesanan").listview("refresh")
        })
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getKurir: function () {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Kurir...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataObject['data'].map(result => {
          var appendList =
            "<option value=" +
            result.id +
            "> " +
            result.nama +
            "</option>"
          $("#select-kurir").append(appendList).selectmenu("refresh", true)
        })
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getPengirim: function () {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pelanggan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataObject['data'].map(result => {
          var appendList =
            "<option value=" +
            result.id +
            "> " +
            result.nama +
            "</option>"
          $("#select-pengirim").append(appendList).selectmenu("refresh", true)
        })
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getPenerima: function () {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pelanggan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataObject['data'].map(result => {
          var appendList =
            "<option value=" +
            result.id +
            "> " +
            result.nama +
            "</option>"
          $("#select-penerima").append(appendList).selectmenu("refresh", true)
        })
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getBarang: function () {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Barang...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataObject['data'].map(result => {
          var appendList =
            `<option value="${result.id}" data-berat="${result.berat}" data-kategori="${result.jenis}">${result.nama}</option>`
          $("#select-barang").append(appendList).selectmenu("refresh", true)
        })
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getByIdPemesanan: async function (id) {
    let PemesananData
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pemesanan/" + id,
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pemesanan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        PemesananData = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })

    return PemesananData
  },

  addPemesanan: function (data) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pengiriman",
      type: "post",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Menambah data Pemesanan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        if (xhr.status == 201) {
          window.location.replace("index.html")
        }
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  deletePemesanan: function (id) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pemesanan/" + id,
      type: "delete",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Menghapus data Pemesanan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        if (xhr.status == 204) {
          window.location.replace("index.html")
        }
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  updatePemesanan: function (id, data) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pemesanan/" + id,
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Memperbarui data Pemesanan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        if (xhr.status == 200) {
          window.location.replace("index.html")
        }
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  }
}