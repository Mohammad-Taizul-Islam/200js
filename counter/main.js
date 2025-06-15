let num = 0;

const value = document.querySelector(".value");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const styles = e.currentTarget.classList;
        if(styles.contains("decrease") && num > 0){
            num--;
        }else if(styles.contains("increase")){
            num++;
        }else{
            num = 0;
        }
        value.textContent = num;
        if(num > 0){
            value.styles.color = "green";
        }else if(num < 0){
            value.styles.color = "red";
        }else{
            value.styles.color = "black";
        }
    });
})
