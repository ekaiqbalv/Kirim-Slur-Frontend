var Application = {
  initApplication: function () {
    $(window).load("pageinit", "#list-data", function () {
      Application.getPengiriman()
    })

    //Click detail pengiriman
    $(document).on("click", "#detail-Pengiriman", async function () {
      let id = $(this).data("idpengiriman")
      let dataPengiriman = await Application.getByIdPengiriman(id)
      console.log(dataPengiriman)
      $("#i-id").val(dataPengiriman.data.id)

      let pengirim = await Application.getByIdPelanggan(dataPengiriman.data.id_pengirim)
      let penerima = await Application.getByIdPelanggan(dataPengiriman.data.id_penerima)
      let barang = await Application.getByIdBarang(dataPengiriman.data.id_barang)
      let kurir = await Application.getByIdKurir(dataPengiriman.data.id_kurir)

      $('#i-id,#p-no-resi,#p-tgl-pesan,#p-pengirim,#p-penerima,#p-barang,#p-kurir,#p-kategori,#p-total').empty()

      $('#p-no-resi').append(dataPengiriman['data'].no_resi)
      $('#p-tgl-pesan').append(moment.utc(dataPengiriman['data'].tanggal).format("DD-MM-YYYY, HH:mm:ss"))
      $('#p-pengirim').append(pengirim.data.nama)
      $('#p-penerima').append(penerima.data.nama)
      $('#p-barang').append(barang.data.nama)
      $('#p-kurir').append(kurir.data.nama)
      $('#p-kategori').append(dataPengiriman['data'].kategori)
      $('#p-total').append(dataPengiriman['data'].total)
      $("#btn-update").data("idpengiriman", id);
    })

    //Click tambah data
    $(document).on("click", "#btn-tambah-data", async function () {
      let dataKurir = await Application.getKurir()
      dataKurir['data'].map(result => {
        var appendList =
          "<option value=" +
          result.id +
          "> " +
          result.nama +
          "</option>"
        $("#select-kurir").append(appendList)
      })
      let dataPengirim = await Application.getPengirim()
      dataPengirim['data'].map(result => {
        var appendList =
          "<option value=" +
          result.id +
          "> " +
          result.nama +
          "</option>"
        $("#select-pengirim").append(appendList)
      })
      let dataPenerima = await Application.getPenerima()
      dataPenerima['data'].map(result => {
        var appendList =
          "<option value=" +
          result.id +
          "> " +
          result.nama +
          "</option>"
        $("#select-penerima").append(appendList)
      })
      let dataBarang = await Application.getBarang()
      dataBarang['data'].map(result => {
        var appendList =
          `<option value="${result.id}" data-berat="${result.berat}">${result.nama}</option>`
        $("#select-barang").append(appendList)
      })
    })

    //Add to database
    $(document).on("click", "#btn-tambah-pengiriman", function () {
      let no_resi = Application.makeNoresi()
      let tanggal = $("#input-tglpengiriman").val()
      let id_pengirim = $("#select-pengirim option:selected").val()
      let id_penerima = $("#select-penerima option:selected").val()
      let id_barang = $("#select-barang option:selected").val()
      let id_kurir = $("#select-kurir option:selected").val()
      let kategori = $("#select-jenis-kirim option:selected").text()
      let total = $("#total").val()
      const PengirimanData = {
        no_resi,
        tanggal,
        id_pengirim,
        id_penerima,
        id_barang,
        id_kurir,
        kategori,
        total
      }
      Application.addPengiriman(PengirimanData)
    })

    //Total number auto changed
    $(document).on("input", "#input-ongkir, #select-jenis-kirim", () => {
      let ongkir = $("#input-ongkir").val()
      let selectedBeratBarang = $("#select-barang option:selected").data('berat')
      let selectedKirim = $("#select-jenis-kirim option:selected").val()
      let total = (parseInt(ongkir) + selectedKirim * selectedBeratBarang)
      $("#total").val(total);
    })

    //Click update data
    $(document).on("click", "#btn-update", async function () {
      let id = $(this).data("idpengiriman")
      let dataObject = await Application.getByIdPengiriman(id)
      $('#edit-noresi').val(dataObject.data.no_resi)
      $('#edit-tglpengiriman').val(moment.utc(dataObject.data.tanggal).format("DD-MM-YYYY, HH:mm:ss"))

      let kurir = await Application.getByIdKurir(dataObject.data.id_kurir)
      let dataKurir = await Application.getKurir()
      dataKurir['data'].map(result => {
        var appendList =
          "<option value=" +
          result.id +
          " disabled> " +
          result.nama +
          "</option>"
        $("#edit-kurir").append(appendList)
      })
      $('#edit-kurir').val(kurir.data.id).selectmenu('refresh', true)

      let barang = await Application.getByIdBarang(dataObject.data.id_barang)
      let dataBarang = await Application.getBarang()
      dataBarang['data'].map(result => {
        var appendList =
          `<option value="${result.id}" data-berat="${result.berat}" data-kategori="${result.jenis}" disabled>${result.nama}</option>`
        $("#edit-barang").append(appendList)
      })
      $('#edit-barang').val(barang.data.id).selectmenu('refresh', true)

      let pengirim = await Application.getByIdPelanggan(dataObject.data.id_pengirim)
      let dataPengirim = await Application.getPengirim()
      dataPengirim['data'].map(result => {
        var appendList =
          "<option value=" +
          result.id +
          " disabled> " +
          result.nama +
          "</option>"
        $("#edit-pengirim").append(appendList)
      })
      $('#edit-pengirim').val(pengirim.data.id).selectmenu('refresh', true)

      let penerima = await Application.getByIdPelanggan(dataObject.data.id_penerima)
      let dataPenerima = await Application.getPenerima()
      dataPenerima['data'].map(result => {
        var appendList =
          "<option value=" +
          result.id +
          " disabled> " +
          result.nama +
          "</option>"
        $("#edit-penerima").append(appendList)
      })
      $('#edit-penerima').val(penerima.data.id).selectmenu('refresh', true)
      $("#edit-jenis-kirim > option").each(function() {
        if(this.text == dataObject.data.kategori){          
          $('#edit-jenis-kirim').val(this.value).selectmenu('refresh', true)          
        }
      });      
      let kategori = $("#edit-jenis-kirim option:selected").val()
      let hitungan = dataObject.data.total - (kategori * barang.data.berat)      
      $('#edit-ongkir').val(hitungan)
      $('#edit-total').val(parseInt(hitungan) + kategori * barang.data.berat)
      $("#btn-do-update").data("idpengiriman", id);      
    })

    //In edit form, total number auto changed
    $(document).on("input", "#edit-ongkir, #edit-jenis-kirim", () => {
      let ongkir = $("#edit-ongkir").val()
      let selectedBeratBarang = $("#edit-barang option:selected").data('berat')
      let selectedKirim = $("#edit-jenis-kirim option:selected").val()
      let total = (parseInt(ongkir) + selectedKirim * selectedBeratBarang)
      $("#edit-total").val(total);
    })

    //Update to database
    $(document).on("click", "#btn-do-update", async function () {
      let id = $(this).data("idpengiriman")
      let kategori = $("#edit-jenis-kirim option:selected").text()
      let total = $("#edit-total").val()
      const PengirimanData = {
        kategori,
        total
      }
      Application.updatePengiriman(id, PengirimanData)
    })

    $(document).on("click", "#btn-delete", function () {
      let id = $("#i-id").val()
      Application.deletePengiriman(id)
    })
  },

  //Generate Noresi
  makeNoresi: function () {
    var result = '';
    var characters = '0123456789';
    for (var i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  },

  addPengiriman: function (data) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pengiriman",
      type: "post",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Menambah data Pengiriman...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        if (xhr.status == 201) {
          window.location.replace("pengiriman.html")
        }
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getPengiriman: function () {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pengiriman",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pengiriman...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataObject['data'].map(result => {
          var appendList =
            '<li><a href="#detail-data?id=' + result.id +
            '" target="_self" id="detail-Pengiriman" data-idpengiriman="' + result.id +
            '"><h2>' + result.no_resi +
            "</h2><p>" + moment.utc(result.tanggal).format("DD-MM-YYYY, HH:mm:ss") +
            "</p><p><b>" + result.total +
            "</b></p></a></li>"
          $("#list-pengiriman").append(appendList)
          $("#list-pengiriman").listview("refresh")
        })
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getByIdPengiriman: async function (id) {
    let PengirimanData
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pengiriman/" + id,
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pengiriman...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        PengirimanData = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })

    return PengirimanData
  },

  updatePengiriman: function (id, data) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pengiriman/" + id,
      type: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(data),
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Memperbarui data Pengiriman...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        if (xhr.status == 200) {
          window.location.replace("pengiriman.html")
        }
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  deletePengiriman: function (id) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pengiriman/" + id,
      type: "delete",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Menghapus data Pengiriman...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        if (xhr.status == 204) {
          window.location.replace("pengiriman.html")
        }
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getPengirim: async function () {
    let dataPengirim
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pelanggan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataPengirim = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
    return dataPengirim
  },

  getPenerima: async function () {
    let dataPenerima
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Pelanggan...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataPenerima = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
    return dataPenerima
  },

  getByIdPelanggan: async function (id) {
    let DataPelanggan
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/pelanggan/" + id,
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Kurir...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        DataPelanggan = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
    return DataPelanggan
  },

  getBarang: async function () {
    let dataBarang
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Barang...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataBarang = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
    return dataBarang
  },

  getByIdBarang: async function (id) {
    let BarangData
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/barang/" + id,
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Barang...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        BarangData = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })

    return BarangData
  },

  getKurir: async function () {
    let dataKurir
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Kurir...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataKurir = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
    return dataKurir
  },

  getByIdKurir: async function (id) {
    let DataKurir
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir/" + id,
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data Kurir...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        DataKurir = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
    return DataKurir
  }
}