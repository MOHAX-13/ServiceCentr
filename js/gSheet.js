console.log("gSheet");
$(document).ready(function(){ // после загрузки DOM
  $('#contact_form').submit(function(e){ // вешаем событие на отправку формы
    e.preventDefault(); // выключаем стандартное действие отправки
    var form = $(this); // запомним форму в переменной

    var data = form.serialize(); // сериализуем данные формы в строку для отправки, 
    console.log(data);

    $.ajax({ // инициализируем аякс
            url: "https://docs.google.com/forms/d/e/1FAIpQLSekw-qKPVID2XwdkFG5G7Uw78jCrVVjaF84hl0KF3vGmyiIsw/formResponse",
            data: data, // данные  которые мы сериализовали
            type: "POST", // постом
            dataType: "xml", // ответ ждем в формате xml
            beforeSend: function(){ // перед отправкой
              form.find('button').attr('disabled'); // отключим кнопку
            },
            statusCode: { // после того как пришел ответ от сервера
                0: function (){ // это успешный случай
                  form.html('<h4>Спасибо!</h4><p>Заказ оформлен</p>'); // сунем в форму сообщение что все ок
                },
                200: function (){ // это тоже успешный случай
                  form.html('<h4>Спасибо!</h4><p>Заказ оформлен</p>'); // сунем в форму сообщение что все ок
                }
            }
    });
  });
});

//адрес гкгл формы для таблицы
//https://docs.google.com/forms/d/e/1FAIpQLSekw-qKPVID2XwdkFG5G7Uw78jCrVVjaF84hl0KF3vGmyiIsw/formResponse
// номер заказа - name="entry.553477"
// наименование модели - name="entry.2144833880"
//IMEI - name="entry.713423815"
//Ф.И.О. - name="entry.971044723"
//Контакты - name="entry.67712943"
//Описание поломки - name="entry.28270132"
//Статус - name="entry.666522321"

// получаем данные с таблица в виде массива обьектов для формированя следующего номера заказа
$(document).ready(function(){
	$.getJSON("https://spreadsheets.google.com/feeds/list/1i0brXIbpyR0M38yo4WYQ0fgirGhxRZGXra9h-c9Oq64/od6/public/values?alt=json", function(data){
		var data = data['feed']['entry'];
		//console.log(data);
    var lastItem = data[data.length - 1];
    //console.log(lastItem);
    //console.log(Object.keys( lastItem ));
    //console.log(Object.values( lastItem ));
    var idx = Object.values( lastItem )[6];
    //console.log(idx.$t);
    var nameOrder = parseInt(idx.$t);
    //console.log(typeof nameOrder);

    document.getElementById('nameZ').value = nameOrder + 1;
    
		})
});