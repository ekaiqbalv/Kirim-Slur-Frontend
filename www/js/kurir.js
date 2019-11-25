var Application = {
  initApplication: function () {
    $(window).load("pageinit", "#list-data", function () {
      Application.getKurir()
    })

    $(document).on("click", "#detail-kurir", async function () {
      let id = $(this).data("idkurir")
      let dataObject = await Application.getByIdKurir(id)

      $('#i-id,#p-nama,#p-no-ktp,#p-no-telp').empty()
      $('#i-id').val(dataObject['data'].id)
      $('#p-nama').append(dataObject['data'].nama)
      $('#p-no-ktp').append(dataObject['data'].no_ktp)
      $('#p-no-telp').append(dataObject['data'].no_telp)
    })

    $(document).on("click", "#tambah-data-kurir", function () {
      let nama = $("#input-nama").val()
      let no_ktp = $("#input-no-ktp").val()
      let no_telp = $("#input-no-telp").val()
      const kurirData = { nama, no_ktp, no_telp }
      Application.addKurir(kurirData)
    })

    $(document).on("click", "#btn-delete", function () {
      let id = $("#i-id").val()
      Application.deleteKurir(id)
    })

    $(document).on("click", "#btn-update", async function () {
      let id = $("#i-id").val()
      let dataObject = await Application.getByIdKurir(id)

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
      const kurirData = { nama, no_ktp, no_telp }
      Application.updateKurir(id, kurirData)
    })
  },

  getKurir: function () {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir",
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data kurir...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        dataObject['data'].map(result => {
          var appendList =
            '<li><a href="#detail-data?id=' + result.id +
            '" target="_self" id="detail-kurir" data-idkurir="' + result.id +
            '"><h2>' + result.nama +
            "</h2><p>" + result.no_ktp +
            "</p><p><b>" + result.no_telp +
            "</b></p></a></li>"
          $("#list-kurir").append(appendList)
          $("#list-kurir").listview("refresh")
        })
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  },

  getByIdKurir: async function (id) {
    let kurirData
    await $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir/" + id,
      type: "get",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Mengambil data kurir...",
          textVisible: true
        })
      },
      success: function (dataObject, textStatus, xhr) {
        kurirData = dataObject
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })

    return kurirData
  },

  addKurir: function (data) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir",
      type: "post",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Menambah data kurir...",
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

  deleteKurir: function (id) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir/" + id,
      type: "delete",
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Menghapus data kurir...",
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

  updateKurir: function (id, data) {
    $.ajax({
      url: "http://kirimslur-server.herokuapp.com/kurir/" + id,
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Memperbarui data kurir...",
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