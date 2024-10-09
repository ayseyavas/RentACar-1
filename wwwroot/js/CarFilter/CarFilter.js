﻿$(document).ready(function () {
    $('#filterForm').on('submit', function (event) {
        event.preventDefault(); // Formun normal submitini durdur

        // Form verilerini topla
        var filterData = {
            brandId: $('#brandId').val(),
            modelId: $('#modelId').val(),
            minPrice: $('#minPrice').val(),
            maxPrice: $('#maxPrice').val(),

        };

        $.ajax({
            type: "GET",
            url: "/Car/Sa", // Controller'daki actiona istek yap
            data: filterData,
            success: function (response) {
                // Gelen verilerle tabloyu güncelle
                $('#carTableBody').html(''); // Eski satırları temizle

                // response içindeki $values array'ini döngü ile işleyelim
                $.each(response.$values, function (i, car) {
                    $('#carTableBody').append(`
                <tr>
                    <td align="center" valign="middle">${car.id}</td>
                    <td align="center" valign="middle">${car.plate}</td>
                    <td align="center" valign="middle">${car.dailyPrice}</td>
                    <td align="center" valign="middle">${car.model.name}</td>
 <td align="center" valign="middle">${car.model.brand.name}</td>
                    <td align="center" valign="middle">
                    <a asp-controller="Car" asp-action="AddCarr" asp-route-id="${car.id}" type="button" class="btn btn-success" style="width:100px">Güncelle</a>
                </td>
                </tr>
            `);
                });
            },

            error: function () {
                alert("Bir hata oluştu, lütfen tekrarrrrr deneyin.");
            }
        });
    });
});