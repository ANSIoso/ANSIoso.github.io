const random_days_list = [14, 3, 22, 7, 18, 12, 1, 21, 10, 19, 25, 8, 6, 11, 4, 24, 15, 5, 9, 16, 20, 13, 23, 2, 17];

// Pattern delle dimensioni delle celle
const sizePatternB = [
  { col: 1, row: 1 }, // Elemento grande
  { col: 1, row: 1 }, // Elemento piccolo
  { col: 1, row: 2 }, // Elemento alto
  { col: 1, row: 1 }, // Elemento largo
  { col: 2, row: 1 }, // Elemento piccolo
  { col: 1, row: 2 }, // Elemento piccolo
];

const sizePatternS = [
    { col: 1, row: 2 }, // Elemento grande
    { col: 1, row: 3 }, // Elemento piccolo
    { col: 1, row: 2 }, // Elemento alto
    { col: 1, row: 1 }, // Elemento largo
    { col: 1, row: 2 }, // Elemento piccolo
    { col: 2, row: 1 }, // Elemento largo
];

// Genera i div e applica le dimensioni
random_days_list.forEach((day, index) => {
  let pack = document.createElement("div");
  
  let pack_content = document.createElement("div");
  let pack_cap = document.createElement("div");

  let pack_cap_decoration = document.createElement("div");
  let day_mark = document.createElement("div");
  let o_string = document.createElement("div");
  let v_string = document.createElement("div");

  // prendo come riferimento arr "sizePatternB" ma è la stessa cosa per "sizePatternS"
  // dal momento che entrambi hanno la stessa lunghezza
  let gridRef = index % sizePatternB.length;

  let sizeB;
  let sizeS;
  if(index != random_days_list.length-1){
    sizeB = sizePatternB[gridRef]; // Applica il pattern ciclico
    sizeS = sizePatternS[gridRef]; // Applica il pattern ciclico
  }else{
    sizeB = sizePatternB[gridRef];
    sizeS = { col: 3, row: 1 }
  }


  pack.classList.add(
    `col-span-${sizeS.col}`,
    `row-span-${sizeS.row}`,
    `md:col-span-${sizeB.col}`,
    `md:row-span-${sizeB.row}`,
    
    "relative",

    "min-h-[12vh]",
    "h-full",
  );

  pack_content.classList.add("pac_content", "pac_component");
  
  
  pack_cap.classList.add("pac_cap", "pac_component");
  
  
  
  o_string.classList.add("string", "o_string");
  pack_cap_decoration.appendChild(o_string);
  v_string.classList.add("string", "v_string");
  pack_cap_decoration.appendChild(v_string);


  day_mark.classList.add("day");
  day_mark.innerHTML = day;
  
  pack_cap_decoration.appendChild(day_mark)

  
  pack_cap_decoration.classList.add("pack_cap_decoration");
  pack_cap.appendChild(pack_cap_decoration);
  
  pack.appendChild(pack_content);
  pack.appendChild(pack_cap);
  

  pack.onclick = function(){
    pack_cap.classList.add("open");
  }

  document.getElementById("days_list").appendChild(pack);
});
