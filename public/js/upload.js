
$(function() {
	filepicker.setKey('A9EohQTTekVEh7qY7rVw4z');
	$("#pickfile").click(function chooseFile() {
		console.log("hi")
		filepicker.pick(function(InkBlob) {
			console.log(InkBlob.url);
			$("#empty").attr("src",InkBlob.url);
			$("#imgurl").attr("value",InkBlob.url);
		});
	});
})

