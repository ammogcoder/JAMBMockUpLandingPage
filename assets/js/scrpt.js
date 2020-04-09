AOS.init();
const section = document.querySelector('#section2');

const showModal = (e, card = "") => {
    
    if (card === "") {
        card = e.currentTarget.parentElement.parentElement;
    } else
        e.preventDefault();

    const modalDialog = CreateHTMLElement("div", {
        htmlclass: "modal-dialog".split(" "),
        htmlattribute: {
            "role": "document"
        }
    })

    const closeButton = CreateHTMLElement("button", {
        htmlclass: "bg-danger border border-danger close font-weight-bold p-3 rounded-circle text-white".split(" "),
        htmlattribute: {
            "data-dismiss": "modal",
            "aria-label": "Close"
        }
    })

    const spanX = CreateHTMLElement("span", {
        htmlclass: [],
        htmlattribute: {
            "aria-hidden": "true"
        }
    });

    const modalContent = CreateHTMLElement("div", {
        htmlclass: "modal-content".split(" ")
    });

    spanX.textContent = "x"

    closeButton.append(spanX);
    modalDialog.append(closeButton);
    modalDialog.append(modalContent);

    const modalBody = Array.from(card.children);
    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }

    card.append(modalDialog);
    modalBody.forEach(body => card.querySelector('.modal-content').append(body));
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
    
    const readMore = card.querySelector(".read-more");
    readMore.textContent = "read less";
    
    setAttributes(readMore, {
        "data-dismiss": "modal",
        "aria-label": "Close"
    });
    
    readMore.classList.add("read-less");
    readMore.classList.remove("read-more");

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
    removeAttributes(modal, ["tabindex", "role", "aria-labelledby", "aria-hidden"]);
    const readLess = modal.querySelector(".read-less");
    readLess.textContent = "read more";
    removeAttributes(readLess, ["data-dismiss", "aria-label"]);
    readLess.classList.add("read-more");
    readLess.classList.remove("read-less");
}

const setAttributes = (el, attrs) => {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

const removeAttributes = (el, ...attrs) => {
    attrs.forEach(key => el.removeAttribute(key));
}
let Services;
const initialize = (data) => {
    
    Services = data;
    const cards = data.map(CreateCard)
    cards.forEach(card=> section.append(card));
    document.querySelectorAll('.read-more').forEach(val => val.addEventListener('click', showModal));
    modalEvent();
}



fetch("assets/JSON/postregfac.json").then(response =>  response.json()).then(initialize);

const modalEvent = () =>{
    $('.module').on('hidden.bs.modal', function (e) {
        
        removeModal(this);
        this.querySelector('.full-text').classList.add('truncate-text');
        this.querySelector('.full-text').classList.remove('full-text');
        this.querySelector('.full-header').classList.add('truncate-header');
        this.querySelector('.full-header').classList.remove('full-header');
        // do something...
    });

    $('.module').on('show.bs.modal', function (e) {
        
        this.querySelector('.read-less').removeEventListener("click", showModal)
        this.querySelector('.truncate-text').classList.add('full-text');
        this.querySelector('.truncate-text').classList.remove('truncate-text');
        this.querySelector('.truncate-header').classList.add('full-header');
        this.querySelector('.truncate-header').classList.remove('truncate-header');
        // do something...
    });
}

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

const CreateHTMLElement = (HTMLElement, {
    htmlclass: [...classes],
    htmlattribute: attr
} = {}) => {
    const element = document.createElement(HTMLElement);
    classes.length > 0 ? classes.forEach(val => element.classList.add(val)) : "";
    typeof attr !== "undefined" ? setAttributes(element, attr) : "";
    return element;
}

const CreateCard = ({
    ServiceImage = "",
    ServiceTitle,
    ServiceDescription,
    ServicePrice,
    ServiceUrl = "#",
    Sub = []
} = response, index=0) => {
    
    const Card = CreateHTMLElement("div", {
        htmlclass: "card module d-flex justify-content-center hvr-grow mb-4 shadow lead".split(" "),
        htmlattribute: {
            "data-aos": "fade-up"
        }
    });

    const Image = CreateHTMLElement("IMG", {
        htmlclass: "card-img img-fluid img-top".split(" "),
        htmlattribute: {
            src: ServiceImage
        }
    });

    const CardHeader = CreateHTMLElement("div", {
        htmlclass: "card-header py-0 bg-white border-bottom-0".split(" ")
    });

    const cardTitle = CreateHTMLElement("div", {
        htmlclass: "my-0 truncate-header font-weight-normal".split(" "),
        htmlattribute: {
            "title": ServiceTitle
        }
    });

    const CardBody = CreateHTMLElement("div", {
        htmlclass: "card-body py-0 d-flex flex-column".split(" "),
    });

    const CardBodyContent = CreateHTMLElement("p", {
        htmlclass: "truncate-text".split(" "),
        htmlattribute: {
            "title": ServiceDescription
        }
    });

    const ReadMore = CreateHTMLElement("P", {
        htmlclass: "nav-link read-more mb-0".split(" "),
        htmlattribute: {
            "title": "read more"
        }
    });

    const CardFooter = CreateHTMLElement("div", {
        htmlclass: "card-footer py-2 bg-white border-top-0".split(" ")
    });

    const Price = CreateHTMLElement("p", {
        htmlclass: "text-muted font-weight-bold".split(" ")
    });

    const Click = CreateHTMLElement("a", {
        htmlclass: "nav-link text-success p-0".split(" "),
        htmlattribute: {
            "target": "_blank"
        }
    });
    
    Sub.length > 0? (function(){
        
        Click.classList.add('expand-more');
        setAttributes(Click, {"id": `expand-${index}`});
    })() : setAttributes(Click, {"href": ServiceUrl})

    Click.textContent = "click to proceed"
    CardBodyContent.textContent = ServiceDescription;
    ReadMore.textContent = "read more";
    Price.textContent = ServicePrice;
    cardTitle.textContent = ServiceTitle;

    CardFooter.appendChild(Price);
    CardFooter.appendChild(Click);

    CardBody.appendChild(CardBodyContent);
    CardBody.appendChild(ReadMore);
    CardHeader.appendChild(cardTitle);

    Card.appendChild(Image);
    Card.appendChild(CardHeader);
    Card.appendChild(CardBody);
    Card.appendChild(CardFooter);
    return Card;
}
//made
const loadSub = (index=0)=> {
    const card = Services[index].map(CreateCard);
    const selectedCard = document.querySelector(`#expand-${index}`);
    selectedCard.querySelector
};

