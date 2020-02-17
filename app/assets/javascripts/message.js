
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat__message-list-box" data-message-id=${message.id}>
         <div class="chat__message-list-box-info">
           <p div class="chat__message-list-box-info-name">
             ${message.user_name}
           </p>
           <p div class="chat__message-list-box-info-date">
             ${message.created_at}
           </p>
         </div>
         <div class="lower-message">
           <p class="chat__message-list-box-text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} class="lower-message__image" >
       </div>`
     return html;
   } else if (message.content){
     var html =
      `<div class="chat__message-list-box" data-message-id=${message.id}>
         <div class="chat__message-list-box-info">
           <p div class="chat__message-list-box-info-name">
             ${message.user_name}
           </p>
           <p div class="chat__message-list-box-info-date">
             ${message.created_at}
           </p>
         </div>
         <div class="lower-message">
           <p class="chat__message-list-box-text">
             ${message.content}
           </p>
         </div>
       </div>`
       return html;
   }else if (message.image){
    `<div class="chat__message-list-box" data-message-id=${message.id}>
         <div class="chat__message-list-box-info">
           <p div class="chat__message-list-box-info-name">
             ${message.user_name}
           </p>
           <p div class="chat__message-list-box-info-date">
             ${message.created_at}
           </p>
         </div>
         <div class="lower-message">
         <img src=${message.image}class="lower-message__image" >
         </div>
       </div>`
   };
   return html;
 }
 $(function(){ 
  var reloadMessages = function() {
    last_message_id = $('.chat__message-list-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat__message-list').append(insertHTML);
      $('.chat__message-list').animate({ scrollTop: $('.chat__message-list')[0].scrollHeight});
    }
  })
    .fail(function() {
      console.log('error');
    });
  };
  $('#new_message').on('submit', function(e){
    
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat__message-list').append(html);      
       $('form')[0].reset();
       $('.chat__message-list').animate({ scrollTop: $('.chat__message-list')[0].scrollHeight},'fast');
       $('.submit-btn').prop('disabled', false);
    })
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});