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
      const kurirData = $("#addDataKurir").serialize()
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
      const kurirData = $("#editDataKurir").serialize()
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
            `<li>
              <a href="#detail-data" target="_self" id="detail-kurir" data-idkurir="${result.id}">
                <h2>${result.nama}</h2>
                <p>${result.no_ktp}</p>
                <p><b>${result.no_telp}</b></p>
              </a>
            </li>`
          $("#list-kurir").append(appendList)
          $("#list-kurir").listview("refresh")
        })
      },
      error: function ({ 'responseJSON': error }) {
        alert(error.message)
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
      success: function (dataObject) {
        kurirData = dataObject
      },
      error: function ({ 'responseJSON': error }) {
        alert(error.message)
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
      data,
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Menambah data kurir...",
          textVisible: true
        })
      },
      success: function (dataObject) {
        window.location.replace("index.html")
      },
      error: function ({ 'responseJSON': error }) {
        alert(error.message)
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
      success: function (dataObject) {
        window.location.replace("index.html")
      },
      error: function ({ 'responseJSON': error }) {
        alert(error.message)
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
      data,
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Memperbarui data kurir...",
          textVisible: true
        })
      },
      success: function (dataObject) {
        window.location.replace("index.html")
      },
      error: function ({ 'responseJSON': error }) {
        alert(error.message)
      },
      complete: function () {
        $.mobile.loading("hide")
      }
    })
  }
}

$("#input-no-ktp, #edit-no-ktp").on("input", function () {
  this.value = this.value.slice(0, this.maxLength)
})