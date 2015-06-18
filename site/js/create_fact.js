$(document).ready(function(){

	$('#numMeasures').on('input propertychange paste', function(){
		var number = $(this).val();
		$('#addMeasures').empty();
		if(number > 0 && !isNaN(number)){
			for (var i = 0; i < number; i++) {
				var element = '<input type="text" placeholder="Enter Name" pattern="^[a-zA-Z]+$" name="measure'+ i +'" class="textMargin" required></div>';
				var label = '<div><label>Measure Name</label>'
				$('#addMeasures').append(label + element);
			}
		}
	});

	$('#btnSubmit').click(function(){
		var fields =  $("#regForm :input[name^='measure']").serializeArray();
		var dimName = $("#factName").val();
		var mart = $('#selectMart').val();
		if(mart ==""){
			alert("Please Select Mart");
			return false;
		}
		var param = "";
		for (var i = 0; i < fields.length; i++) {
			param = param + fields[i].name + "=" + fields[i].value + "&";
				
		}
		param = param + "mart=" + mart + "&type=fact" + "&dimName=" + dimName;
		var headers = { 'Content-Type': 'application/json'};
	 	$.ajax({
			url: 'http://localhost:8080/DataMartWeb/datamart/createfact?'+param,
			type: 'GET',
			//data: stringdata,
			contentType: 'application/json',
			timeout: 5000,
			success: function(data) {
				alert(JSON.stringify(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('error ' + textStatus + " " + errorThrown);
			}
		});

	});

});