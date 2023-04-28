var saveBtn = document.getElementsByClassName('saveBtn');
var curTime = dayjs().hour();
var storage = [{
    name: 'h9',
    text: '',
  },
  {
    name: 'h10',
    text: '',
  },
  {
    name: 'h11',
    text: '',
  },
  {
    name: 'h12',
    text: '',
  },
  {
    name: 'h13',
    text: '',
  },
  {
    name: 'h14',
    text: '',
  },
  {
    name: 'h15',
    text: '',
  },
  {
    name: 'h16',
    text: '',
  },
  {
    name: 'h17',
    text: '',
  },
];

console.log('Current time => ' + curTime);

$(function () {

  var curStorage = JSON.parse(localStorage.getItem('data'));

  //tests for pre-existing local storage items
  if (!curStorage) {
    localStorage.setItem('data', JSON.stringify(storage));
  }
  
  //this function cycles through each date box and sets their color based on current time
  $('.time-block').each(function (i) {
    
    var timeTag = $(this).attr('id');
    var timeNum = Number(timeTag.substring(1));
    var timeText = getFromStorage(timeTag);
    var blockText = $($(this).children('textarea')[0]);
    blockText.val(timeText);
    console.log(blockText);
    console.log(timeNum);
    
    if (curTime === timeNum) {
      $(this).addClass('present')
    }
    if (curTime < timeNum) {
      $(this).addClass('future')
    }
    if (curTime > timeNum){
      $(this).addClass('past')
    };

    if (curStorage[i].name === timeTag) {
      $(this).textContent = curStorage[i].text;
    }
  });

  //this function checks if there is any text in local storage
  function getFromStorage(name) {
    var valueToReturn = '';
  
    for (var i = 0; i < curStorage.length; i++) {
      var curTime = curStorage[i];
      if (curTime.name === name) {
        valueToReturn = curTime.text;
        break;
      }
    }
    return valueToReturn;
  }
});

// this function checks for click events on the save button
$('.container-lg').on('click', '.saveBtn', handleInputSave);

function handleInputSave (e) {
  var input = $(this).parent().children('textarea').val().trim();
  var thisHr = $(this).parent().attr('id');
  updateStor(thisHr, input);
}

//this function handles local storage items
function updateStor(storageHr, text) {
  var curStor = localStorage.getItem('data');
  var storageParse = JSON.parse(curStor);

  for (var i = 0; i < storageParse.length; i++) {
    var curObj = storageParse[i];
    if (curObj.name === storageHr) {
      curObj.text = text;
      break
    }
  }
  
  localStorage.setItem('data', JSON.stringify(storageParse));
}