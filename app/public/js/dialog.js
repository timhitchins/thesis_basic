//Initial dialog box using dojo to give the user an AIN


require([
	"dijit/Dialog",
	"dojo/dom", 
	"dojo/on",
	"dojo/parser", 
	"dijit/form/TextBox", 
	"dojo/domReady!" 
	
], function(Dialog, dom, on, parser, TextBox){
	
	// create the dialog box
	myDialog = new dijit.Dialog({
      	title: "Thanks for Participating!",
      	content: "Your anonymous identification number (AIN) is: <br> <strong> <h3>" + ain + " </h2></strong><strong>Please write down this number.</strong><br> You will need it for this mapping activity and the following questionnaire.",
      	style: "width: 300px",
      	id: "myDialogId"
	});


	myDialog2 = new dijit.Dialog({
      	title: "Before You Proceed...",
      	content: "<strong> Don't forget to write down your anonymous identification number (AIN):" +
      		"<br> <h3>" + ain + " </h2></strong>You will need it for the following questionnaire.<br>" +
      		"<br> <a href='https://portlandstate.qualtrics.com/jfe/form/SV_a94XyJHp2kBg0FD'><button id='d_button3' onclick='myDialog2.show();'>Click here to proceed<br> to the questionnaire.</button></a><br>",
      	style: "width: 300px;",
      	id: "myDialogId2"
	});

});
  



// <a href='https://portlandstate.qualtrics.com/jfe/form/SV_a94XyJHp2kBg0FD'><button id='d_button2' onclick='myDialog2.show();'>Click here to proceed to the questionnaire.</button></a>