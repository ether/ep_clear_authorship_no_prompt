var clear_authorship_no_prompt = {
  init: function(context) {
    $('#clearAuthorship').off('click'); // remove pre-existing events
    $('#clearAuthorship').click(function(){ // add new click event handler
      context.ace.callWithAce(function(ace){ // call the function to apply the attribute inside ACE
        if ((!(ace.ace_getRep().selStart && ace.ace_getRep().selEnd)) || ace.ace_isCaret()){
          ace.ace_performDocumentApplyAttributesToCharRange(0, ace.ace_getRep().alltext.length, [['author', '']]);
        }
        else{
          ace.ace_setAttributeOnSelection('author', '');
        }
      }, 'clearAuthorship', true);
    });
  }
}
