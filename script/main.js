let botao =  document.getElementById("env")


// valida se os campos estão preenchidos corretamente
function valide(campo1, campo2, campo3){
    let erro1 = document.getElementById('erro1')
    let erro2 = document.getElementById('erro2')
    let erro3 = document.getElementById('erro3')
    

    if(campo1.value == 'Nenhum')
    {
        erro1.textContent = 'selecione o entregador'
        return false
    }else if(campo2.value == 'Nenhum')
    {
        erro1.textContent = ''
        erro2.textContent = 'selecione a loja'
        return false

    }else if(campo3.value == ''){
        erro2.textContent = ''
        erro3.textContent = 'campo vazio'
        return false

    }else if(campo3.value < 0 || 0 < campo3.value ){
        erro2.textContent = ''
        erro3.textContent = 'quantidade de pedidos invalida'
        return false

    }else{
        erro1.textContent = ''
        erro2.textContent = ''
        erro3.textContent = ''   
    return true
}

}

// Cadastra dados no sessionStorage
function cadastrarEntraga(entregador, nomeloja, qntPedido){
    let registro = {
        'Loja 1':0,
        'Loja 2':0,
        'Loja 3':0
    }
    
    
    var ent = entregador
    if(sessionStorage[entregador]){
        let objeto = JSON.parse(sessionStorage[entregador])
        Number(objeto[nomeloja])
        objeto[nomeloja] += Number(qntPedido)

        sessionStorage.setItem(entregador, JSON.stringify(objeto));
    }else{
        registro[nomeloja] = Number(qntPedido)
        sessionStorage.setItem(entregador, JSON.stringify(registro));
    }

    

    
}



let aviso = document.getElementById('aviso')
let descr = document.getElementById('descr')


function cronometro(entregador, num, optionDesable){
    let options = []
    options.push(optionDesable)



   const tempoMedio = 1
   let tempoEntrega = tempoMedio*num
   let sec = 1
    

   let pName = document.createElement('p')
   let text = document.createTextNode(entregador)
   pName.appendChild(text)
   document.getElementById('andamento').appendChild(pName) 


   let pTime = document.createElement('p')
   pTime.classList.add('time')
   pTime.setAttribute('id',`${entregador}`)
   document.getElementById('andamento').appendChild(pTime)

   
    let temp = setInterval(()=>{
        (function tempo(){
            sec--;

        if(sec == 0){
            sec = 59
            tempoEntrega--
            
        }

        if(tempoEntrega == -1)
        {
            sessionStorage.removeItem(`Time${entregador}`)
            for(let i = 0;i < options.length; i++){
            options[i].classList.remove('desable')
            }
            document.getElementById(`${entregador}`).textContent = '00:00'
            document.getElementById('andamento').removeChild(pName)
            document.getElementById('andamento').removeChild(pTime)

            
            return clearInterval(temp)
        }

        min = tempoEntrega < 10 ? "0"+tempoEntrega: tempoEntrega
        sec = sec < 10 ? "0"+sec: sec
        document.getElementById(`${entregador}`).textContent = min+':'+sec
        
    }())
    },1000)

}


botao.addEventListener("click", ()=>{
    
    let motob = document.getElementById('motob')
    let loja = document.getElementById('loja')
    let pedido = document.getElementById('pedido')

    console.log()
    
    
    if(valide(motob,loja,pedido)){
    let textAviso = 'Pedido realizado.'
    let textDescr = `${motob.value} vai entregar ${pedido.value} pedido(s) da ${loja.value}` 

    aviso.textContent = textAviso
    descr.textContent = textDescr

    cadastrarEntraga(motob.value,loja.value,pedido.value)


    let optionSelect= motob.options[motob.selectedIndex]
    optionSelect.classList.add('desable')
        cronometro(motob.value,pedido.value, optionSelect)

        motob.value = ""
        loja.value = ""
        pedido.value = ""

    
    }
    console.log('não validado')
})


var selectHist = document.getElementById('selecthist')


selectHist.addEventListener('change',()=>{

let contentHist = document.getElementById('contenthist')
contentHist.textContent = ''
let titleHist = document.getElementById('titlehist')
titleHist.textContent = ''
    
let hist = document.getElementById('historico')
if(sessionStorage[selectHist.value]){
    titleHist.textContent = selectHist.value+'\n'+'Pedidos' 
    Object.keys(JSON.parse(sessionStorage[selectHist.value])).forEach((elt)=>{
            let valueHist = JSON.parse(sessionStorage[selectHist.value])[elt] 
            let pHist = document.createElement('p')
            let textHist = document.createTextNode(elt + ' : ' + valueHist)
            pHist.appendChild(textHist)

            contentHist.appendChild(pHist)
            

    })
}


})
