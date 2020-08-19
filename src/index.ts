require("./test.css");

interface IProps {};	

function fff() {
   alert(222);
   const a: string = "dfdf";
   const b = 8989;

   const aa = document.getElementById("hhh1");
   if(aa) {
     aa.className="tcellAQVC";
   }

   console.log(a, b);
}


document.addEventListener('DOMContentLoaded', () => { fff() } )
