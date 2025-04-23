

function displaymsg(msg){
    console.log(msg)
}

let student={
    name:"ali",
    age:20

}



// export in node  
// module.exports=displaymsg;
// module.exports=student;
module.exports={displaymsg:displaymsg,student:student};
