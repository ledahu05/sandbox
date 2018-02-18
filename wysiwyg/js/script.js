function resetGrid() {
    $(".grid").each(function(){ 
       $(this).css('border','');
    });
}



  options = {
  "indent":"auto",
  "indent-spaces":2,
  "wrap":80,
  "markup":true,
  "output-xml":false,
  "numeric-entities":true,
  "quote-marks":true,
  "quote-nbsp":false,
  "show-body-only":true,
  "quote-ampersand":false,
  "break-before-br":true,
  "uppercase-tags":false,
  "uppercase-attributes":false,
  "drop-font-tags":true,
  "tidy-mark":false
}





function loadCellVar(chaine) {
  if( (typeof chaine) == 'string') {
    //debug(chaine);
    var values = chaine.split("-");
    xsValue = values[0];
    smValue = values[1];
    mdValue = values[2];  
  } else {
    xsValue = 0;
    smValue = 0;
    mdValue = 0;
  }
}

function setColXs(){
  $(indexCell).removeClass (function (index, className) {
    return (className.match (/(^|\s)col-xs-\S+/g) || []).join(' ');
  });

  if(xsValue != 0) {
    $(indexCell).addClass('col-xs-' + xsValue);
  }  
}

function setColSm(){
  $(indexCell).removeClass (function (index, className) {
    return (className.match (/(^|\s)col-sm-\S+/g) || []).join(' ');
  });

  if(smValue != 0) {
    $(indexCell).addClass('col-sm-' + smValue);
  }  
}

function setColMd(){
  $(indexCell).removeClass (function (index, className) {
    return (className.match (/(^|\s)col-md-\S+/g) || []).join(' ');
  });

  if(mdValue != 0) {
    $(indexCell).addClass('col-md-' + mdValue);
  } 
}


function removeToolbar(pos) {
   $('.rowToolbar:eq(' + pos + ')').remove();
}

function resetToolBar() {
  $('#rowToolbarWrapper').append($("#mainModal .rowToolbar").prop("outerHTML"));
  $( "#mainModal .rowToolbar").remove();
}

function debug(element) {
  console.log(element);
}

//Used when performing action on a row
var currentRow;

//Used when editing configuration of a cell in a row
var indexRow;
var indexCell;
var xsValue;
var smValue;
var mdValue;
var lastID;
var nbEditorAdded;
var indexStore;

var icon_settings = "<div class='settings' contenteditable='false'><a  contentEditable='false' href='#' data-command='row-settings'><i class='fas fa-cog' contenteditable='false'></i></a></div>";

var grid_md_d12 = "<div class='editBlock' >" +                                         
                    "<div class='row' contentEditable>" + 
                      "<div  class='col-md-12 toolbar editor' contenteditable='true'><input type='hidden' class='store' name='cell_state' value='0-0-12'>" +                       
                      "<div  class='editor source' contenteditable='true'></div>" +                                          
                      icon_settings + 
                      "</div>" +
                    "</div>" + 
                    "<div class='addLine'>" +
                      "<img src='assets/plus.png' class='short img-responsive'>" +
                    "</div>" +
                  "</div>";

var grid_md_3x4 = "<div class='editBlock'>" +               
                    "<div class='row'>" +                    
                      "<div  class='col-md-3 toolbar editor' contenteditable='true'><input type='hidden' class='store' name='cell_state' value='0-0-3'>" +                       
                      "<div  class='editor source' contenteditable='true'></div>" +                                          
                      icon_settings + 
                      "</div>" +
                      "<div  class='col-md-3 toolbar editor' contenteditable='true'><input type='hidden' class='store' name='cell_state' value='0-0-3'>" +                       
                      "<div  class='editor source' contenteditable='true'></div>" +                                          
                      icon_settings + 
                      "</div>" +                      
                      "<div class='col-md-3 toolbar editor' contenteditable='true'><input type='hidden' class='store' name='cell_state' value='0-0-3'>" +                       
                      "<div  class='editor source' contenteditable='true'></div>" +                                          
                      icon_settings + 
                      "</div>" +                      
                      "<div class='col-md-3 toolbar editor' contenteditable='true'><input type='hidden' class='store' name='cell_state' value='0-0-3'>" +                       
                      "<div  class='editor source' contenteditable='true'></div>" +                                          
                      icon_settings + 
                      "</div>" +
                    "</div>" + 
                    "<div class='addLine'>" +
                      "<img src='assets/plus.png' class='short img-responsive'>" +
                    "</div>" +
                  "</div>";

function getGridMarkupt(gridId) {
  switch (gridId) {
  case 3:
    
    return grid_md_3x4;//.replace('editor', 'editor' + gridId);
    break;
  case 12:
    
    return grid_md_d12;//.replace('editor', 'editor' + gridId);
    break;  
  default:
    console.log('Sorry, we are out of ' + gridId + '.');
  }
}


$("document").ready(function() {

  var gridId;
  var position = 0;
	$('#myModal').modal({ show: false})
  $('#mainModal').modal({ show: false})
	$('#saveModal').prop('disabled', true);

  ////////////////
  //  Main Modal
  ////////////////
  //type of row to insert
  $(".grid").click(function() {
    resetGrid();
    $(this).css('border', "solid 4px blue"); 
    gridId = $(this).data('command');
    $('#saveModal').prop('disabled', false); 
  });

  //display row modal 
  $("#mainModal").unbind().on("click", ".addLine", function(event) {
     resetGrid();
     //lastID = getLastId();
     position = $(".addLine").index(this);
     
    $('#myModal').modal('show');
  }); 

  //close main modal with change
  $('#okMainModal').unbind().click(function () {

    //get markup
    var markup = '';
    $(  ".editBlock" ).each(function( index ) {
      //clone
      //on recupere le html
      $(this).css('border', '3px solid green');
      var $rowClone =$(this).clone();
      //debug($row);


      $row = $rowClone.find('.row');
      $row.removeAttr('contenteditable');

      $editor =  $rowClone.find('.editor');
      $editor.removeAttr('contenteditable');      
      
      
      var $rowToolbar = $rowClone.find('.rowToolbar');
      $rowToolbar.remove();

      var $addLine = $rowClone.find('.addLine');
      $addLine.remove();

      var $settings = $rowClone.find('.settings');
      $settings.remove();

      var $store = $rowClone.find('.store');
      $store.remove();

      var $dest = $rowClone.find('.toolbar');
      var $source = $rowClone.find('.source');
      $dest.text($source.text());

      //remove toolbar editor" id="0"
      $dest.removeAttr('id');
      $dest.removeClass('editor');
      $dest.removeClass('toolbar');
//      debug($rowClone.find('.settings'));
      //debug($row);
      //$(this).children('.')
      //$row.children('.store').remove();

      var html = $rowClone.html();
      //debug (html);
      if(html.indexOf('img-responsive') === -1) {
        markup = markup + html
      }
      
      
      //on l'ajoute à la fin de .markup
      //$(this).css('border', '3px solid green');
      //$('.markup').append($(".row").prop("outerHTML"));  
    });

      //markup = '<code>' + markup +  '</code>';
      var result = tidy_html5(markup, options);
      
      console.log(result);

    $('.markup').text(result);
    
    $('#mainModal').modal('hide');
  });

  //close main modal without change
  $('#closeMainModal').click(function () {
    $('mainModal').modal('hide');
  });
  
  //hide listener on main modal
  $("#mainModal").on("hidden.bs.modal", function () { // remove the event listeners when the dialog is dismissed
    $('.toolbar').focus();
  });

  $(document).on('hidden.bs.modal', function (event) {
    if ($('.modal:visible').length) {
      $('body').addClass('modal-open');
    }
  });

  //display the toolbars above the correct row
  $("#mainModal").on('mouseenter', '.editor.toolbar', function() {
    //console.log($(this).parent());
     $( ".rowToolbar").insertBefore($(this).parent());
     //$( ".rowToolbar").insertBefore($(this).parent());
     $("#mainModal").filter(".rowToolbar").show();
     $("#mainModal .rowToolbar").addClass('onscreen');
      currentRow = $(".row").index($(this).parent());
  });

  //remove the toolbars when row is not hoovered 
  $("#mainModal").on('mouseleave', '.editor', function() {
      //resetToolBar();
      $( "#mainModal").filter('.toolbar').remove();
  });

  //////////////////
  //  Add row Modal
  //////////////////

  //add selected row to main modal
  $('#saveModal').unbind().click(function () {
    //alert('position: ' + position);
    $(getGridMarkupt(gridId)).insertAfter($( ".editBlock:eq(" + position + " )" ));

    setAllEditorsId();


    /*nbEditorAdded = $( ".editBlock:eq(" + (position+1) + " ) .toolbar" ).length;
    
    
    
    //alert('lastid' + lastID);
    var count = 0;
    $( ".editBlock:eq(" + (position+1) + " ) .toolbar").each(function( index ) {
      //var editorID = lastID + nbEditorAdded - index + 1;  
      var editorID = lastID + index + 1;  
      //alert(editorID);
      $(this).css('border', '3px solid red');
      $(this).attr('id', editorID);
    });

    //$( ".editBlock:eq(" + (position+1) + " ) .toolbar").css('border', '3px solid red');
    */
    $('#myModal').modal('hide');
  });

  //close row modal without change
  $('#closeModal').click(function () {
    $('#myModal').modal('hide');
  });

  //hide listener on row modal
  $("#myModal").on("hidden.bs.modal", function () { 
    $('.toolbar').focus();
  });

  


  //////////////////////////////////
  //  Cell settings
  //  modal : id="cellSettingsModal"
  //  close : id="closeCellSettings"
  //  save  : id="saveCellSettings"
  //////////////////////////////////

  $('#saveCellSettings').unbind().click(function () {
    //debug('index of cell: ' + indexCell);
    //debug('index of row: ' + indexRow);  
    $('#cellSettingsModal').modal('hide');
    //append hidden field to the .settings user is coming from
    //debug(indexRow + '-' + indexCell + '-' + xsValue + '-' + smValue + '-' + mdValue);
    //save cell selection in hidden field as sibling of the clicked setting icon
    $(indexStore).remove();
    setColXs();
    setColSm();
    setColMd();

    //debug('writing for row=' + indexRow + ' and cell=' + (indexCell-1) + ' (xs,sm,md)=(' + xsValue + ',' + smValue + ',' + mdValue + ')');

    //debug('writing on (row,cell)=(' + indexRow + ',' + (initCell-1) + ')');
    //debug('values for (row,cell)=(' + indexRow + ',' + (initCell) + ')');
    //debug('values for (xs,sm,md)=(' + xsValue + ',' + smValue + ',' + mdValue + ')');
    $(indexCell).append('<input type="hidden" class="store" name="cell_state" value="' + xsValue + '-' + smValue + '-' + mdValue + '">');    
  });

  //close row modal without change
  $('#closeCellSettings').click(function () {
    $('#cellSettingsModal').modal('hide');
  });

  //hide listener on row modal
  $("#cellSettingsModal").on("hidden.bs.modal", function () { 
    $('.toolbar').focus();
  });

  $("#cellSettingsModal").on('click', '.btn_xs.btn_number', function(e) {
    //debug($(this));
    //debug($(e.target).text());
    xsValue = $(e.target).text();
    $('.btn_xs.btn_number').removeClass('active');
    $(this).addClass('active');
    $('#xs_layout').prop('checked', true);
  });

  $("#cellSettingsModal").on('click', '.btn_sm.btn_number', function(e) {
    smValue = $(e.target).text();
    $('.btn_sm.btn_number').removeClass('active');
    $(this).addClass('active');
    $('#sm_layout').prop('checked', true);
  });  

  $("#cellSettingsModal").on('click', '.btn_md.btn_number', function(e) {
    mdValue = $(e.target).text();
    $('.btn_md.btn_number').removeClass('active');
    $(this).addClass('active');
    $('#md_layout').prop('checked', true);
  });

  $('#cellSettingsModal').on('change', '#xs_layout', function(e) {
    if (this.checked) {
      $('.btn_xs.btn_number:eq(11)').addClass('active');
      xsValue = 12;
    } else {
      $('.btn_xs.btn_number').removeClass('active');
      xsValue = 0;
    }
  });

  $('#cellSettingsModal').on('change', '#sm_layout', function(e) {
    if (this.checked) {
      $('.btn_sm.btn_number:eq(11)').addClass('active');
      smValue = 12;
    } else {
      $('.btn_sm.btn_number').removeClass('active');
      smValue = 0;
    }
  });

  $('#cellSettingsModal').on('change', '#md_layout', function(e) {
    if (this.checked) {
      mdValue = 4
      $('.btn_md.btn_number:eq(3)').addClass('active');
    } else {
      mdValue = 0;
      $('.btn_md.btn_number').removeClass('active');
    }
  });  

  

  
  
  /////////////////////
  // Building toolbar
  /////////////////////
  var colorPalette = ['000000', 'FF9966', '6699FF', '99FF66','CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
                             
  var forePalette = $('.fore-palette');
  var backPalette = $('.back-palette');
         
  for (var i = 0; i < colorPalette.length; i++) {
    forePalette.append('<a href="#" data-command="forecolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
    backPalette.append('<a href="#" data-command="backcolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
  }

  ///////////////////////////////
  // Processing action on toolbar
  ///////////////////////////////
  $("#mainModal").on('click', '.toolbar a', function(e) {
    var command = $(this).data('command');
    if (command == 'h1' || command == 'h2' || command == 'p') {
      document.execCommand('formatBlock', false, command);
    }
    if (command == 'forecolor' || command == 'backcolor') {
      document.execCommand($(this).data('command'), false, $(this).data('value'));
    }
    if (command == 'createlink' || command == 'insertimage') {
      url = prompt('Enter the link here: ', 'http:\/\/');
      document.execCommand($(this).data('command'), false, url);
    } else document.execCommand($(this).data('command'), false, null);

    if (command == 'bold') {
      $('#mainModal').modal('show');
    }
  });


  $('.toolbar a').click(function(e) {
    var command = $(this).data('command');
    if (command == 'bold') {
      $('#mainModal').modal('show');
      //initCellSettingsModal(indexRow, indexCell);
    }
  });

  ////////////////////////////////////
  // Processing action on row rowbar
  ////////////////////////////////////
  $("#mainModal").on('click', '.rowbar a', function(e) {
   var command = $(this).data('command');
    if (command == 'copy') {
      
      $( ".editBlock:eq(" + currentRow + " )" ).clone().insertAfter($( ".editBlock:eq(" + (currentRow) + " )" ));
      $('#rowToolbarWrapper').append($("#mainModal .rowToolbar").prop("outerHTML"));
      $( "#mainModal .rowToolbar").remove();
      setAllEditorsId();
     
    }

    if (command == 'delete') {
      //re assign tool bar and hide it before remove.
      $('#rowToolbarWrapper').append($("#mainModal .rowToolbar").prop("outerHTML"));
      $( ".editBlock:eq(" + currentRow + " )" ).remove();
      setAllEditorsId();
    }
    //down
    //if (command == 'down') {
      //re assign tool bar and hide it before remove.
      //debug($(this));
      //$('#rowToolbarWrapper').append($("#mainModal .rowToolbar").prop("outerHTML"));
      //$( ".editBlock:eq(" + currentRow + " )" ).remove();
    //}
  });

   $("#mainModal").on('click', '.fa-arrow-down', function(e) {
      //debug($(this).parent().parent().parent().parent());
      //$(this).parent().parent().parent().parent().css('border','solid 3px red');
      //.edit box index, 0 index based, containing the icon 'arrow-down' icon
      var index = $(".editBlock").index($(this).parent().parent().parent().parent());
      //debug(index);
      
      //insert after the .editbox in position (index + 1)
      $($(this).parent().parent().parent().parent()).insertAfter($( ".editBlock:eq(" + (index + 1) + " )" ));
      setAllEditorsId();
   });

    $("#mainModal").on('click', '.fa-arrow-up', function(e) {
      //$(this).parent().parent().parent().parent().css('border','solid 3px red');
      //.edit box index, 0 index based, containing the icon 'arrow-down' icon
      //debug($(this).parent().parent().parent().parent());
      var index = $(".editBlock").index($(this).parent().parent().parent().parent());
      
      if(index != 1) {
        //insert before the .editbox in position (index + 1)
        $($(this).parent().parent().parent().parent()).insertBefore($( ".editBlock:eq(" + (index - 1) + " )" ));
        setAllEditorsId();
      }  
    });
  ////////////////////////////////////
  // Processing row config action on 
  ////////////////////////////////////
  $("#mainModal").on('click', '.settings', function(e) {
    //debug($(this));
    //debug($(this).parent());
    //debug($(this).parent().parent());
    //debug($(this).parent().parent().parent());
    //$(this).parent().css('border','solid 3px red');
    //$(this).parent().parent().css('border','solid 3px red');
    //.edit box index, 0 index based, containing the icon 'arrow-down' icon

    //TODO restreindre la selection à la ligne courante
    //alert($(this).parent().attr("id"));
    //indexCell = $(this).parent().attr("id");
    //indexRow = $(".editBlock").index($(this).parent().parent().parent()); //indexRow = 1 => first row



    //debug('click on (row,cell)=(' + indexRow + ',' + indexCell + ')');
    //debug('loading from (row,cell)=(' + indexRow + ',' + (indexCell-1) + ')');
    // $(".editBlock:eq(" + indexRow + ") .toolbar:eq(" + (indexCell-1) + ") .store" ).css('border', 'solid 3px red');
    // debug($(".editBlock:eq(" + indexRow + ") .toolbar:eq(" + (indexCell-1) + ") .store" ).val());
    //loadCellVar($(".editBlock:eq(" + indexRow + ") .toolbar:eq(" + (indexCell-1) + ") .store" ).val());
    indexStore = '#' + $(this).parent().attr('id') + ' .store'; 
    indexCell = '#' + $(this).parent().attr('id');

    //alert('editorId: ' + editorId);
    //loadCellVar($("#editBlock:eq(" + indexRow + ") .toolbar:eq(" + (indexCell-1) + ") .store" ).val());
    //debug($(editorId));
    //$(editorId).css('border', '3px solid green');
    loadCellVar($(indexStore).val());
    //loadCellModal();
    $('#cellSettingsModal').modal('show');
    initCell();
    //debug('index of cell: ' + indexCell);
    //debug('index of row: ' + indexRow);      
  });
  setAllEditorsId();

});


function initCell() {
  if(xsValue != 0) {
    $('#xs_layout').prop('checked', true);
    $('.btn_xs.btn_number').removeClass('active');
    $('.btn_xs.btn_number:eq('+(xsValue-1)+')').addClass('active');
    $(this).addClass('active');
  } else {
    $('#xs_layout').prop('checked', false);
    $('.btn_xs.btn_number').removeClass('active');
  }

  if(smValue != 0) {
    $('#sm_layout').prop('checked', true);
    $('.btn_sm.btn_number').removeClass('active');
    $('.btn_sm.btn_number:eq('+(smValue-1)+')').addClass('active');
    $(this).addClass('active');
  } else {
    $('#sm_layout').prop('checked', false);
    $('.btn_sm.btn_number').removeClass('active');
  }

  if(mdValue != 0) {
    $('#md_layout').prop('checked', true);
    $('.btn_md.btn_number').removeClass('active');
    $('.btn_md.btn_number:eq('+(mdValue-1)+')').addClass('active');
    $(this).addClass('active');
  } else {
    $('#md_layout').prop('checked', false);
    $('.btn_md.btn_number').removeClass('active');
  }
}

function getLastId() {
    var lastId;
     $(  ".editBlock .toolbar" ).each(function( index ) {
      lastId = index;
      //$(this).css('border', '3px solid green');
      
    });
     if (lastId === undefined) {
     return -1;
  }
  return lastId;
}

function setAllEditorsId() {

      //debug(indexCell);
    //$(indexCell).css('border', '3px solid green');

    

  $(  ".editBlock .toolbar" ).each(function( index ) {
      $(this).attr("id",index);
      //$(this).css('border', '3px solid green');
      /*$(this).toolbar({
        content: '#toolbar-options',
        position: 'bottom',
        style: 'primary',
        animation: 'flip'
      });*/
      //$(this).attr('contenteditable','true');
    });
}



