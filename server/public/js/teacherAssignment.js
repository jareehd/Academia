function assignmentModal(){
  document.getElementsByClassName("assign-info")[0].style.display = "block";
  document.getElementsByClassName("stud-info")[0].style.display = "none";                 
  document.getElementsByClassName("right-box")[0].style.backgroundColor = "white";
  document.getElementsByClassName("right-box")[0].style.color = "black";
  document.getElementsByClassName("left-box")[0].style.backgroundColor = "#5c66ee";
  document.getElementsByClassName("left-box")[0].style.color = "white";
}

function submissionModal(){
  document.getElementsByClassName("assign-info")[0].style.display = "none";
  document.getElementsByClassName("stud-info")[0].style.display = "block";
  document.getElementsByClassName("left-box")[0].style.backgroundColor = "white";
  document.getElementsByClassName("left-box")[0].style.color = "black";
  document.getElementsByClassName("right-box")[0].style.backgroundColor = "#5c66ee";
  document.getElementsByClassName("right-box")[0].style.color = "white";
     
}