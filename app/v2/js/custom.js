
	$('#ShowHide').show();
	$('#nav').hide();
	$('#mask').hide();

	$('#ShowHide').click(function(event) {
		$('#nav').slideToggle(300);
		document.getElementById('menu-nav').classList.toggle('active');
    document.getElementById('mask').classList.toggle('activem');
	});

  $('#mask').click(function(event) {
		$('#nav').slideToggle(300);
		document.getElementById('menu-nav').classList.toggle('active');
    document.getElementById('mask').classList.toggle('activem');
	});

	$('#manager').click(function(event) {
		document.getElementById('manager-icon').classList.toggle('active');
	});

	$('#taxi').click(function(event) {
		document.getElementById('taxi-icon').classList.toggle('active');
	});
