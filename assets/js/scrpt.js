AOS.init();
const cards = document.querySelectorAll('.card');

const showModal = (e, card = "") => {
    //debugger;
    if (card === "") {
        card = e.currentTarget;
    }
    const modalStart = `
    <div class="modal-dialog" role="document">
    <button type="button" class="border border-danger close font-weight-bold p-3 rounded-circle text-danger" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div class="modal-content">
        </div>
    </div>
    `
    const modalBody = Array.from(card.children);
    card.innerHTML = modalStart;
    modalBody.forEach(body => card.querySelector('.modal-content').appendChild(body));
    card.classList.add('modal', 'fade');
    card.querySelector('.card-header').classList.add('modal-header');
    card.querySelector('.card-body').classList.add('modal-body');
    card.querySelector('.card-footer').classList.add('modal-footer');
    card.classList.add('modal', 'fade');
    card.classList.remove('card');
    setAttributes(card, {
        "tabindex": "-1",
        "role": "dialog",
        "aria-labelledby": "exampleModalLabel",
        "aria-hidden": "true"
    })
    const modalcard = $(card);
    modalcard.modal('show');
}
const removeModal = (modal) => {
    
    const cardChildren = Array.from(modal.querySelector('.modal-content').children);
    modal.querySelector('.modal-dialog').remove();
    cardChildren.forEach(body => modal.appendChild(body))
    modal.classList.add('card');
    modal.classList.remove('modal', 'fade');
    modal.querySelector('.card-header').classList.remove('modal-header');
    modal.querySelector('.card-body').classList.remove('modal-body');
    modal.querySelector('.card-footer').classList.remove('modal-footer');
    removeAttributes(modal, {
        "tabindex": "-1",
        "role": "dialog",
        "aria-labelledby": "exampleModalLabel",
        "aria-hidden": "true"
    })
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function removeAttributes(el, attrs) {
    for (var key in attrs) {
        el.removeAttribute(key);
    }
}
cards.forEach(card => card.addEventListener('click', showModal));

$('.module').on('hidden.bs.modal', function (e) {
    //debugger
    removeModal(this);
    this.addEventListener("click", showModal);
    this.querySelector('.full-text').classList.add('truncate-text');
    this.querySelector('.full-text').classList.remove('full-text');
    this.querySelector('.full-header').classList.add('truncate-header');
    this.querySelector('.full-header').classList.remove('full-header');
    // do something...
});
$('.module').on('show.bs.modal', function (e) {
    //debugger;
    this.removeEventListener("click", showModal);
    this.querySelector('.truncate-text').classList.add('full-text');
    this.querySelector('.truncate-text').classList.remove('truncate-text');
    this.querySelector('.truncate-header').classList.add('full-header');
    this.querySelector('.truncate-header').classList.remove('truncate-header');
    // do something...
});
$(".ct-btn-scroll").on('click', function (event) {
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            window.location.hash = hash;
        });
    }
});