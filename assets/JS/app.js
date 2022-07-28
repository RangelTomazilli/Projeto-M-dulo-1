let dados = []
let i = 0

function adicionarTarefa() {
    let modal = document.getElementById("modal")
    let modalInt = document.getElementById("modal-int")
    modal.style.display = "block"
    modalInt.classList.add("animate__fadeInUp")
    document.getElementById("num").value = ""
    document.getElementById("desc").value = ""
    document.getElementById("data").value = ""
    document.getElementById("status").value = ""
    document.getElementById("save").onclick = () => { //Trocando botão de editar para salvar
        salvarTarefas()
    }
    document.getElementById("modal-title").innerHTML = "Adicionar Tarefa"
    document.getElementById("obrigatorio1").style.display = "none"
    document.getElementById("obrigatorio2").style.display = "none"
    document.getElementById("obrigatorio3").style.display = "none"
    document.getElementById("obrigatorio4").style.display = "none"
    
}

function cancelaModal() {
    let modal = document.getElementById("modal")
    let modalInt = document.getElementById("modal-int")
    modal.style.display = "none"
}
function cadastradoComSucesso() {
    let sucesso = document.getElementById("alerta")
    sucesso.innerHTML = 'Cadastrado com sucesso.'
    sucesso.classList.add("alert-success")
    sucesso.classList.remove("d-none")
    sucesso.classList.add("animate__fadeInUp")
    window.setTimeout(() => {             //sumir após 2 segs com efeito de fade up.
        sucesso.classList.add("d-none")
    }, 2000)
    cancelaModal()
}
function editadoComSucesso() {
    let sucesso = document.getElementById("alerta1")
    sucesso.innerHTML = 'Editado com sucesso.'
    sucesso.classList.add("alert-primary")
    sucesso.classList.remove("d-none")
    sucesso.classList.add("animate__fadeInUp")
    window.setTimeout(() => {             //sumir após 2 segs com efeito de fade up.
        sucesso.classList.add("d-none")
    }, 2000)
    cancelaModal()
}

function deletaCadastro() {
    let sucesso = document.getElementById("alerta2")
    sucesso.innerHTML = 'Tarefa removida.'
    sucesso.classList.add("alert-danger")
    sucesso.classList.remove("d-none")
    sucesso.classList.add("animate__fadeInUp")
    window.setTimeout(() => {             //sumir após 2 segs com efeito de fade up.
        sucesso.classList.add("d-none")
    }, 2000)
}
async function salvarTarefas() { //Incluindo tarefas na API
    let num = document.getElementById("num").value
    let des = document.getElementById("desc").value
    let dat = document.getElementById("data").value
    let stats = document.getElementById("status").value

    if (num === "") { //Condições de obrigatoriedade de preenchimento
        document.getElementById("obrigatorio1").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio1").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (des === "") {
        document.getElementById("obrigatorio2").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio2").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (dat === "") {
        document.getElementById("obrigatorio3").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio3").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (stats === "") {
        document.getElementById("obrigatorio4").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio4").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (num && des && dat && stats !== "") {
        dados = {
            numero: parseInt(num),
            descricao: des,
            data: dat,
            stato: stats,
        }
        await fetch("http://3.85.57.32:8000/dados", { //Publicando na API
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(dados),
        })

        await printTasks()
        cadastradoComSucesso()
    }
}
async function saveEdit(element) {
    let num = document.getElementById("num").value
    let des = document.getElementById("desc").value
    let dat = document.getElementById("data").value
    let stats = document.getElementById("status").value

    if (num === "") { //Condições de obrigatoriedade de preenchimento
        document.getElementById("obrigatorio1").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio1").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (des === "") {
        document.getElementById("obrigatorio2").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio2").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (dat === "") {
        document.getElementById("obrigatorio3").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio3").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (stats === "") {
        document.getElementById("obrigatorio4").innerHTML = "*Campo obrigatório"
        document.getElementById("obrigatorio4").style.display = "block"
        let modal = document.getElementById("modal")
        modal.style.display = "block"
    } else if (num && des && dat && stats !== "") {

        dados = {
            numero: num,
            descricao: des,
            data: dat,
            stato: stats,
        }
        await fetch(`http://3.85.57.32:8000/dados/${element}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(dados),
        })

        await printTasks()
        editadoComSucesso()
    }
}
async function printTasks() {
    let searchAPI = await fetch("http://3.85.57.32:8000/dados") //Buscando dados API
    let returnAPI = await searchAPI.json()  //Transformando json
    let linha = ""
    let color = ""
    console.log(returnAPI)
    returnAPI.forEach((element) => { //colorindo o status (condição)
        if (element.stato == "Concluído") {
            color = "green"
        } else if (element.stato == "Em andamento") {
            color = "orange"
        } else {
            color = "red"
        }

        linha = linha +   //imprimindo linhas da tabela
            `<tr id="linha${element.id}">
            <td id='numero${element.id}'>${element.numero}</td>
            <td id='descricao${element.id}'>${element.descricao}</td>
            <td id='data${element.id}'>${element.data.split('-').reverse().join('/')}</td>
            <td class="${color}" id='status${element.id}'>${element.stato}</td>
            <td><img id="edit${element.id}" class="edit-button" src="assets/images/edit-icon.png" width="15px" height="15px" onclick="editTarefa('${element.id}')">
            <img id="delete${element.id}" class="del-button" src="assets/images/delete-icon.png" width="15px" height="15px" onclick="deleteTarefa('${element.id}')"></td>
        </tr>`
    });
    document.getElementById("tbl").innerHTML = linha
    cancelaModal()
}

async function orderNum(param, param2) {
    let searchAPI = await fetch(`http://3.85.57.32:8000/dados?_sort=${param}&_order=${param2}`) //Buscando dados API
    let returnAPI = await searchAPI.json()  //Transformando json
    let linha = ""
    let color = ""

    console.log(returnAPI)
    returnAPI.forEach((element) => { //colorindo o status (condição)
        if (element.stato == "Concluído") {
            color = "green"
        } else if (element.stato == "Em andamento") {
            color = "orange"
        } else {
            color = "red"
        }

        linha = linha +   //imprimindo linhas da tabela
            `<tr id="linha${element.id}">
            <td id='numero${element.id}'>${element.numero}</td>
            <td id='descricao${element.id}'>${element.descricao}</td>
            <td id='data${element.id}'>${element.data.split('-').reverse().join('/')}</td>
            <td class="${color}" id='status${element.id}'>${element.stato}</td>
            <td><img id="edit${element.id}" class="edit-button" src="assets/images/edit-icon.png" width="15px" height="15px" onclick="editTarefa('${element.id}')">
            <img id="delete${element.id}" class="del-button" src="assets/images/delete-icon.png" width="15px" height="15px" onclick="deleteTarefa('${element.id}')"></td>
        </tr>`
    });
    document.getElementById("tbl").innerHTML = linha
    
}

async function deleteTarefa(element) {
    await fetch(`http://3.85.57.32:8000/dados/${element}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
    })
    await printTasks()
    deletaCadastro()
}

async function editTarefa(element) {
    modal.style.display = "block" 
    let espera = await fetch(`http://3.85.57.32:8000/dados/${element}`)
    let task = await espera.json()

    document.getElementById("num").value = task.numero
    document.getElementById("desc").value = task.descricao
    document.getElementById("data").value = task.data
    document.getElementById("status").value = task.stato
    document.getElementById("save").onclick = () => {
        saveEdit(element)
    }
    document.getElementById("modal-title").innerHTML = "Editar Tarefa"

    document.getElementById("obrigatorio1").style.display = "none"
    document.getElementById("obrigatorio2").style.display = "none"
    document.getElementById("obrigatorio3").style.display = "none"
    document.getElementById("obrigatorio4").style.display = "none"
}


printTasks()
// Resources
// http://3.85.57.32:8000/dados
// http://3.85.57.32:8000/damments
// http://3.85.57.32:8000/daofile
// http://3.85.57.32:8000/daividades
// abrir microserver => json-server --watch db.json