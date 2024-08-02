/**
 * @typedef {object} text
 * @property {String|HTMLDivElement} KR
 * @property {String|HTMLDivElement} EN
 * 
 * @typedef {Object[]} rawtext
 * @property {Number} size
 * @property {String} text
 * @property {String} color
 * @property {boolean} bold
 * @property {boolean} italic
 * 
 * @typedef {Object} clientData
 * @property {"KR"|"EN"} language
 * @property {page[]} page
 * 
 * @typedef {Object[]} pageBodyComponent
 * @property {"button"|"text"} type
 * @property {text} text
 * @property {Object} param
 * @property {{type:"addPage"|"setPage",param:any[]}} onClickEvent
 * 
 * @typedef {Object} pageClassComponent
 * @property {String} id
 * @property {String} filePathStr
 * @property {pageBodyComponent[]} body
 * @property {page[]} childPage
 * 
 */



class page {
  /**@param {pageClassComponent} component  */
  constructor(component) {
    this.component = component;
  }
}

/**@param {Object} data  */
function newClient(data){
  const saveData = btoa(JSON.stringify(data));
  window.history.pushState({},'','?data='+saveData)
  loadContent();
}

/**@param {rawtext} rawtext @returns {HTMLDivElement} */
function returnRawtext(rawtext){
  let returns = document.createElement("div")
  rawtext.forEach(element => {
    let repeat=0;
    element.text.split('\n').forEach(e => {
      const span = document.createElement("span");
      span.innerText= e
      span.style.fontSize = element?.size ? element.size : 20;
      span.style.fontWeight = element?.bold ? 600 : 400;
      span.style.color = element?.color ? element.color : "#000000";
      if(element?.italic) span.style.fontStyle="italic";
      if(repeat > 0) returns.appendChild(document.createElement("br"));
      returns.appendChild(span)
      repeat++;
    })
  });
  return returns
}

const baseParam = {
  language:"KR",
  page:["mainPage"]
}

const pages = new page({
  id:"mainPage",
  filePathStr:"main",
  body:[
    [{
      type:"text",
      text:{KR:returnRawtext([{text:"이 페이지는 마인크래프트 서바이벌 RPG 전용 백과사전입니다!",bold:true}])}
    }],
    [{
      type:"button",
      text:{KR:"월드 이벤트"},
      param:{src:"b1.png"},
      onClickEvent:{
        type:"addPage",
        param:["worldEvent"]
      }
    },
    {
      type:"button",
      text:{KR:"공간"},
      param:{src:"b2.png"},
      onClickEvent:{
        type:"addPage",
        param:["areaLayer"]
      }
    }]
    
  ],
  childPage:[
    new page({
      id:"worldEvent",
      filePathStr:"worldEvent",
      body:[
        [
          {
            type:"text",
            text:{KR:returnRawtext([{text:"월드에는 여러가지 이벤트가 발생합니다.\n이벤트는 날이 지날때마다 확률적으로 발생하며, 이벤트가 발생하지 않은 날이라면 다음날로 이벤트 발생확률이 더해집니다.\n"},{text:"이벤트는 무작위로 발생하며, 날이 지나 이벤트가 발생하면 해당 날 동안 계속 유지됩니다."},{text:"(단, 특정 방법으로 이벤트가 중지될수도 있습니다.)\n",italic:true,color:"#aaa"},{text:"자료는 플레이어들이 직접 업로드 하며, "},{text:"현실 1~3일",color:"#afe",bold:true},{text:"기준으로 플레이어 업로드 자료가 갱신됩니다."}])}
          }
        ]
      ],
      childPage:[]
    }),
    new page({
      id:"areaLayer",
      filePathStr:"area",
      body:[
        [
          {
            type:"text",
            text:{KR:returnRawtext([{text:"공간이란 특정 위치를 기준으로, 해당 위치가 "},{text:"결론적으로 모두 막혀있을 경우",bold:true,color:"#0ff"},{text:"공간으로 인식됩니다."},{text:"(또는, 공간이 2500블록 이상일 경우, 공간으로 인식되지 않습니다.)",italic:true,color:"#aaa"}])}
          }
        ],
        [
          {
            type:"button",
            text:{KR:"개인 침실"},
            param:{src:"b3.png"},
            onClickEvent:{
              type:"addPage",
              param:["areaLayer_privateBedRoom"]
            }
          },
          {
            type:"button",
            text:{KR:"호화로운 침실"},
            param:{src:"b3.png"},
            onClickEvent:{
              type:"addPage",
              param:["areaLayer_beautifulbedRoom"]
            }
          },
          {
            type:"button",
            text:{KR:"침실"},
            param:{src:"b3.png"},
            onClickEvent:{
              type:"addPage",
              param:["areaLayer_bedRoom"]
            }
          },
        ]
      ],
      childPage:[
        new page({
          id:"areaLayer_privateBedRoom",
          filePathStr:"areaDetail",
          body:[
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"공간: ",color:"#0ff",size:40,bold:true},{text:"개인 침실",color:"#fff",size:40,bold:true}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"혼자서 생활하길 좋아하는 플레이어를 위한 고급 개인침실 입니다.휴식을 취하기 최고입니다."}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"\n조건:\n",color:"#ff0"},{text:"● 침대가 1개.\n● 장식값이 100 이상.",color:"#0f0"}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"\n효과:\n",color:"#f0f"},{text:"- 휴식 보너스 보인트 +40%",color:"#f780ff"}])}
              }
            ]
          ],
          childPage:[]
        }),
        new page({
          id:"areaLayer_beautifulbedRoom",
          filePathStr:"areaDetail",
          body:[
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"공간: ",color:"#0ff",size:40,bold:true},{text:"호화로운 침실",color:"#fff",size:40,bold:true}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"완벽한 침실입니다."}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"\n조건:\n",color:"#ff0"},{text:"● 침대가 1개 이상, 4개 이하.\n● 장식값이 150 이상.\n● 공간 크기가 80이상",color:"#0f0"}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"\n효과:\n",color:"#f0f"},{text:"- 휴식 보너스 보인트 +30%\n- 현제 방에 스폰포인트가 있다면 부활할 때 버프를 얻음.",color:"#f780ff"}])}
              }
            ]
          ],
          childPage:[]
        }),
        new page({
          id:"areaLayer_bedRoom",
          filePathStr:"areaDetail",
          body:[
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"공간: ",color:"#0ff",size:40,bold:true},{text:"침실",color:"#fff",size:40,bold:true}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"기본적인 침실입니다."}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"\n조건:\n",color:"#ff0"},{text:"● 침대가 1개 이상.\n● 장식값이 150 이상.\n● 공간 크기가 40이상",color:"#0f0"}])}
              }
            ],
            [
              {
                type:"text",
                text:{KR:returnRawtext([{text:"\n효과:\n",color:"#f0f"},{text:"- 휴식 보너스 보인트 +15%",color:"#f780ff"}])}
              }
            ]
          ],
          childPage:[]
        })
      ]
    })
  ]
})

function loadContent(){
  //! footerLoader
  const footerText = document.getElementById("footerText")
  footerText.innerText=`version: a-00-01\n`

  const params = new URLSearchParams(window.location.search);

  /**@type {clientData} */
  let dataParam = params.get('data')
  if(dataParam || dataParam != null){
    dataParam = JSON.parse(atob(dataParam))
  }
  else{
    dataParam=baseParam;
  }
  
  const filePathDiv = document.getElementById("filePathDiv")
  filePathDiv.innerHTML=''
  


  /**@type {page} */
  let currentPage;
  let spage = [pages]
  let pageFileStr = []
  for(let i = 0;i<dataParam.page.length;i++){
    for(let j = 0;j<spage.length;j++){
      if(spage[j].component.id == dataParam.page[i]){
        currentPage = spage[j];
        pageFileStr.push(currentPage.component.filePathStr)
        spage = currentPage.component.childPage;
      }
    }
  }

  let num=0;
  pageFileStr.forEach(element => {
    filePathDiv.innerHTML+=`<div class="tofu fileName fileNameDirect" id="fileNameDirect" data-num="${num}">${element}</div>`;
    filePathDiv.innerHTML+=`<div class="tofu fileSlash">/</div>`
    num++;
  });
  document.querySelectorAll(".fileNameDirect").forEach(btn => {
    btn.addEventListener("click", (event) => {
      const num = Number(event.target.dataset.num);
      dataParam.page.splice(num + 1)
      newClient(dataParam)
    });
  });

  const bodier = document.getElementById("bodier")
  bodier.innerHTML = ''
  currentPage.component.body.forEach(elements => {
    const div = document.createElement('div')
    div.style.display = "flex"
    elements.forEach(element => {
      if(element.type == "text"){
        div.appendChild(element.text[dataParam.language])
      }
      else if(element.type == "button"){
        let button = document.createElement("button")
        button.classList.add("bigBtn")
        if(element.param.src != undefined){
          const img = document.createElement("img")
          img.src = `./data/img/${element.param.src}`
          img.classList.add("fitInBigBtn")
          button.appendChild(img)
        }
        const span = document.createElement("span")
        span.classList.add("textInBigBtn")
        span.innerText=element.text[dataParam.language]
        button.appendChild(span)

        button.addEventListener("click",(event) => {
          if(element.onClickEvent.type == "addPage"){
            element.onClickEvent.param.forEach(str => {
              dataParam.page.push(str)
            });
            newClient(dataParam)
          }
          else if(element.onClickEvent.type == "setPage"){
            dataParam.page = element.onClickEvent.param
            newClient(dataParam)
          }
        })
  
        div.appendChild(button)
      }
    });
    bodier.appendChild(div)
  });
}

window.onload = function() {
  loadContent()
}

window.onpopstate = function(){
  loadContent()
}
