function submit_function() {
    var name_1 = document.getElementById("name1").value;
    var name_2 = document.getElementById("name2").value;

    var names_string = name_1 + " " + name_2;

    calculate_letter_occurrance(names_string);
}

function calculate_letter_occurrance(names_string){
    document.getElementById("out").innerHTML = names_string;
}