
$(document).click(()=>{
  fetch('/news').then(res => res.json()).then(res => console.log(res));
});
