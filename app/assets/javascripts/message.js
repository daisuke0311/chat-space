$(function(){ 
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
         <img src=${message.image} >
       </div>`
     return html;
   } else {
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
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
  console.log(data.image)
    var html = buildHTML(data);
    $('.chat__message-list').append(html);      
       $('form')[0].reset();
       $('.chat__message-list').animate({ scrollTop: $('.chat__message-list')[0].scrollHeight});
       $('.submit-btn').prop('disabled', false);
  })
})
});