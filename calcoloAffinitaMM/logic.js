// Attenzione risolvere problema:


// estraggo i nomi dalle aree di testo
function submit_function() {
    var name_1 = document.getElementById("name1").value;
    var name_2 = document.getElementById("name2").value;

    var names_string = name_1 + " " + name_2;

    calculate_letter_occurrance(names_string);
}

// calcola il numero di volte che una determinata lettera è presente
function calculate_letter_occurrance(names_string) {
    var letter_count = new Map;

    // scorro tutte e solo le lettere dei due nomi
    for (var i = 0; i < names_string.length; i++) {
        var actual_letter = names_string.charAt(i) + "";

        // evito tutto ciò che non è una lettera
        if (!actual_letter.match(/[a-zA-Z]/)) {
            continue;
        }

        // porto tutte le lettere in "upper case" 
        // (per evitare di considerare "a" e "A" lettere differenti)
        actual_letter = actual_letter.toUpperCase();

        // se è una lettera che non ho mai registrato creo uno spazio 
        // all'interno della mappa
        if (!letter_count.has(actual_letter))
            letter_count.set(actual_letter, 0);

        // incremento il numero di volte che quella determinata lettera è presente
        letter_count.set(actual_letter, letter_count.get(actual_letter) + 1);
    }

    // =======================================================================================
    var str_letter_count = "";
    letter_count.forEach((value, key) => {
        str_letter_count += " " + key + ": " + value;
    });

    document.getElementById("calculation_area").innerHTML = "";
    document.getElementById("calculation_area").innerHTML += "<p>" + str_letter_count + "</p>";
    // =======================================================================================

    sum_letter_occurrance(letter_count);
}

function sum_letter_occurrance(letter_count) {
    var actual_sum = [];


    letter_count.forEach((element) => {
        actual_sum.push(element);
    });

    while (actual_sum.length > 2) {
        actual_sum = sum_extremes(actual_sum);

        var s = "";
        actual_sum.forEach((element) => {
            s += " " + element;
        });

        document.getElementById("calculation_area").innerHTML += "<p>" + s + "</p>";
    }
}

function sum_extremes(actual_sum) {
    var next_sum = [];
    var start = 0, end = actual_sum.length - 1;

    while (start <= end) {
        var next;

        if (start == end)
            next = actual_sum[start] + "";
        else
            next = actual_sum[start] + actual_sum[end] + "";

        for (var i = 0; i < next.length; i++)
            next_sum.push(parseInt(next.charAt(i)));

        start++;
        end--;
    }

    return next_sum;
}