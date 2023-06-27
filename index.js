const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],monthMin = ['','','','','','','','','','','',''],days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],daysMin = ['','','','','','',''],seasons = ['invierno','primavera','verano','otoño'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 60;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear(); const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, year: getYearWithCounter(_year, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getYearWithCounter(year, counter) {return year + counter} function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}
//EV Script | postLocalComment v1.4 | MV

//Variables | Notifications | RU
const doneTitle = 'El comentario ha sido publicado!',
    doneText = 'Gracias por su comentario!',
    errorInputTitle = 'Error al publicar!',
    errorInputText = 'Algunos campos están rellenados incorrectamente.',
    errorSendTitle = 'Anteriormente ha publicado un comentario.',
    errorSendText = 'Pedimos disculpas por las molestias, de acuerdo con la política de uso del sitio, los comentarios posteriores deben ser moderados antes de su publicación.',
    emptyTownField = 'Ocultar',
    avatarUploaded = 'El avatar está cargado',
    imgUploaded = 'La imagen está cargada',
    fileTypeError = 'Tipo de archivo no valido',
    fileSizeError = 'Tamaño de archivo no válido (hasta 2 MB)',
    fileAllError = 'Tipo y tamaño de archivo no válidos (hasta 2 MB)';

//Variables | Feedback form
const nameInput = document.querySelector('.ev-feedback__field--name') || false,
    townInput = document.querySelector('' +
        '.ev-feedback__field--town') || false,
    ageInput = document.querySelector('.ev-feedback__field--age') || false,
    commentInput = document.querySelector('.ev-feedback__field--comment') || false,
    avatarInput = document.querySelector('.ev-feedback__chooser--avatar') || false,
    imgInput = document.querySelector('.ev-feedback__chooser--image') || false,
    submitBtn = document.querySelector('.ev-feedback__btn') || false;

//Variables | Comment block
const answerBlock = document.querySelector('.ev-answer') || null,
    answerName = document.querySelector('.ev-answer__name') || null,
    answerTown = document.querySelector('.ev-answer__town') || null,
    answerAge = document.querySelector('.ev-answer__age') || null,
    answerComment = document.querySelector('.ev-answer__comment') || null,
    answerAvatar = document.querySelector('.ev-answer__avatar') || null,
    answerImg = document.querySelector('.ev-answer__img') || null;

//Variables | File label
const avatarLabel = document.querySelector('.ev-feedback__label--avatar'),
    imgLabel = document.querySelector('.ev-feedback__label--image');

//Variables | File status
let avatarTypeStatus = false,
    avatarSizeStatus = false,
    imgTypeStatus = false,
    imgSizeStatus = false;

//Variables | Modal window
const modalWindow = document.querySelector('.ev-modal');

//Variables | Default notifications
const avatarDefault = avatarLabel ? avatarLabel.innerText : '',
    imgDefault = imgLabel ? imgLabel.innerText : '';

//Method | ReplaceAll for old browsers
String.prototype.replaceAll = function (search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

//Events
window.addEventListener('DOMContentLoaded', function () {
  createComment();
  changeFormStyles()
});

nameInput
    ? nameInput.addEventListener('input', function () {
      validationTextFields(nameInput, 1, true);
      changeErrorDescState(nameInput)
    })
    : false;

nameInput
    ? nameInput.addEventListener('focus', function () {
      changeErrorDescState(nameInput)
    })
    : false;

nameInput
    ? nameInput.addEventListener('blur', function () {
      this.nextElementSibling.classList.add('ev-input-error--hidden')
    })
    : false;

townInput
    ? townInput.addEventListener('keydown', function (event) {
      Number(event.key) ? event.preventDefault() : false
    })
    : false;

townInput
    ? townInput.addEventListener('change', function () {
      this.value = townInput.value.replaceAll(/[0-9]/, '')
    })
    : false;

ageInput
    ? ageInput.addEventListener('input', function (event) {
      isNaN(event.data) ? this.value = this.value.replace(/[^0-9]/, '') : false;
      validationAge(ageInput);
      changeErrorDescState(ageInput)
    })
    : false;

ageInput
    ? ageInput.addEventListener('change', function () {
      this.value = ageInput.value.replaceAll(/[A-Za-zА-Яа-яЁё]/, '')
    })
    : false;

ageInput
    ? ageInput.addEventListener('focus', function () {
      changeErrorDescState(ageInput)
    })
    : false;

ageInput
    ? ageInput.addEventListener('blur', function () {
      this.nextElementSibling.classList.add('ev-input-error--hidden')
    })
    : false;

commentInput
    ? commentInput.addEventListener('input', function () {
      validationTextFields(commentInput, 5);
      changeErrorDescState(commentInput)
    })
    : false;

commentInput
    ? commentInput.addEventListener('focus', function () {
      changeErrorDescState(commentInput)
    })
    : false;

commentInput
    ? commentInput.addEventListener('blur', function () {
      this.nextElementSibling.classList.add('ev-input-error--hidden')
    })
    : false;

avatarInput
    ? avatarInput.addEventListener('change', function () {
      setImgToLocalStorage('avatarUrl', this);
      changeFileInputState(avatarInput, avatarTypeStatus, avatarSizeStatus, avatarUploaded, fileTypeError, fileSizeError, fileAllError)
    })
    : false;

imgInput
    ? imgInput.addEventListener('change', function () {
      setImgToLocalStorage('imgUrl', this);
      changeFileInputState(imgInput, imgTypeStatus, imgSizeStatus, imgUploaded, fileTypeError, fileSizeError, fileAllError)
    })
    : false;

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  validationForm()
});

modalWindow.addEventListener('click', function (e) {
  e.preventDefault();
  const targetEl = e.target;

  targetEl.classList.contains('ev-modal') || targetEl.classList.contains('ev-modal__close') || targetEl.classList.contains('ev-modal__btn')
      ? modalWindow.classList.remove('ev-modal--active')
      : false
});

//Functions
function setImgToLocalStorage(key, inputFile) {
  const reader = new FileReader(),
      file = inputFile.files[0],
      isSize = file.size < 2200000,
      isImage = file ? file.type.split('/')[0] === 'image' : false;

  if (isImage && isSize) {
    reader.readAsDataURL(file);
    reader.onload = function () {
      localStorage.getItem(key) === null && localStorage.getItem('isPublished') === null
          ? localStorage.setItem(key, reader.result.toString())
          : false
    };

    validationFiles(inputFile, true, true);
  } else {
    !isImage && isSize
        ? validationFiles(inputFile, false, true)
        : !isSize && isImage
        ? validationFiles(inputFile, true, false)
        : !isImage && !isSize
            ? validationFiles(inputFile, false, false)
            : false
  }
}

function setTextToLocalStorage(key, value) {
  value.length !== 0 ? localStorage.setItem(key, value.trim()) : false;
}

function clearFeedbackForm(name, town, age, comment) {
  name ? name.value = '' : false;
  town ? town.value = '' : false;
  age ? age.value = '' : false;
  comment ? comment.value = '' : false;
}

function setItemsToLocalStorage() {
  setTextToLocalStorage('isPublished', 'true');
  nameInput ? setTextToLocalStorage('nameValue', nameInput.value) : false;
  townInput
      ? townInput.value.length !== 0
      ? setTextToLocalStorage('townValue', townInput.value)
      : setTextToLocalStorage('townValue', emptyTownField)
      : false;
  ageInput ? setTextToLocalStorage('ageValue', ageInput.value) : false;
  commentInput ? setTextToLocalStorage('commentValue', commentInput.value) : false;

  hideImg('imgUrl', answerImg)
}

function changeModalState(title, subtitle) {
  const modalTitle = document.querySelector('.ev-modal__title'),
      modalSubtitle = document.querySelector('.ev-modal__subtitle');

  modalTitle.innerText = title;
  modalSubtitle.innerText = subtitle;

  modalWindow.classList.add('ev-modal--active');
}

function createComment() {
  answerName !== null
      ? answerName.innerText = localStorage.getItem('nameValue')
      : false;
  answerTown !== null
      ? answerTown.innerText = localStorage.getItem('townValue') !== null ? localStorage.getItem('townValue') : ''
      : false;
  answerAge !== null
      ? answerAge.innerText = localStorage.getItem('ageValue') !== null ? localStorage.getItem('ageValue') : ''
      : false;
  answerComment !== null
      ? answerComment.innerText = localStorage.getItem('commentValue')
      : false;
  answerAvatar !== null
      ? answerAvatar.src = localStorage.getItem('avatarUrl') !== null ? localStorage.getItem('avatarUrl') : answerAvatar.src
      : false;
  answerImg !== null
      ? answerImg.src = localStorage.getItem('imgUrl') !== null ? localStorage.getItem('imgUrl') : answerImg.src
      : false;
  localStorage.getItem('isPublished') === 'true'
      ? answerBlock.classList.remove('ev-answer--hidden')
      : answerBlock.classList.add('ev-answer--hidden');
  localStorage.getItem('imgUrl') === null && localStorage.getItem('isPublished') === 'true'
      ? hideImg('imgUrl', answerImg)
      : false;
}

let lastComm = document.querySelector("#comments .item:last-child");

function addBorder() {
  lastComm.classList.add("set-border");
}

function postComment() {
  const isPublished = localStorage.getItem('isPublished') !== null;

  if (!isPublished) {
    setItemsToLocalStorage();
    createComment();
    addBorder();
    clearFeedbackForm(nameInput, townInput, ageInput, commentInput);
    setDefaultFileInputState();
    changeModalState(doneTitle, doneText)
  } else {
    clearFeedbackForm(nameInput, townInput, ageInput, commentInput);
    setDefaultFileInputState();
    changeModalState(errorSendTitle, errorSendText)
  }
}

function changeFormStyles() {
  const feedbackMain = document.querySelector('.ev-feedback'),
      dataSection = document.querySelector('.ev-feedback__section--data'),
      filesSection = document.querySelector('.ev-feedback__section--files'),
      dataInputs = document.querySelectorAll('.ev-feedback__profile .ev-feedback__field'),
      filesInputs = document.querySelectorAll('.ev-feedback__file');

  dataInputs.length === 2
      ? dataSection.classList.add('ev-feedback__section--two')
      : dataInputs.length === 1
      ? dataSection.classList.add('ev-feedback__section--one')
      : false;

  filesInputs.length === 1
      ? filesSection.classList.add('ev-feedback__section--one')
      : false;

  dataInputs.length > 1 && filesInputs.length === 1
      ? filesSection.classList.add('ev-feedback__section--full')
      : false;

  dataInputs.length === 1 && filesInputs.length === 1
      ? feedbackMain.classList.add('ev-feedback--structure')
      : false;
}

function changeFileInputState(node, typeStatus, sizeStatus, uploadedText, typeErrorText, sizeErrorText, allErrorText) {
  const inputLabel = node.parentNode,
      labelText = inputLabel.children[1].classList.contains('ev-feedback__label') ? inputLabel.children[1] : inputLabel.children[0];

  if (typeStatus && sizeStatus) {
    inputLabel.classList.remove('ev-feedback__file--error');
    inputLabel.classList.add('ev-feedback__file--loaded');
    labelText.innerText = uploadedText
  } else {
    inputLabel.classList.remove('ev-feedback__file--loaded');
    inputLabel.classList.add('ev-feedback__file--error');
    !typeStatus && !sizeStatus
        ? labelText.innerText = allErrorText
        : typeStatus && !sizeStatus
        ? labelText.innerText = sizeErrorText
        : !typeStatus && sizeStatus ? labelText.innerText = typeErrorText : false
  }
}

function setDefaultFileInputState() {
  const files = document.querySelectorAll('.ev-feedback__file');

  for (let i = 0; i < files.length; i++) {
    files[i].classList.remove('ev-feedback__file--loaded');
    files[i].classList.remove('ev-feedback__file--error')
  }

  avatarLabel ? avatarLabel.innerText = avatarDefault : false;
  imgLabel ? imgLabel.innerText = imgDefault : false
}

function validationForm() {
  const isNameValid = !nameInput ? true : validationTextFields(nameInput, 1),
      isAgeValid = !ageInput ? true : validationAge(ageInput),
      isCommentValid = !commentInput ? true : validationTextFields(commentInput, 5);

  isNameValid && isAgeValid && isCommentValid
      ? postComment()
      : changeModalState(errorInputTitle, errorInputText)
}

function validationTextFields(node, strLength) {
  if (node.value.length < strLength) {
    node.parentElement.classList.add('ev-feedback__profile--error');
    return false
  } else {
    node.parentElement.classList.remove('ev-feedback__profile--error');
    return true
  }
}

function validationAge(node) {
  if (node.value.length > 0) {
    if (node.value >= 18 && node.value <= 120) {
      node.parentElement.classList.remove('ev-feedback__profile--error');
      return true
    } else {
      node.parentElement.classList.add('ev-feedback__profile--error');
      return false
    }
  } else {
    node.parentElement.classList.remove('ev-feedback__profile--error');
    return true
  }
}

function validationFiles(inputFile, typeStatus, sizeStatus) {
  if (inputFile.name === 'avatar') {
    avatarTypeStatus = typeStatus;
    avatarSizeStatus = sizeStatus
  } else {
    imgTypeStatus = typeStatus;
    imgSizeStatus = sizeStatus
  }
}

function changeErrorDescState(input) {
  const inputHeight = input.clientHeight + 2;

  input.nextElementSibling.classList.contains('ev-input-error')
      ? input.nextElementSibling.style.top = inputHeight + 10 + 'px'
      : false;

  input.parentElement.classList.contains('ev-feedback__profile--error')
      ? input.nextElementSibling.classList.remove('ev-input-error--hidden')
      : input.nextElementSibling.classList.add('ev-input-error--hidden')
}

function hideImg(key, node) {
  localStorage.getItem(key) === null && node ? node.style.display = 'none' : false;
}




var resultWrapper = document.querySelector('.spin-result-wrapper');
var wheel = document.querySelector('.wheel-img');

function spin() {
  if (!wheel.classList.contains('rotated')) {
    wheel.classList.add('super-rotation');
    setTimeout(function () {
      resultWrapper.style.display = "block";
    }, 8000);
    setTimeout(function () {
      $('.spin-wrapper').slideUp();
      $('.order_block').slideDown();
      start_timer();
    }, 10000);
    wheel.classList.add('rotated');
  }
}
var closePopup = document.querySelector('.close-popup');
$('.close-popup, .pop-up-button').click(function (e) {
  e.preventDefault();
  $('.spin-result-wrapper').fadeOut();


  var top = $('#order0').offset().top;
  $('body,html').animate({
    scrollTop: top
  }, 800);
});

function outputDat(m, fullM) {
  var d = new Date();
  var p = new Date(d.getTime() - m * 86400000);
  var monthA = (fullM === false) ? '01,02,03,04,05,06,07,08,09,10,11,12'.split(',') :
    'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
  var w = p.getDate();
  var ret = (fullM === false) ? p.getDate() + '.' + monthA[p.getMonth()] + '.' + p.getFullYear() : p.getDate() +
    ' ' + monthA[p.getMonth()] + ' ' + p.getFullYear();
  return ret;
}

var time = 600;
var intr;

function start_timer() {
  intr = setInterval(tick, 1000);
}

function tick() {
  time = time - 1;
  var mins = Math.floor(time / 60);
  var secs = time - mins * 60;
  if (mins == 0 && secs == 0) {
    clearInterval(intr);
  }
  secs = secs >= 10 ? secs : "0" + secs;
  $(".timer").html("0" + mins + ':' + secs);
}


// --------------SCROLL-------------------
$("a:not(.sources__link)").on("touchend, click", function (e) {
  e.preventDefault();
  $('body,html').animate({ scrollTop: $('#order0').offset().top }, 400);
});

$(".ac_footer a, .ac_gdpr_fix a").unbind("click");

document.addEventListener("DOMContentLoaded", function () {
  const stickBlock = document.querySelector(".sidebar__product"),
    footer = document.querySelector("#order0");

  function setPos() {
    const stickParent = stickBlock.parentElement,
      stickParentTop = stickParent.getBoundingClientRect().top;
    if (window.pageYOffset > stickParentTop + 1100) {
      stickBlock.style.position = "fixed";
      stickBlock.style.top = "20px";
      if (stickBlock.getBoundingClientRect().bottom > footer.getBoundingClientRect().top - 20) {
        stickBlock.style.top = -(stickBlock.getBoundingClientRect().bottom - footer.getBoundingClientRect().top) + "px"
      }
    } else {
      stickBlock.style.position = "static"
    }
  }
  setPos();
  window.addEventListener("scroll", setPos)
});


const feedbackMain = document.querySelector('.ev-feedback');
const showComm = document.querySelector(".show-comm");

function showCommBlock() {
  feedbackMain.style.display = "flex";
  showComm.style.display = "none";
}

showComm.addEventListener("click", showCommBlock);