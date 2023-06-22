
var wrapperMenu = document.querySelector('.wrapper-menu');
var lis = document.querySelectorAll(".none");
console.log(lis);
li1 = lis[0];
li2  = lis[1];

wrapperMenu.addEventListener('click', function(){
wrapperMenu.classList.toggle('open');
li1.classList.toggle('none');
li2.classList.toggle('none');
})