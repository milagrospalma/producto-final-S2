window.addEventListener('load', function() {
  var selectHeadquarters = document.getElementById('headquarters');
  var selectGeneration = document.getElementById('generation');
  var backgroundDefault = document.getElementById('background-default');
  var overview = document.getElementById('overview');
  var overviewBtn = document.getElementById('overview-btn');
  var students = document.getElementById('students');
  var studentsBtn = document.getElementById('students-btn');

  // Oculta contenido de overview
  overview.style.display = 'none';
  // Carga data al selector de Sedes
  var arrHeadquarter = Object.keys(data);
  // Creando un Array vacío para almacenar las sedes
  var arrOptionHeadquarter = [];
  // Creando un Array vacío para almacenar las generaciones de una sede
  var arrOptionGeneration = [];

  for (var i = 0; i < arrHeadquarter.length ; i++) {
    var option = document.createElement('option');
    if (arrHeadquarter[i] === 'AQP') {
      option.textContent = 'Arequipa';
      option.setAttribute('value', 'arequipa');
      arrOptionHeadquarter.push(i);
    }
    if (arrHeadquarter[i] === 'CDMX') {
      option.textContent = 'México';
      option.setAttribute('value', 'mexico');
      arrOptionHeadquarter.push(i);
    }
    if (arrHeadquarter[i] === 'LIM') {
      option.textContent = 'Lima';
      option.setAttribute('value', 'lima');
      arrOptionHeadquarter.push(i);
    }
    if (arrHeadquarter[i] === 'SCL') {
      option.textContent = 'Chile';
      option.setAttribute('value', 'chile');
      arrOptionHeadquarter.push(i);
    }
    selectHeadquarters.appendChild(option);
  }
  console.log(arrOptionHeadquarter); // [0, 1, 2, 3]
  // Eliminar después de prueba
  var greet = document.createElement('p');

  // Evento para cargar selector de Generaciones
  selectHeadquarters.addEventListener('change', function(event) {
    // Función para agregar opciones en selector Generación
    function addOptions(arrHeadquarter) {
      var objHeadquarters = data[arrHeadquarter];
      var arrGeneration = Object.keys(objHeadquarters);
      for (var i = arrGeneration.length - 1; i >= 0 ; i--) {
        var option = document.createElement('option');
        var textOption = arrGeneration[i];
        option.textContent = textOption;
        option.setAttribute('value', textOption);
        selectGeneration.appendChild(option);
        arrOptionGeneration.push(i);
      }
      // console.log(arrOptionGeneration); // [1, 0]
    }

    // Creando variable que almacena el índice de la opción seleccionada
    var selectedHeadquarter = selectHeadquarters.selectedIndex;
    if (selectedHeadquarter != 0) {
      backgroundDefault.style.display = 'none';
      overview.style.display = 'block';
      overviewBtn.removeAttribute('disabled');
      studentsBtn.removeAttribute('disabled');
      //
      switch (true) {
      case selectedHeadquarter === 1:
        // Desaparece el texto "Generación" del select y muestra una generación
        selectGeneration.options.length = 0;
        addOptions('AQP');
        // Creando variable que almacene el valor de la última generación
        var lastGeneration = selectGeneration.value; // devuelve 0 para todos
        console.log(lastGeneration);
        addOverviewDefault('AQP', lastGeneration);
        break;
      case selectedHeadquarter === 2:
        selectGeneration.options.length = 0;
        addOptions('CDMX');
        var lastGeneration = selectGeneration.value;
        addOverviewDefault('CDMX', lastGeneration);
        break;
      case selectedHeadquarter === 3:
        selectGeneration.options.length = 0;
        addOptions('LIM');
        var lastGeneration = selectGeneration.value;
        addOverviewDefault('LIM', lastGeneration);
        break;
      case selectedHeadquarter === 4:
        selectGeneration.options.length = 0;
        addOptions('SCL');
        var lastGeneration = selectGeneration.value;
        addOverviewDefault('SCL', lastGeneration);
        break;
      }
    } else {
      students.style.display = 'none';
      overview.style.display = 'none';
      backgroundDefault.style.display = 'block';
      // elimino las generaciones del select y muestra el texto "generación"
      selectGeneration.options.length = 1;
      // Retorna el select con el texto Generación
      selectGeneration.options[0].text = 'generación';
      overviewBtn.setAttribute('disabled', true);
      studentsBtn.setAttribute('disabled', true);
    }

    // Creando función para agregar overview por defecto
    function addOverviewDefault(nameHeadquarter, lastGeneration) {
      var arrNameGeneration = Object.keys(data[nameHeadquarter]);
      // console.log(arrGeneraciones);
      for (var i = 0; i < arrNameGeneration.length; i++) {
        if (arrNameGeneration[i] === lastGeneration) {
          var arrStudents = data[nameHeadquarter][lastGeneration].students;
        }
      }
      // console.log(arrStudents);
      // console.log(arrStudents.length);

      var contGoal = 0;// que alcanzaron la meta
      var contTech = 0;
      var contHse = 0;
      var qTech;
      var uHse;
      var contInactive = 0;

      for (var x = 0; x < arrStudents.length; x++) {
        if (arrStudents[x].active === false) {
          contInactive++;
        }
        // empezando los calculos cuando el alumno está activo
        if (arrStudents[x].active === true) {
          var sumTech = 0;
          var sumHse = 0;

          for (var y = 0; y < arrStudents[x].sprints.length; y++) { // va a sumar el puntaje total de los sprints-alumna en tech y hse
            sumTech += arrStudents[x].sprints[y].score.tech;
            // console.log(arrStudents[k].sprints[y].score.tech);//ingresa a la nota por número de sprint del alumno
            sumHse += arrStudents[x].sprints[y].score.hse;
            // console.log(arrStudents[k].sprints[y].score.hse);
          }
          // console.log(sumTech);//suma total de notas en tech de cada alumno de la generación elegida
          // console.log(sumHse);//suma total de notas en tech de cada alumno de la generación elegida
          // console.log(arrStudents[k].sprints)//me muestra los sprints del alumno

          // Cálculos para los promedios por generación escogida
          qTech = sumTech / arrStudents[x].sprints.length;// me muestra el promedio de las notas tech (sumTech/#sprints llevados)
          uHse = sumHse / arrStudents[x].sprints.length;// me muestra el promedio de las notas hse (sumHse/#sprints llevados)
          // console.log(qTech);//promedio de tech(de c/alumno)
          // console.log(arrStudents[k].sprints);//número de sprints(de c/alumno)

          if (uHse >= 840 && qTech >= 1240) {
            contGoal++;
          }
          if (qTech >= 1240) {
            contTech++;
          }
          if (uHse >= 840) {
            contHse++;
          }
        }
      }
      var retired = ((contInactive * 100) / arrStudents.length).toFixed(1);
      var studentAchievement = ((contGoal * 100) / arrStudents.length).toFixed(1);
      var neoTech = ((contTech / (arrStudents.length - contInactive)) * 100).toFixed(1);
      var neoSkills = ((contHse / (arrStudents.length - contInactive)) * 100).toFixed(1);

      // Achievement
      for (var i = 0; i < arrNameGeneration.length; i++) {
        if (arrNameGeneration[i] === lastGeneration) {
          var arrRatings = data[nameHeadquarter][lastGeneration].ratings;
        }
      }
      // console.log(arrRatings)//obtengo a todos los ratings de la generación elegida

      var detractors = 0;
      var promoters = 0;
      var pasive = 0;

      for (var z = 0; z < arrRatings.length; z++) {
        detractors += arrRatings[z].nps.detractors;
        promoters += arrRatings[z].nps.promoters;
        pasive += arrRatings[z].nps.passive;
      }
      var resultDetractors = (detractors / arrRatings.length).toFixed(1);
      var resultPromoters = (promoters / arrRatings.length).toFixed(1);
      var resultPasive = (pasive / arrRatings.length).toFixed(1);
      // ya no se multiplicó por 100, ya que el 100% es equivalente a la unidad
      var resultNps = resultPromoters - resultDetractors;

      // Parte Student satisfaction (para últimos gráficos)
      var excedExpectationStudents = 0;
      var averageTeacher = 0;
      var excedExpectationJedi = 0;
      for (var z = 0; z < arrRatings.length; z++) {
        excedExpectationStudents += arrRatings[z].student.supera;
        averageTeacher += arrRatings[z].teacher;
        excedExpectationJedi += arrRatings[z].jedi;
      }
      var averageTeacherResult = (averageTeacher / arrRatings.length).toFixed(1);
      var excedExpectationJediRating = (excedExpectationJedi / arrRatings.length).toFixed(1);

      var enrollment = document.getElementById('enrollment');
      enrollment.textContent = arrStudents.length;
      var retiredAlumn = document.getElementById('retiredAlumn');
      retiredAlumn.textContent = retired;
      var countAchievement = document.getElementById('countAchievement');
      countAchievement.textContent = contGoal;
      var percentageAchievement = document.getElementById('percentageAchievement');
      percentageAchievement.textContent = studentAchievement;
      var totalAlumns = document.getElementById('total-alumns');
      totalAlumns.textContent = arrStudents.length;
      var countSkills = document.getElementById('countSkills');
      countSkills.textContent = '';
      countSkills.textContent = contTech;
      var totalStudents = document.getElementById('totalStudentsTech');
      totalStudents.textContent = (arrStudents.length - contInactive);
      var percentageStudentsPass = document.getElementById('percentageStudentsTech');
      percentageStudentsPass.textContent = neoTech;
      var countHse = document.getElementById('countHse');
      countHse.textContent = contHse;
      var totalStudentsHse = document.getElementById('totalStudentsHse');
      totalStudentsHse.textContent = (arrStudents.length - contInactive);
      var percentageStudentsHse = document.getElementById('percentageStudentsHse');
      percentageStudentsHse.textContent = neoSkills;
      var promoterScore = document.getElementById('promoter-score');
      promoterScore.textContent = resultPromoters;
      var passiveScore = document.getElementById('passive-score');
      passiveScore.textContent = resultPasive;
      var detractorScore = document.getElementById('detractor-score');
      detractorScore.textContent = resultDetractors;
      var averageNps = document.getElementById('average-nps');
      averageNps.textContent = resultNps;
      var jedi = document.getElementById('jedi')
      jedi.textContent = excedExpectationJediRating;
      var teacher = document.getElementById('teacher');
      teacher.textContent = averageTeacherResult;
      var expectationStudents = document.getElementById('expectationStudents');
      expectationStudents.textContent = excedExpectationStudents;
    }
  });


  // Evento para cargar data al seleccionar una generación
  selectGeneration.addEventListener('change', function() {
    greet.textContent = 'Seleccionaste una generacion';
    overview.appendChild(greet);

    // for (var i = 0; i < arrOptionGeneration.length; i++) {
    //   var selectedGeneration = arrOptionGeneration[i];
    // }
    // console.log('value de la opción: ' + selectGeneration.value);
  });
  // Evento para el boton general
  overviewBtn.addEventListener('click', function() {
    students.style.display = 'none';
    overview.style.display = 'block';
    greet.textContent = 'Seleccionaste overview';
    overview.appendChild(greet);
    // backgroundDefault.style.display = 'none';
    // students.style.display = 'none';
    // overview.style.display = 'block';
  });
  // Evento click para el botón estudiantes
  studentsBtn.addEventListener('click', function() {
    overview.style.display = 'none';
    students.style.display = 'block';
    greet.textContent = 'Seleccionaste student';
    students.appendChild(greet);
    // // backgroundDefault.style.display = 'none';
    // overview.style.display = 'none';
    // students.style.display = 'block';
  });
});
// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
