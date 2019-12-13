$(document).ready(function() {

	$("#form_top").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			// $(this).find("input").val("");
			alert("Спасибо за заявку! Мы с вами скоро свяжемся!");
			$("#form_top").trigger("reset");
		});
		return false;
	});
	$("#form_contact").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			// $(this).find("input").val("");
			alert("Спасибо за заявку! Мы с вами скоро свяжемся!");
			$("#form_contact").trigger("reset");
		});
		return false;
	});

});