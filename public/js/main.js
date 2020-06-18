const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const socket=io();

//Message from server
socket.on('message',message=>{
  console.log(message);
  outputMessage(message);

  //scoll down
  chatMessages.scrollTop=chatMessages.scrollHeight;

});

//message submit

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();

  //get message chat
  const msg=e.target.elements.msg.value;
  
  //emit message to server
  socket.emit('chatMessage',msg);

  //clear input
  e.target.elements.msg.value='';
  e.target.element.msg.focus();

});

//output Message to DOM
function outputMessage(message){
  const div=document.createElement('div');
  div.classList.add('message');
  div.innerHTML=`<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
   ${message}
  </p>`
  document.querySelector('.chat-messages').appendChild(div);


}