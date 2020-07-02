window.addEventListener('load', function () {
    registerContractAdd();
    registerContractsActions();
});

function registerContractsActions() {
    document.querySelectorAll(".contracts .contract").forEach(function (el) {
        registerActionsForContract(el);
    });
}

function registerContractAdd() {
    const contractAddButton = document.querySelector(".contracts .add button");
    if (contractAddButton === null)
        return;

    contractAddButton.addEventListener("click", function (event) {
        const contractTemplateElement = document.querySelector(".contracts .contract.template");
        const contractsListElement = document.querySelector(".contracts .list .inner");

        event.preventDefault();
        const textareaElement = document.querySelector(".contracts .add textarea");

        if (textareaElement.value.length < 10) {
            alert("Podaj opis długi na przynajmniej 10 znaków");
            return;
        }

        const element = contractTemplateElement.cloneNode(true);
        element.classList.remove("template");
        element.querySelector(".info .title").textContent = textareaElement.value;
        contractsListElement.appendChild(element);

        textareaElement.value = "";

        registerActionsForContract(element);
    });
}

function registerActionsForContract(contractElement) {
    contractElement.querySelector("button[data-accept]").addEventListener("click", function (event) {
        contractElement.querySelectorAll("button").forEach(function (el) {
            el.classList.add("hidden");
        });

        contractElement.querySelector("button[data-finish]").classList.remove("hidden");
        contractElement.classList.add("accepted");
    });

    contractElement.querySelector("button[data-reject]").addEventListener("click", function (event) {
        contractElement.remove();
    });

    contractElement.querySelector("button[data-finish]").addEventListener("click", function (event) {
        contractElement.querySelector("button[data-finish]").classList.add("hidden");
        contractElement.classList.remove("accepted");
        contractElement.classList.add("finished");
    });
}