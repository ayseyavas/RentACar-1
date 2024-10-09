﻿    $(document).ready(function () {
        // Marka seçildiğinde tetiklenecek
        $('#brandId').change(function () {
            var brandId = $(this).val(); // Seçilen brandId'yi al

            if (brandId) {
                // Eğer bir marka seçildiyse, AJAX çağrısı yaparak modelleri getir
                $.ajax({
                    url: '/Car/GetCarModelsByBrand', // Controller'daki action methodun URL'i
                    type: 'GET',
                    data: { brandId: brandId }, // Marka ID'sini gönder
                    success: function (response) {
                        // CarModel dropdown'unu aktif hale getir ve içini doldur
                        $('#modelId').prop('disabled', false); // Dropdown'u aktif et
                        $('#modelId').empty(); // Eski modelleri temizle
                        $('#modelId').append('<option value="">Model seçiniz</option>'); // Varsayılan seçenek ekle

                        // Gelen modelleri dropdown'a ekle
                        $.each(response.$values, function (i, model) {
                            $('#modelId').append('<option value="' + model.value + '">' + model.text + '</option>');
                        });
                    }
                });
            } else {
                // Eğer bir marka seçilmediyse, CarModel dropdown'unu kilitle
                $('#modelId').prop('disabled', true).empty().append('<option value="">Önce marka seçiniz</option>');
            }
        });
    });